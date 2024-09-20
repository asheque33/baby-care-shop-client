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
          <section className="col-span-9">
            <header className="flex items-center justify-between pr-4 mb-4">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold">
                Categorized Products
              </h1>
              <Button asChild>
                <Link href={`/baby-accessories`}>View All</Link>
              </Button>
            </header>
            <div id="products-length" className="mb-4">
              <p className="text-base  text-[#2192FF]">
                Showing 1-{searchedProducts.length} Of 18 item(s)
              </p>
              <p className="text-slate-400 italic">
                Products designed for safety, comfort, and joyful moments—from
                feeding to bath time, we’ve got your little one covered!
              </p>
            </div>
            <div
              id="searched-products"
              className="grid grid-cols-2  gap-4 md:grid-cols-4  md:gap-6 "
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
