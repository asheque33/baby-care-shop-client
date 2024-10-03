import { IProduct } from "@/types/product.type";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import ProductCard from "../../ProductCard";
import { getProducts } from "@/utils/getProducts";

const TopRatedProducts = async () => {
  const { data: products } = await getProducts({
    next: {
      revalidate: 30,
    },
  });
  // Filter and sort the products based on their rating
  const topRatedProducts: IProduct[] = products
    .sort((a: IProduct, b: IProduct) => b.ratings - a.ratings)
    .slice(0, 8);
  return (
    <section className=" px-4 md:px-8 py-8 lg:px-12">
      <div className=" flex justify-between items-center mb-2 md:mb-4">
        <span className="text-lg md:text-2xl lg:text-3xl font-bold ">
          Top Rated Products
        </span>
        <Button asChild>
          <Link href="/baby-accessories">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4  md:gap-6 py-6">
        {topRatedProducts?.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default TopRatedProducts;
