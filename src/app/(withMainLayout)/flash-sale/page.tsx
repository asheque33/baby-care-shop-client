import { getProducts } from "@/utils/getProducts";
import React from "react";
import { IProduct } from "@/types/product.type";
import ProductCard from "@/components/ProductCard";
import FlashTime from "@/components/FlashTime";
import Container from "@/components/Shared/Container/Container";

const FlashSalePage = async () => {
  const { data: products } = await getProducts({
    cache: "no-store",
  });
  const flashProducts = products?.filter(
    (product: IProduct) => product.isFlashSale === true
  );
  return (
    <Container className="">
      <div className="w-3/4 sm:w-full flex flex-col text-start sm:flex-row sm:gap-x-8 md:items-center mt-4 sm:mt-6 mx-auto px-8 sm:px-2">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold ">
          <span className="text-[#1898ae]">Flash</span> Sale
        </h2>
        <div className="flex items-center gap-x-3 text-lg md:text-xl lg:text-2xl">
          <span className="text-[#1898ae] font-medium">Ends in</span> :{" "}
          <span className="text-[#333] font-semibold">
            <FlashTime />
          </span>
        </div>
      </div>
      <div
        id="flashSale-cards"
        className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-5 xl:gap-6 py-6 overflow-x-hidden"
      >
        {flashProducts?.map((fProduct: IProduct) => (
          <ProductCard key={fProduct._id} product={fProduct} />
        ))}
      </div>
    </Container>
  );
};

export default FlashSalePage;
