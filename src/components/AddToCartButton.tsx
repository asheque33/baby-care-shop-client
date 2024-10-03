"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCartItem } from "@/redux/features/cartSlice";
import { IProduct } from "@/types/product.type";
import cartIcon from "@/public/icons/shopping-cart.png";

const AddToCartButton = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: IProduct) => {
    dispatch(addToCartItem(product));
  };
  return (
    <Button
      onClick={() => handleAddToCart(product)}
      variant={"default"}
      className="mt-4 bg-[#ffc107] transition-all py-6  rounded-md text-lg"
    >
      <span className="sm:w-full md:w-auto flex items-center justify-evenly gap-x-2  md:px-3 md:gap-x-6 ">
        <Image height={30} width={30} src={cartIcon} alt="icon" />{" "}
        <span className="sm:text-base md:text-lg pr-6 md:pr-0">
          Add to Cart
        </span>
      </span>
    </Button>
  );
};

export default AddToCartButton;
