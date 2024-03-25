"use server";

import { revalidatePath } from "next/cache";
import { followUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
 try {
  const followedUser = await followUser(id);
  revalidatePath("/");
  if (followedUser) {
   revalidatePath(`/${followedUser.following.username}`);
  }
 } catch {
  throw new Error("Internal Error");
 }
};