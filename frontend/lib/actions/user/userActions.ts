"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { deleteImage } from "@/utils/supabase/storage";
import { cookies } from "next/headers";

interface ProfileUpdateData {
  name?: string;
  avatarUrl?: string;
  bio?: string;
}

export async function updateUserProfile(data: ProfileUpdateData) {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  console.log("🚀 Starting profile update for user:", user.id);
  console.log("📦 Update data received:", data);

  try {
    // Get current user data
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { avatarUrl: true },
    });
    console.log("👤 Current user data:", currentUser);

    // Handle avatar update
    if (data.avatarUrl && currentUser?.avatarUrl) {
      try {
        // Only proceed if the URLs are different
        if (currentUser.avatarUrl !== data.avatarUrl) {
          console.log("🔄 Avatar URL change detected");
          console.log("📸 Current avatar URL:", currentUser.avatarUrl);
          console.log("🆕 New avatar URL:", data.avatarUrl);

          // Delete the old avatar using the full URL
          console.log("🗑️ Attempting to delete old avatar...");
          const { error: deleteError } = await deleteImage(
            currentUser.avatarUrl,
            "avatars",
          );
          if (deleteError) {
            console.error("❌ Failed to delete old avatar:", deleteError);
          } else {
            console.log("✅ Successfully deleted old avatar");
          }
        } else {
          console.log("ℹ️ Avatar URL unchanged, skipping deletion");
        }
      } catch (deleteError) {
        console.error("❌ Error during avatar deletion:", deleteError);
        // Continue with update even if delete fails
      }
    } else {
      console.log("ℹ️ No avatar update needed");
    }

    // Update user profile in database
    console.log("💾 Updating user profile in database...");
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        avatarUrl: data.avatarUrl,
        bio: data.bio,
      },
    });
    console.log("✅ Database update successful:", updatedUser);

    // Update Supabase auth metadata
    console.log("🔄 Updating Supabase auth metadata...");
    const supabase = await createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        name: data.name,
        avatar_url: data.avatarUrl,
      },
    });

    if (updateError) {
      console.error("❌ Failed to update Supabase auth metadata:", updateError);
    } else {
      console.log("✅ Supabase auth metadata updated successfully");
    }

    console.log("🔄 Revalidating paths...");
    revalidatePath("/settings");
    revalidatePath("/dashboard");

    console.log("✅ Profile update completed successfully");
    return updatedUser;
  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    throw new Error("Failed to update profile");
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  try {
    const supabase = await createClient();

    // First verify the current password by attempting to sign in
    const {
      data: { user: currentUser },
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email: (await getCurrentUser())?.email as string,
      password: currentPassword,
    });

    if (signInError || !currentUser) {
      throw new Error("Current password is incorrect");
    }

    // If current password is correct, update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) throw updateError;

    return { success: true };
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

export async function deleteUserAccount() {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    // Soft delete user by setting isActive to false
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isActive: false,
      },
    });

    // Sign out the user
    const supabase = await createClient();
    await supabase.auth.signOut();

    redirect("/");
  } catch (error) {
    console.error("Error deactivating user account:", error);
    throw error;
  }
}

async function getCurrentUser() {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        bio: true,
        emailVerified: true,
        isActive: true,
      },
    });

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    return dbUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function deductCredits(amount: number) {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { credits: true },
    });

    if (!currentUser) throw new Error("User not found");
    if ((currentUser.credits || 0) < amount)
      throw new Error("Insufficient credits");

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          decrement: amount,
        },
      },
      select: {
        id: true,
        credits: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error deducting credits:", error);
    throw error;
  }
}

export async function addCredits(amount: number) {
  const user = await auth();
  if (!user?.id) throw new Error("Unauthorized");

  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits: {
          increment: amount,
        },
      },
      select: {
        id: true,
        credits: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error adding credits:", error);
    throw error;
  }
}

export async function getUserAvatarData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  } catch (error) {
    console.error("Error fetching user avatar data:", error);
    throw error;
  }
}
