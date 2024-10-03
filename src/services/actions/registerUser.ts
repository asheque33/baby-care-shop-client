"use server";

import { IUser } from "@/types/user.type";

export async function getRegisteredUser(data: IUser) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const registeredUserInfo = await res.json();
  return registeredUserInfo;
}
