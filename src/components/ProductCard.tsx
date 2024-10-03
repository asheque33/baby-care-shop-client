"use client";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IProduct } from "@/types/product.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCartItem } from "@/redux/features/cartSlice";
interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, title, image, price, prevPrice, ratings, isFlashSale } = product;
  const dispatch = useAppDispatch();
  const handleAddToCart = (product: IProduct) => {
    console.log("add to cart", product);
    dispatch(addToCartItem(product));
  };
  const ratingsStyle = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffc107",
    inactiveFillColor: "#ffe8a4",
  };
  return (
    <Card className="relative w-3/4 sm:w-full h-full max-h-[350px] md:max-h-[400px] lg:max-h-[450px] mx-auto ">
      <Link className="  " href={`/baby-accessories/${_id}`}>
        <CardHeader className="relative h-full max-h-[180px] md:max-h-[200px] lg:max-h-[220px]  ">
          {/*overflow-hidden*/}
          <div className="relative w-full h-full  ">
            {/*aspect-[4/3]*/}
            <Image
              width={0}
              height={0}
              className="w-full h-full object-contain"
              src={image}
              alt={title}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 33vw"
            />
            {isFlashSale && (
              <span className="absolute top-2 left-2 bg-[#3C3D37] text-[#F5EFE6] px-1.5 py-1 text-xs md:text-sm lg:text-base">
                5% Off
              </span>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-4 py-2">
          <CardTitle className="text-sm md:text-lg lg:text-xl truncate">
            {title.length > 20 ? `${title.slice(0, 20)}...` : title}
          </CardTitle>
          <div className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base font-semibold">
            {isFlashSale && (
              <CardDescription className="line-through">
                ${prevPrice}
              </CardDescription>
            )}
            <CardDescription>${price}</CardDescription>
          </div>
          <Rating
            style={{ maxWidth: 100, height: 40, width: "100%" }}
            value={ratings}
            itemStyles={ratingsStyle}
            readOnly
          />
        </CardContent>
      </Link>
      <CardFooter>
        {/* Add to Cart button with hover effect */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="block w-full"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
