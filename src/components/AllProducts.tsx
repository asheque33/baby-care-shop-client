import { IProduct } from "@/types/product.type";
import React from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/utils/getProducts";

const AllProducts = async () => {
  const { data: products } = await getProducts();
  return (
    <section className="col-span-12 md:col-span-8 lg:col-span-9">
      <header className=" w-4/5 sm:w-3/4 md:w-full    mx-auto my-5 text-center md:text-start">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold md:font-bold">
          <span className="text-[#1898ae]">Total</span> Products
        </h1>
        <p className="text-base text-[#1898ae]">
          Showing 1-{products.length} Of {products.length} item(s)
        </p>
        <p className="text-slate-400 italic">
          Products designed for safety, comfort, and joyful moments—from feeding
          to bath time, we’ve got your little one covered!
        </p>
      </header>
      <div
        id="products-lists"
        className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:grid-cols-3  md:gap-x-3 md:gap-y-4  lg:gap-4 xl:gap-6"
      >
        {products?.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
