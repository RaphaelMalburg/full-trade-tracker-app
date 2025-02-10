import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { subDays } from "date-fns";
import { resend } from "@/lib/email";
import { InactivityWarningEmail } from "@/components/emails/inactivity-warning-email";
import { AccountDeletionEmail } from "@/components/emails/account-deletion-email";

// Secure the endpoint with a secret
const validateSecret = (secret: string | null) => {
  return secret === process.env.CRON_SECRET;
};

export async function POST(request: Request) {
  try {
    // Validate the secret from headers
    const secret = request.headers.get("x-cron-secret");
    if (!validateSecret(secret)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const now = new Date();
    const warningDate = subDays(now, 90); // 90 days for warning
    const deletionDate = subDays(now, 180); // 180 days for deletion

    // Find users for warning (inactive for 90 days)
    const warningUsers = await prisma.user.findMany({
      where: {
        lastLoginAt: {
          lte: warningDate,
          gt: deletionDate, // Only warn users who haven't been warned yet
        },
        isActive: true,
        status: "ACTIVE",
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Find users for deletion (inactive for 180 days)
    const deletionUsers = await prisma.user.findMany({
      where: {
        lastLoginAt: {
          lte: deletionDate,
        },
        isActive: true,
        status: "ACTIVE",
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Send warning emails
    for (const user of warningUsers) {
      try {
        await resend.emails.send({
          from: "Trade Tracker <info@trade-tracker.net>",
          to: user.email,
          subject: "Account Inactivity Warning - Trade Tracker",
          react: InactivityWarningEmail({
            userName: user.name || "Trader",
            daysUntilDeletion: 90, // They have 90 more days
          }),
        });
      } catch (error) {
        console.error(`Failed to send warning email to ${user.email}:`, error);
      }
    }

    // Process deletions and send deletion notification emails
    for (const user of deletionUsers) {
      try {
        // Send deletion notification
        await resend.emails.send({
          from: "Trade Tracker <info@trade-tracker.net>",
          to: user.email,
          subject: "Account Deleted Due to Inactivity - Trade Tracker",
          react: AccountDeletionEmail({
            userName: user.name || "Trader",
          }),
        });

        // Update user status
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isActive: false,
            status: "DELETED",
          },
        });
      } catch (error) {
        console.error(`Failed to process deletion for ${user.email}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      warningsCount: warningUsers.length,
      deletionsCount: deletionUsers.length,
    });
  } catch (error) {
    console.error("Error processing inactivity checks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
