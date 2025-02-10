import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Await the params
    const { id } = await params;

    // Log for debugging
    console.log("[UserAPI] Fetching user data for:", id);

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        tier: true,
        credits: true,
        isActive: true,
      },
    });

    if (!user) {
      console.log("[UserAPI] User not found:", id);
      return new NextResponse("User not found", { status: 404 });
    }

    if (!user.isActive) {
      console.log("[UserAPI] User is not active:", id);
      return new NextResponse("User is not active", { status: 403 });
    }

    console.log("[UserAPI] User data found:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("[UserAPI] Error fetching user:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
