"use client";
import { ReactNode } from "react";
import Sidebar from "./DashComponents/Sidebar/Sidebar";
import { Toaster } from "sonner";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectedToken, selectedUser } from "@/redux/features/authSlice";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectedToken);
  const user = useAppSelector(selectedUser);
  if (!token) {
    redirect("/login");
  }
  const isAdmin = user!.role === "admin";
  const isUser = user!.role === "user";
  return (
    <section className="grid grid-cols-12">
      <Sidebar isAdmin={isAdmin} isUser={isUser} />
      <div className="col-span-10 h-full  ">
        <header className="h-16 sticky top-0 left-0 bg-[#F5EFE6] bg-opacity-95 shadow-md"></header>
        {children}
      </div>
      <Toaster position="top-center" />
    </section>
  );
};

export default DashboardLayout;
