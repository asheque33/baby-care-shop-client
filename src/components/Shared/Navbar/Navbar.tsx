"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cartIcon from "@/public/icons/shopping-cart.png";
import menuFoldInIcon from "@/public/icons/hamburger-menu.png";
import menuFoldOutIcon from "@/public/icons/cross-menu.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectedCartItems } from "@/redux/features/cartSlice";
import { Badge } from "@/components/ui/badge";
import { selectedToken, setLogOut } from "@/redux/features/authSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const cartProducts = useAppSelector(selectedCartItems);
  const accessToken = useAppSelector(selectedToken);
  const dispatch = useAppDispatch();

  const isActive = (path: string) => {
    return pathName === path;
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleDashboardClick = () => {
    router.push(accessToken ? "/dashboard" : "/login");
  };

  return (
    <div className="h-16 bg-[#F5EFE6] bg-opacity-95 shadow-md">
      <nav className="h-full w-full text-black mx-auto flex items-center justify-around">
        <span className="font-extrabold text-xl">
          <Link href={"/"}>
            Bab<span className="text-[#15a2bb]">Kr</span>Shop
          </Link>
        </span>
        <ul className="hidden lg:flex  space-x-6">
          {/*text-[#40A2E3]*/}
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/categories") ? "text-[#1898ae] " : ""
            }`}
          >
            <Link href="/categories">Categories</Link>
          </li>
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/baby-accessories") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/baby-accessories">Products</Link>
          </li>
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/flash-sale") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/flash-sale">Flash Sale</Link>
          </li>
          <li
            onClick={handleDashboardClick}
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/dashboard") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
        <div className="hidden lg:flex items-center justify-between gap-x-8">
          {accessToken ? (
            <Button
              onClick={() => dispatch(setLogOut())}
              className=" text-white border-0 hover:bg-opacity-90"
              variant="destructive"
            >
              LogOut
            </Button>
          ) : (
            <Button
              className="bg-[#1898ae] border hover:border border-[#1898ae] text-white "
              variant="outline"
            >
              <Link href={`/login`}>Login</Link>
            </Button>
          )}

          <Link href={`/checkout`}>
            <div className="relative">
              <Image
                src={cartIcon}
                height={0}
                width={0}
                alt="cartIcon"
                className="relative size-8 "
              />

              {cartProducts.length > 0 && (
                <Badge
                  className="absolute -top-2.5 -right-3 size-6 bg-[#1898ae] p-3 rounded-full"
                  variant="default"
                >
                  <span className=" text-lg">{cartProducts.length}</span>
                </Badge>
              )}
            </div>
          </Link>
        </div>
        <div id="menu-trigger" onClick={toggleDrawer} className="lg:hidden">
          <Image
            src={isDrawerOpen ? menuFoldOutIcon : menuFoldInIcon}
            height={24}
            width={24}
            alt="menuFoldInIcon"
            className="cursor-pointer"
          />
        </div>
      </nav>
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-y-16 inset-x-0 bg-black bg-opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}

      {/* Drawer Menu */}
      <div
        className={`fixed top-0 left-0 h-fit p-4 text-center w-full max-w-screen-lg bg-[#f5efe6] shadow-lg z-50 transform ${
          isDrawerOpen ? "translate-y-16" : "-translate-y-full"
        } transition-transform duration-500`}
      >
        <ul onClick={() => setIsDrawerOpen(false)} className="p-4 space-y-4">
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/categories") ? "text-[#1898ae] " : ""
            }`}
          >
            <Link href="/categories">Categories</Link>
          </li>
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/baby-accessories") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/baby-accessories">Products</Link>
          </li>
          <li
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/flash-sale") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/flash-sale">Flash Sale</Link>
          </li>
          <li
            onClick={handleDashboardClick}
            className={`hover:text-[#1898ae] focus:text-[#1898ae] font-bold text-lg ${
              isActive("/dashboard") ? "text-[#1898ae]" : ""
            }`}
          >
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            {accessToken ? (
              <Button
                onClick={() => dispatch(setLogOut())}
                className=" text-white border-0 hover:bg-opacity-90"
                variant="destructive"
              >
                LogOut
              </Button>
            ) : (
              <Button
                className="bg-[#1898ae] border hover:border border-[#1898ae] text-white "
                variant="outline"
              >
                <Link href={`/login`}>Login</Link>
              </Button>
            )}
          </li>
          <li className="relative">
            <Link href={`/checkout`}>
              <Image
                src={cartIcon}
                height={0}
                width={0}
                alt="cartIcon"
                className="mx-auto size-12 "
              />
              {cartProducts.length > 0 && (
                <Badge
                  className="absolute top-0  size-6 bg-[#1898ae] p-3 rounded-full"
                  variant="default"
                >
                  <span className=" text-lg">{cartProducts.length}</span>
                </Badge>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
