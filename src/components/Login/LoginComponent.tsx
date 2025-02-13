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
import { addUser, selectedUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getLoggedInUser } from "@/services/actions/loginUser";

import { ILoggedInUser } from "@/types/user.type";
import { loggedInUserSchema } from "@/types/zodUser.type";
import { capitalize } from "@/utils/capitalizedWord";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof loggedInUserSchema>>({
    resolver: zodResolver(loggedInUserSchema),
  });
  const { control, handleSubmit, setValue, reset } = form;

  const handleUserCredentialsDemo = () => {
    setValue("email", "ashequrrahman3333@gmail.com");
    setValue("password", "123456");
  };
  const handleAdminCredentialsDemo = () => {
    setValue("email", "ashequerahman33@gmail.com");
    setValue("password", "123456");
  };
  const onSubmit: SubmitHandler<ILoggedInUser> = async (data) => {
    try {
      const res = await getLoggedInUser(data);

      if (res.success) {
        dispatch(addUser(res.accessToken));
        reset({ email: "", password: "" });
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const auth = useAppSelector(selectedUser);
  const userRole = capitalize(auth?.role as string);
  useEffect(() => {
    if (userRole) {
      toast.success(`${userRole} is logged in successfully!`);
      router.push("/");
    }
  }, [userRole, router]);

  return (
    <div className=" w-4/5">
      <section
        id="demo-credentials"
        className="my-4 flex flex-col items-center gap-2"
      >
        <Button
          onClick={handleAdminCredentialsDemo}
          size={"lg"}
          type="submit"
          className="block w-full"
        >
          Demo Admin Credentials
        </Button>
        <Button
          onClick={handleUserCredentialsDemo}
          size={"lg"}
          type="submit"
          className="block w-full"
        >
          Demo User Credentials
        </Button>
      </section>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
    </div>
  );
};

export default LoginComponent;
