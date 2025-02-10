// Mock Stripe
export const mockStripe = {
  checkout: {
    sessions: {
      create: jest.fn().mockResolvedValue({
        url: "https://checkout.stripe.com/test",
        id: "cs_test",
      }),
      listLineItems: jest.fn().mockResolvedValue({
        data: [{ amount_total: 5000 }],
      }),
    },
  },
  webhooks: {
    constructEvent: jest.fn().mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          mode: "payment",
          subscription: "sub_123",
          metadata: { userId: "test-user" },
        },
      },
    }),
  },
  subscriptions: {
    retrieve: jest.fn().mockResolvedValue({
      id: "sub_123",
      metadata: { userId: "test-user" },
    }),
  },
};
