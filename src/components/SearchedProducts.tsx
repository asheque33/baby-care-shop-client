"use client";
import { searchTerm } from "@/redux/features/searchSlice";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/product.type";
import React from "react";
import ProductCard from "./ProductCard";

const SearchedProducts = ({ products }: { products: IProduct[] }) => {
  const searchedTerm = useAppSelector(searchTerm);
  const filteredProducts = [] as any;
  searchedTerm.trim() === ""
    ? products.forEach((product) => {
        filteredProducts.push(
          <ProductCard key={product._id} product={product} />
        );
      })
    : products.forEach((product) => {
        if (
          product.title.toLowerCase().indexOf(searchedTerm.toLowerCase()) === -1
        ) {
          return;
        }
        filteredProducts.push(
          <ProductCard key={product._id} product={product} />
        );
      });
  //   : products.filter((product: IProduct) =>
  //       product.title.toLowerCase().includes(searchedTerm.toLowerCase())
  //     );
  return (
    <div
      id="products-lists"
      className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:grid-cols-3  md:gap-x-3 md:gap-y-4  lg:gap-4 xl:gap-6"
    >
      {filteredProducts}
    </div>
  );
};

export default SearchedProducts;
