import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Baby Care Shop",
  description: "An e-commerce website built with Next.js",
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>

      <Footer />
      <Toaster position="top-center" duration={3000} />
    </div>
  );
};

export default MainLayout;
