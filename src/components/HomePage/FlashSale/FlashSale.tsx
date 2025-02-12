import { Button } from "@/components/ui/button";
import React from "react";
import { IProduct } from "@/types/product.type";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/utils/getProducts";

const FlashSale = async () => {
  const { data } = await getProducts({
    next: {
      revalidate: 30,
    },
  });
  const products: IProduct[] = data?.filter(
    (product: IProduct) => product.isFlashSale === true
  );
  const flashSaleProducts: IProduct[] = products
    .sort((a: IProduct, b: IProduct) => b._id.localeCompare(a._id))
    .slice(0, 6);

  return (
    <div className="py-8">
      <section className=" flex justify-between items-center mb-2 md:mb-4">
        <span className="text-lg md:text-2xl lg:text-3xl font-bold ">
          Flash Sale
        </span>
        <Button asChild>
          <Link href="/flash-sale">View All</Link>
        </Button>
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-5 xl:gap-6 py-6 overflow-x-hidden">
        {flashSaleProducts?.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
