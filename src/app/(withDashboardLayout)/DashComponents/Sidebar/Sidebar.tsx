"use client";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
interface IDashboardSidebarProps {
  isAdmin: boolean;
  isUser: boolean;
}
const Sidebar: React.FC<IDashboardSidebarProps> = ({ isAdmin, isUser }) => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };
  return (
    <aside className="col-span-2  h-screen sticky top-0 left-0 z-50 overflow-auto bg-[#F5EFE6] bg-opacity-95 shadow-md p-4 lg:p-5">
      <nav className="flex flex-col gap-2  ">
        <span className="font-semibold text-base sm:text-lg  md:font-extrabold md:text-xl h-16 text-start sm:text-center truncate">
          <Link href={"/"}>
            Bab<span className="text-[#15a2bb]">Kr</span>Shop
          </Link>
        </span>
        {isAdmin && (
          <>
            <Link
              className={`flex items-center gap-2   font-bold text-lg   rounded-md px-3 py-1.5  ${
                isActive("/dashboard/products") ? "text-white bg-[#1898ae]" : ""
              }`}
              href="/dashboard/products"
            >
              <span className="shrink-0 ">
                <ShoppingBagIcon />
              </span>{" "}
              <span className="truncate">Products</span>
            </Link>

            <Link
              className={`flex items-center gap-2   font-bold text-lg   rounded-md px-3 py-1.5  ${
                isActive("/dashboard/add-product")
                  ? "text-white bg-[#1898ae]"
                  : ""
              }`}
              href="/dashboard/add-product"
            >
              <span className="shrink-0 ">
                <ShoppingBagIcon />
              </span>{" "}
              <span className="truncate">Add Product</span>
            </Link>
            <Link
              className={`flex items-center gap-2   font-bold text-lg rounded-md px-3 py-1.5  ${
                isActive("/dashboard/orders") ? "text-white bg-[#1898ae]" : ""
              }`}
              href="/dashboard/orders"
            >
              <span className="shrink-0 ">
                <ShoppingBagIcon />
              </span>{" "}
              <span className="truncate">Order Management</span>
            </Link>
          </>
        )}
        {isUser && (
          <>
            <Link
              className={`flex items-center gap-2   font-bold text-lg   rounded-md px-3 py-1.5  ${
                isActive("/dashboard/my-orders")
                  ? "text-white bg-[#1898ae]"
                  : ""
              }`}
              href="/dashboard/my-orders"
            >
              <span className="shrink-0 ">
                <ShoppingBagIcon />
              </span>{" "}
              <span className="truncate">My Orders</span>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
