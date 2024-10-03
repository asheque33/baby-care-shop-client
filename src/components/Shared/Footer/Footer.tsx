"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import NewsLetter from "./NewsLetter";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="h-full sm:h-72 pt-4  sm:pt-0  bg-[#15a2bb] text-white">
      <Container className="h-[90%] w-10/12 flex flex-col gap-4 sm:flex-row sm:items-center justify-between text-lg font-normal text-white px-4 md:px-8 lg:px-12">
        {/* First Column */}
        <div className="text-center w-full sm:w-1/3 px-2 ">
          <h1 className="text-xl font-semibold">BabyKrShop</h1>
          <p className="text-slate-300">
            A reliable shop for your baby care items, guaranteed to be
            hassle-free!
          </p>
          <p>Email: babyland@care.com</p>
          <p>Lalmatia, Dhaka-1207</p>
          <div className="flex justify-center gap-x-3">
            <Link href={`#`}>
              <FacebookIcon />
            </Link>
            <Link href={`#`}>
              <InstagramIcon />
            </Link>
            <Link href={`#`}>
              <TwitterIcon />
            </Link>
          </div>
        </div>

        {/* Second Column */}
        <div className=" text-center   w-full sm:w-1/3 ">
          <h1 className="text-xl font-semibold">Useful Links</h1>
          <nav className="flex flex-col font-medium text-lg">
            <Link href={`#`}>Trending Products</Link>
            <Link href={`/categories`}>Category</Link>
            <Link href={`#`}>About Us</Link>
            <Link href={`#`}>Contact Us</Link>
          </nav>
        </div>

        {/* Third Column */}
        <div className=" w-full sm:w-1/3 ">
          <h1 className="text-center text-xl font-semibold">Newsletter</h1>
          <p className="text-lg font-medium text-slate-300">
            Sign up for our newsletter to receive updates and exclusive offers.
          </p>
          <div className="w-full mt-2">
            <NewsLetter />
          </div>
        </div>
      </Container>
      <p className="h-[10%] flex justify-center items-end my-1 sm:my-0">
        © 2024 BabyKrShop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
