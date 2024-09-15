"use client";
import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <header className="h-16">
      <nav className="h-full w-full max-w-[1470px] px-5 bg-[#3C3D37] text-[#F5EFE6] mx-auto flex items-center justify-around">
        <span className="font-extrabold text-xl">
          <Link href={"/"}>BabKrShop</Link>
        </span>
        <ul className="flex  space-x-6">
          <li
            className={`hover:text-[#40A2E3] focus:text-[#40A2E3] font-bold text-lg ${
              isActive("/categories") ? "text-[#40A2E3] " : ""
            }`}
          >
            <Link href="/categories">Categories</Link>
          </li>
          <li
            className={`hover:text-[#40A2E3] focus:text-[#40A2E3] font-bold text-lg ${
              isActive("/products") ? "text-[#40A2E3]" : ""
            }`}
          >
            <Link href="/products">Products</Link>
          </li>
          <li
            className={`hover:text-[#40A2E3] focus:text-[#40A2E3] font-bold text-lg ${
              isActive("/flash-sale") ? "text-[#40A2E3]" : ""
            }`}
          >
            <Link href="/flash-sale">Flash Sale</Link>
          </li>
        </ul>
        <div className="flex items-center justify-between gap-x-6">
          <Button variant={"outline"}>
            <Link href={`/sign-up`}>SignUp</Link>
          </Button>
          <Button variant={"ghost"}>
            <Link href={`/checkout`}>Cart</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
