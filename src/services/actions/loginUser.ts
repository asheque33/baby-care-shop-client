"use server";
import { ILoggedInUser } from "@/types/user.type";

export async function getLoggedInUser(data: ILoggedInUser) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const loginUserInfo = await res.json();
  return loginUserInfo;
}
