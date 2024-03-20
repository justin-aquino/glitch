import { db } from "./db";
import { getSelf } from "./auth-service";

export const isFollowingUser = async (id: string) => {
 try {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
   where: { id },
  });

  if (!otherUser) {
   throw new Error("User not found");
  }

  if (otherUser.id === self.id) {
   return true;
  }

  const existingFollow = await db.follow.findFirst({
   where: {
    followerId: self.id,
    followingId: otherUser.id,
   },
  });
  return !!existingFollow; //double Boolean;
 } catch {
  return false;
 }
};

export const followUser = async (id: string) => {
 const self = await getSelf();

 const otherUser = await db.user.findUnique({
  where: { id },
 });

 if (!otherUser) {
  throw new Error("User not found!");
 }

 if (otherUser.id === self.id) {
  throw new Error("Cannot follow yourself!");
 }

 //if already following

 const existingFollow = await db.follow.findFirst({
  where: {
   followerId: self.id,
   followingId: otherUser.id,
  },
 });

 if (existingFollow) {
  throw new Error("Already following!");
 }
};