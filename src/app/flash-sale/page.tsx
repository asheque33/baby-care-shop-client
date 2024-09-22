import { getProducts } from "@/utils/getProducts";
import React from "react";
import { IProduct } from "@/types/product.type";
import ProductCard from "@/components/ProductCard";

import FlashTime from "../../components/FlashTime";

const FlashSalePage = async () => {
  const { data: products } = await getProducts();
  const flashProducts = products?.filter(
    (product: IProduct) => product.isFlashSale === true
  );
  return (
    <section className=" px-4 md:px-8 py-8 lg:px-12">
      <div className=" flex gap-x-8 items-center mb-2 md:mb-4">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold ">
          Flash Sale
        </h2>
        <div className="flex items-center gap-x-3 text-lg md:text-2xl lg:text-3xl">
          <span className="text-pink-500 font-medium">Ends in</span> :{" "}
          <span className="text-slate-600 font-semibold">
            <FlashTime />
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 py-6">
        {flashProducts?.map((fProduct: IProduct) => (
          <ProductCard key={fProduct._id} product={fProduct} />
        ))}
      </div>
    </section>
  );
};

export default FlashSalePage;
