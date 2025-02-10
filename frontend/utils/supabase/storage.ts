import { createClient } from "./client";
import { v4 as uuid } from "uuid";
import imageCompression from "browser-image-compression";

const getStorage = () => {
  const supabase = createClient();
  return supabase.storage;
};

export async function uploadImage(file: File, bucket: string, folder?: string) {
  try {
    // Compress image if it's too large
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });

    const storage = getStorage();
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuid()}.${fileExt}`;
    const path = folder ? `${folder}/${fileName}` : fileName;

    const { data, error } = await storage
      .from(bucket)
      .upload(path, compressedFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = storage.from(bucket).getPublicUrl(data.path);

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { url: null, error };
  }
}

export async function uploadBase64Image(
  base64String: string,
  bucket: string,
  folder?: string,
) {
  try {
    // Convert base64 to blob
    const base64Response = await fetch(base64String);
    const blob = await base64Response.blob();

    // Convert blob to file
    const file = new File([blob], `${uuid()}.png`, { type: "image/png" });

    // Upload using the regular upload function
    return uploadImage(file, bucket, folder);
  } catch (error) {
    console.error("Error uploading base64 image:", error);
    return { url: null, error };
  }
}

export async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const filename = `${uuid()}.${blob.type.split("/")[1]}`;
  return new File([blob], filename, { type: blob.type });
}

export async function deleteImage(path: string, bucket: string) {
  try {
    console.log(`Attempting to delete image from ${bucket}:`, path);
    const supabase = await createClient();

    // If path is a full URL, extract just the filename
    if (path.startsWith("http")) {
      const url = new URL(path);
      // Get everything after the bucket name in the path
      const fullPath = url.pathname.split(`${bucket}/`)[1];
      path = fullPath || path;
      console.log("Extracted path from URL:", path);
    }

    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error) {
      console.error("Supabase storage delete error:", error);
      throw error;
    }

    console.log("Successfully deleted image:", path);
    return { error: null };
  } catch (error) {
    console.error("Error in deleteImage:", error);
    return { error };
  }
}
