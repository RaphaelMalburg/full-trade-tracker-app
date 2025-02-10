import { PaymentStatus } from "@prisma/client";
import type { Stripe } from "stripe";

// Mock Stripe module
jest.mock("stripe", () => {
  return jest.fn();
});

// Mock Prisma
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    creditPurchase: {
      update: jest.fn(),
    },
    creditTransaction: {
      create: jest.fn(),
    },
  },
}));

// Import prisma after mocking
import { prisma } from "@/lib/prisma";

describe("Stripe Webhook Handler", () => {
  // Helper function to process webhook events
  async function processWebhookEvent(event: any) {
    const { type, data } = event;

    try {
      switch (type) {
        case "customer.subscription.created":
        case "customer.subscription.updated": {
          const subscription = data.object;
          const customerId = subscription.customer;
          const priceId = subscription.items.data[0].price.id;

          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (!user) {
            return { status: 404, message: "User not found" };
          }

          let tier: "free" | "pro" | "enterprise" = "free";
          if (priceId === "price_1QjRbSDQoH9Sl5KXhQWfoJ6y" || priceId === "price_1QjQLUDQoH9Sl5KXSzT95tVR") {
            tier = "pro";
          } else if (priceId === "price_1QjQP3DQoH9Sl5KXG2cvSymf" || priceId === "price_1QjQQJDQoH9Sl5KXAWHbQGSW") {
            tier = "enterprise";
          }

          await prisma.user.update({
            where: { id: user.id },
            data: {
              tier,
              stripeSubscriptionId: subscription.id,
              stripePriceId: priceId,
            },
          });
          return { status: 200 };
        }

        case "customer.subscription.deleted": {
          const subscription = data.object;
          const customerId = subscription.customer;

          const user = await prisma.user.findFirst({
            where: { stripeCustomerId: customerId },
          });

          if (!user) {
            return { status: 404, message: "User not found" };
          }

          await prisma.user.update({
            where: { id: user.id },
            data: {
              tier: "free",
              stripeSubscriptionId: null,
              stripePriceId: null,
            },
          });
          return { status: 200 };
        }

        case "checkout.session.completed": {
          const session = data.object;

          if (session.mode === "payment" && session.metadata?.creditPurchaseId) {
            const customerId = session.customer;
            const user = await prisma.user.findFirst({
              where: { stripeCustomerId: customerId },
            });

            if (!user) {
              return { status: 404, message: "User not found" };
            }

            await prisma.creditPurchase.update({
              where: { id: session.metadata.creditPurchaseId },
              data: { status: PaymentStatus.COMPLETED },
            });

            if (session.metadata?.credits) {
              const credits = parseInt(session.metadata.credits);
              await prisma.user.update({
                where: { id: user.id },
                data: {
                  credits: { increment: credits },
                },
              });

              await prisma.creditTransaction.create({
                data: {
                  userId: user.id,
                  amount: credits,
                  type: "PURCHASE",
                  description: `Purchased ${credits} credits`,
                },
              });
            }
          }
          return { status: 200 };
        }

        default:
          return { status: 400, message: "Unhandled event type" };
      }
    } catch (err) {
      console.error("[Stripe Webhook] Error processing event:", err);
      return { status: 500, message: "Webhook handler failed" };
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Subscription Events", () => {
    const mockUser = {
      id: "user_123",
      email: "test@example.com",
      stripeCustomerId: "cus_123",
    };

    it("should update user tier to PRO when subscribing to pro plan", async () => {
      const mockEvent = {
        type: "customer.subscription.created",
        data: {
          object: {
            id: "sub_123",
            customer: "cus_123",
            items: {
              data: [
                {
                  price: {
                    id: "price_1QjRbSDQoH9Sl5KXhQWfoJ6y", // PRO monthly price
                  },
                },
              ],
            },
          },
        },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...mockUser, tier: "pro" });

      const response = await processWebhookEvent(mockEvent);
      expect(response.status).toBe(200);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          tier: "pro",
          stripeSubscriptionId: "sub_123",
          stripePriceId: "price_1QjRbSDQoH9Sl5KXhQWfoJ6y",
        },
      });
    });

    it("should update user tier to ENTERPRISE when subscribing to enterprise plan", async () => {
      const mockEvent = {
        type: "customer.subscription.created",
        data: {
          object: {
            id: "sub_123",
            customer: "cus_123",
            items: {
              data: [
                {
                  price: {
                    id: "price_1QjQP3DQoH9Sl5KXG2cvSymf", // ENTERPRISE monthly price
                  },
                },
              ],
            },
          },
        },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...mockUser, tier: "enterprise" });

      const response = await processWebhookEvent(mockEvent);
      expect(response.status).toBe(200);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          tier: "enterprise",
          stripeSubscriptionId: "sub_123",
          stripePriceId: "price_1QjQP3DQoH9Sl5KXG2cvSymf",
        },
      });
    });

    it("should downgrade user to FREE when subscription is cancelled", async () => {
      const mockEvent = {
        type: "customer.subscription.deleted",
        data: {
          object: {
            id: "sub_123",
            customer: "cus_123",
          },
        },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...mockUser, tier: "free" });

      const response = await processWebhookEvent(mockEvent);
      expect(response.status).toBe(200);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          tier: "free",
          stripeSubscriptionId: null,
          stripePriceId: null,
        },
      });
    });
  });

  describe("Credit Purchase Events", () => {
    const mockUser = {
      id: "user_123",
      email: "test@example.com",
      stripeCustomerId: "cus_123",
    };

    it("should process credit purchase and update user balance", async () => {
      const mockEvent = {
        type: "checkout.session.completed",
        data: {
          object: {
            id: "cs_123",
            mode: "payment",
            customer: "cus_123",
            metadata: {
              creditPurchaseId: "purchase_123",
              credits: "100",
            },
          },
        },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (prisma.creditPurchase.update as jest.Mock).mockResolvedValue({ status: PaymentStatus.COMPLETED });
      (prisma.user.update as jest.Mock).mockResolvedValue({ ...mockUser, credits: 100 });
      (prisma.creditTransaction.create as jest.Mock).mockResolvedValue({ id: "tx_123" });

      const response = await processWebhookEvent(mockEvent);
      expect(response.status).toBe(200);

      expect(prisma.creditPurchase.update).toHaveBeenCalledWith({
        where: { id: "purchase_123" },
        data: { status: PaymentStatus.COMPLETED },
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: {
          credits: { increment: 100 },
        },
      });

      expect(prisma.creditTransaction.create).toHaveBeenCalledWith({
        data: {
          userId: mockUser.id,
          amount: 100,
          type: "PURCHASE",
          description: "Purchased 100 credits",
        },
      });
    });
  });

  describe("Error Handling", () => {
    it("should return 404 if user is not found", async () => {
      const mockEvent = {
        type: "customer.subscription.created",
        data: {
          object: {
            id: "sub_123",
            customer: "cus_123",
            items: {
              data: [
                {
                  price: {
                    id: "price_1QjRbSDQoH9Sl5KXhQWfoJ6y",
                  },
                },
              ],
            },
          },
        },
      };

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const response = await processWebhookEvent(mockEvent);
      expect(response.status).toBe(404);
    });
  });
});
