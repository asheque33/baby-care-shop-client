import AllCategoriesList from "@/components/AllCategoriesList";
import AllProducts from "@/components/AllProducts";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Shared/Container/Container";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product.type";
import { IProps } from "@/types/props.type";
import { getSearchCategory } from "@/utils/getSearchCategory";
import Link from "next/link";
import React from "react";

const ProductsPage = async (props: IProps) => {
  const { searchParams } = props;
  const { data: searchedProducts } = await getSearchCategory(
    searchParams.category
  );

  return (
    <Container>
      <section className="grid grid-cols-12 gap-x-4 md:gap-x-6 py-6">
        <AllCategoriesList />
        {!searchParams?.category ? (
          <AllProducts />
        ) : (
          <section className="col-span-12 md:col-span-8 lg:col-span-9">
            <header className=" w-4/5 sm:w-3/4 md:w-full    mx-auto my-5">
              <div className="flex items-center justify-between">
                <h1 className=" text-lg md:text-xl lg:text-2xl font-semibold md:font-bold">
                  <span className="text-[#1898ae]">
                    {searchParams?.category
                      .split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      ) // Capitalize first letter and lowercase the rest
                      .join(" ")}{" "}
                  </span>
                  Products
                </h1>
                <Button asChild>
                  <Link href={`/baby-accessories`}>View All</Link>
                </Button>
              </div>
              <div id="products-length" className="mb-4">
                <p className="text-base  text-[#1898ae]">
                  Showing 1-{searchedProducts.length} Of 19 item(s)
                </p>
                <p className="text-slate-400 italic">
                  Products designed for safety, comfort, and joyful moments—from
                  feeding to bath time, we’ve got your little one covered!
                </p>
              </div>
            </header>
            <div
              id="searched-products"
              className="grid grid-cols-1 sm:grid-cols-2  gap-4 lg:grid-cols-3  md:gap-x-3 md:gap-y-4  lg:gap-4 xl:gap-6"
            >
              {searchedProducts?.map((searchedProduct: IProduct) => (
                <ProductCard
                  key={searchedProduct._id}
                  product={searchedProduct}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </Container>
  );
};

export default ProductsPage;
