import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import type { Metadata } from "next";
import React from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Baby Care Shop",
  description: "An e-commerce website built with Next.js",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <ReduxProvider>
    <div className="flex flex-col min-h-screen">
      <section className="sticky top-0 z-[999]">
        <Navbar />
      </section>
      <div className="flex-grow">{children}</div>
      <div className="">
        <Footer />
      </div>
      <Toaster position="top-center" duration={3000} />
    </div>
    // </ReduxProvider>
  );
};

export default MainLayout;
