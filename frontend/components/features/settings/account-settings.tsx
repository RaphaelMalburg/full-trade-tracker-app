"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  Upload,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Check,
} from "lucide-react";
import {
  updateUserBio,
  deleteUserAccount,
  updateProfilePicture,
  regenerateApiKey,
} from "@/lib/actions/user/account";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getUserData } from "@/lib/actions/user/account";

interface AccountSettingsProps {
  user: User & {
    name?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    apiKey?: string | null;
  };
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [bio, setBio] = useState(user.bio || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [currentApiKey, setCurrentApiKey] = useState<string>(user.apiKey || "");
  const [isRegeneratingKey, setIsRegeneratingKey] = useState(false);

  // Fetch fresh user data when needed
  const refreshUserData = async () => {
    try {
      const userData = await getUserData();
      if (userData.apiKey) {
        setCurrentApiKey(userData.apiKey);
      }
      if (userData.bio) {
        setBio(userData.bio);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  // Update state when user prop changes
  useEffect(() => {
    refreshUserData();
  }, []);

  const handleUpdateBio = async () => {
    try {
      setIsUpdating(true);
      await updateUserBio(bio);
      await refreshUserData();
      toast.success("Bio updated successfully");
    } catch (error) {
      toast.error("Failed to update bio");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      setIsUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const newAvatarUrl = await updateProfilePicture(formData);

      if (!newAvatarUrl) {
        throw new Error("Failed to get new avatar URL");
      }

      // Update the avatar in the DOM immediately
      const avatarImage = document.querySelector(
        ".avatar-image",
      ) as HTMLImageElement;
      if (avatarImage) {
        avatarImage.src = `${newAvatarUrl}?t=${Date.now()}`;
      }

      // Also refresh user data to ensure everything is in sync
      await refreshUserData();

      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Profile picture update error:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleRegenerateApiKey = async () => {
    try {
      setIsRegeneratingKey(true);
      const newKey = await regenerateApiKey();
      if (newKey) {
        setCurrentApiKey(newKey);
        setShowApiKey(true);
        await refreshUserData();
        toast.success("API key regenerated successfully");
      }
    } catch (error) {
      toast.error("Failed to regenerate API key");
    } finally {
      setIsRegeneratingKey(false);
    }
  };

  const copyApiKey = async () => {
    if (!currentApiKey) return;

    try {
      await navigator.clipboard.writeText(currentApiKey);
      toast.success("API key copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy API key");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteUserAccount();
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to delete account");
      setIsDeleting(false);
    }
  };
  console.log(user.apiKey, "currentApiKey");
  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload a profile picture to personalize your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatarUrl || ""}
                alt={user.name || "User"}
                className="avatar-image"
              />
              <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploadingImage}
                className="hidden"
                id="picture-upload"
              />
              <Button
                asChild
                variant="outline"
                disabled={isUploadingImage}
                className="w-full sm:w-auto"
              >
                <label htmlFor="picture-upload" className="cursor-pointer">
                  {isUploadingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Picture
                    </>
                  )}
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Key Section */}
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>API Key</CardTitle>
          <CardDescription>
            Manage your API key for external integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="flex items-center gap-2">
                <Input
                  type={showApiKey ? "text" : "password"}
                  value={currentApiKey || "••••••••••••••••"}
                  readOnly
                  className="bg-background/50 font-mono"
                />
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="h-8 w-8"
                    disabled={!currentApiKey}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyApiKey}
                    className="h-8 w-8"
                    disabled={!currentApiKey}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  onClick={handleRegenerateApiKey}
                  disabled={isRegeneratingKey}
                  className="bg-background/50"
                >
                  {isRegeneratingKey ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      {currentApiKey ? "Regenerate" : "Generate"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Use this API key to authenticate your requests. Keep it secure and
            never share it publicly.
          </p>
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Tell us about your trading journey and experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share your trading experience, preferred strategies, or any other relevant information..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleUpdateBio} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Bio"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Delete Account</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
