"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import cartIcon from "@/public/icons/shopping-cart.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectedCartItems } from "@/redux/features/cartSlice";
import { Badge } from "@/components/ui/badge";
import { selectedToken, setLogOut } from "@/redux/features/authSlice";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const cartProducts = useAppSelector(selectedCartItems);
  const accessToken = useAppSelector(selectedToken);
  const dispatch = useAppDispatch();

  const isActive = (path: string) => {
    return pathName === path;
  };
  const handleDashboardClick = () => {
    if (accessToken) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="h-16 bg-[#F5EFE6] bg-opacity-95 shadow-md">
      <nav className="h-full w-full max-w-[1470px] px-5  text-black mx-auto flex items-center justify-around">
        <span className="font-extrabold text-xl">
          <Link href={"/"}>
            Bab<span className="text-[#15a2bb]">Kr</span>Shop
          </Link>
        </span>
        <ul className="flex  space-x-6">
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
        <div className="flex items-center justify-between gap-x-8">
          {accessToken ? (
            <Button
              onClick={() => dispatch(setLogOut())}
              className=" text-white border-0"
              variant="destructive"
            >
              LogOut
            </Button>
          ) : (
            <Button
              className="bg-[#1898ae] text-white border-0"
              variant="outline"
            >
              <Link href={`/register`}>SignUp</Link>
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
      </nav>
    </header>
  );
};

export default Navbar;
