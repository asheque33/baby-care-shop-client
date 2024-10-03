"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getRegisteredUser } from "@/services/actions/registerUser";

import { IUser } from "@/types/user.type";
import { userSchema } from "@/types/zodUser.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const RegisterComponent = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      password: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const res = await getRegisteredUser(data);
      if (res.success) {
        toast.success(res.message);
        reset({ name: "", email: "", password: "" });
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-4/5">
        {/* FullName Field */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FullName</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter FullName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-blue-400/75 hover:bg-blue-400/95 focus:bg-blue-400/95 hover:text-white text-white transition-all rounded-md"
          variant="outline"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RegisterComponent;
