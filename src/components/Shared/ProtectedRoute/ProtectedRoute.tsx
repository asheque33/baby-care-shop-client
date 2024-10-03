import { selectedToken } from "@/redux/features/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useAppSelector(selectedToken);
  if (!accessToken) {
    return redirect("/login");
  }
  return children;
};

export default ProtectedRoute;
