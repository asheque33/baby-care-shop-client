import { z } from "zod";

export const userSchema = z.object({
  name: z.string({ required_error: "Name not provided" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  role: z.enum(["user", "admin"]).default("user").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const loggedInUserSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
