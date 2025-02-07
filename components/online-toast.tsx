"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { useOnlineStatus } from "@/hooks/use-online-status";

export const OnlineToast = () => {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      toast("You are online");
    } else {
      toast("You are offline");
    }
  }, [isOnline]);

  return null;
};
