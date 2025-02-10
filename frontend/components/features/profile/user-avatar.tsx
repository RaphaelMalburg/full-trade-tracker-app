"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SafeUser } from "@/lib/types/user";
import { useEffect, useState, useCallback } from "react";
import { getUserAvatarData } from "@/lib/actions/user/userActions";
import Image from "next/image";

interface UserAvatarProps extends React.ComponentPropsWithoutRef<typeof Avatar> {
  user: SafeUser;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const [mounted, setMounted] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initial data setup
  useEffect(() => {
    if (user && mounted) {
      setAvatarUrl(user.avatarUrl);
      setUserName(user.name);
      setUserEmail(user.email);
      setImageError(false);
    }
  }, [user, mounted]);

  // Get initials from name or email
  const getInitials = () => {
    if (userName) {
      return userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    if (userEmail) {
      return userEmail[0].toUpperCase();
    }
    return "U";
  };

  // Prevent hydration mismatch by not rendering anything until mounted
  if (!mounted) {
    return (
      <Avatar {...props}>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar {...props}>
      <AvatarImage src={user.avatarUrl || ""} alt={user.name || "User avatar"} />
      <AvatarFallback>{user.name?.[0]?.toUpperCase() || "U"}</AvatarFallback>
    </Avatar>
  );
}
