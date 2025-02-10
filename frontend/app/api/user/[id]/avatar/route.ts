import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await the params
    const { id } = await params;

    // Verify authentication
    const session = await auth();
    if (!session?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id },
      select: { avatarUrl: true },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ avatarUrl: user.avatarUrl }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
      },
    );
  }
}
