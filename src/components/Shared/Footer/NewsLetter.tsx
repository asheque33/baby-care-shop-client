"use client";
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Validation schema for the email input
const formSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

const NewsLetter = () => {
  // Form state management using React Hook Form and Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handling form submission
  const handleEmailSubmit = async (values: { email: string }) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      });

      if (response.ok) {
        toast.success("Subscribed successfully!");
        form.reset(); // Reset form after successful submission
      } else {
        toast.message("Failed to subscribe. Please try later.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.message("An error occurred. Please try later.");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEmailSubmit)}>
        <div className="flex items-center space-x-2 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full h-full ">
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className=" bg-white text-[#15a2bb] w-1/3  h-12"
          >
            Subscribe
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewsLetter;
