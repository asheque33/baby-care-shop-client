import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="h-64 bg-yellow-400 ">
      <section className="h-4/5 flex items-center justify-around text-white">
        <div>
          <span>BabyKrShop</span>A reliable shop for your baby care!
          <p>Email : babyland@care.com</p>
          <p>Lalmatia, Dhaka-1207</p>
        </div>
        <div>
          <nav>
            <Link href={`#`}>Trending Products</Link>
            <Link href={`/category`}>Category</Link>
            <Link href={`#`}>About Us</Link>
            <Link href={`#`}>Contact Us</Link>
          </nav>
        </div>
        <div>
          <div className="flex gap-x-2">
            <Link href={`#`}>
              <FacebookIcon />
            </Link>
            <Link href={`#`}>
              <InstagramIcon />
            </Link>
            <Link href={`#`}>
              <TwitterLogoIcon />
            </Link>
          </div>
        </div>
      </section>
      <p className="h-1/5 text-center">
        �� 2024 BabyKrShop. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
