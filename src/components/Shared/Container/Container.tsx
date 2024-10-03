import { cn } from "@/lib/utils";
import React from "react";
interface IContainerProps {
  children: React.ReactNode;
  className?: string;
}
const Container = ({ children, className }: IContainerProps) => {
  return (
    <div className={cn("w-full max-w-[1470px] px-5 mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;
