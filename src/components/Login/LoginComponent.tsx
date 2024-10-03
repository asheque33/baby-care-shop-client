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
import { addUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getLoggedInUser } from "@/services/actions/loginUser";

import { ILoggedInUser } from "@/types/user.type";
import { loggedInUserSchema } from "@/types/zodUser.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof loggedInUserSchema>>({
    resolver: zodResolver(loggedInUserSchema),
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit: SubmitHandler<ILoggedInUser> = async (data) => {
    try {
      const res = await getLoggedInUser(data);

      if (res.success) {
        toast.success(res.message);
        reset({ email: "", password: "" });
        router.push("/");
        dispatch(addUser(res.accessToken));
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-4/5">
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

export default LoginComponent;
