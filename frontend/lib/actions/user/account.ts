"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function updateUserBio(bio: string) {
  const user = await auth();
  if (!user) throw new Error("Not authenticated");

  await prisma.user.update({
    where: { id: user.id },
    data: { bio },
  });

  revalidatePath("/dashboard/settings");
}

export async function updateProfilePicture(formData: FormData) {
  try {
    const user = await auth();
    if (!user) throw new Error("Not authenticated");

    const file = formData.get("image");
    if (!file || typeof file === "string")
      throw new Error("No valid file provided");

    const supabase = await createClient();

    // Get current user to check for existing avatar
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { avatarUrl: true },
    });

    // If there's an existing avatar, delete it from storage
    if (currentUser?.avatarUrl) {
      try {
        const oldImagePath = currentUser.avatarUrl.split("/").pop();
        if (oldImagePath) {
          const { error: deleteError } = await supabase.storage
            .from("avatars")
            .remove([oldImagePath]);
          if (deleteError) {
            console.error("Failed to delete old avatar:", deleteError);
          }
        }
      } catch (error) {
        console.error("Error deleting old avatar:", error);
      }
    }

    // Get file extension and generate filename
    const filename = file.name || "upload.jpg";
    const fileExt = filename.split(".").pop() || "jpg";
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;

    // Upload new image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    if (!uploadData?.path) {
      throw new Error("No upload path returned");
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(uploadData.path);

    if (!publicUrl) {
      throw new Error("Failed to get public URL");
    }

    // Update user record with new avatar URL
    await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl: publicUrl },
    });

    revalidatePath("/dashboard/settings");
    return publicUrl;
  } catch (error) {
    console.error("Profile picture update error:", error);
    throw new Error("Failed to update profile picture");
  }
}

export async function regenerateApiKey() {
  const user = await auth();
  if (!user) throw new Error("Not authenticated");

  const apiKey = randomUUID();

  await prisma.user.update({
    where: { id: user.id },
    data: { apiKey },
  });

  revalidatePath("/dashboard/settings");
  return apiKey;
}

export async function deleteUserAccount() {
  const user = await auth();
  if (!user) throw new Error("Not authenticated");

  // Delete all user data
  await prisma.user.delete({
    where: { id: user.id },
  });

  // Note: Auth session cleanup will be handled by the auth middleware
}

export async function getUserData() {
  const user = await auth();
  if (!user) throw new Error("Not authenticated");

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      bio: true,
      apiKey: true,
      tier: true,
      credits: true,
      isActive: true,
    },
  });

  if (!userData) throw new Error("User not found");
  return userData;
}
