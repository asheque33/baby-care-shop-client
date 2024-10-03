import Container from "@/components/Shared/Container/Container";
import Image from "next/image";
import Link from "next/link";
import starFalling from "../../../../public/icons/shooting-star-svgrepo-com.svg";
import React from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { IProduct } from "@/types/product.type";
import { notFound } from "next/navigation";
import { IProps } from "@/types/props.type";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/products`);
  const data = await res.json();

  return data?.data.slice(0, 15).map((product: IProduct) => ({
    productId: product._id,
  }));
}
// Product fetch from SSR or SSG
const fetchProduct = async (productId: string): Promise<IProduct | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${productId}`,
    {
      // For SSR, you may use 'no-store' to disable caching
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const { data } = await res.json();
  return data;
};

const SingleProductPage = async ({ params }: IProps) => {
  const product = await fetchProduct(params.productId);

  if (!product) {
    return notFound(); // Handle product not found
  }
  const ratingsStyle = {
    itemShapes: RoundedStar,
    activeFillColor: "#ffc107",
    inactiveFillColor: "#ffe8a4",
  };

  return (
    <Container>
      <section className="shadow-slate-400 shadow-xl bg-[#EEF5FF] flex flex-row gap-x-8 p-10 w-full max-w-full mt-2 mb-4">
        <div className="border-2 bg-white px-4 py-2">
          <Image src={product.image} alt="singleImg" height={250} width={300} />
        </div>
        <section className="product-description my-3">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2">
            {product.title}
          </h1>
          <div className=" flex items-center gap-x-2">
            <Rating
              style={{ maxWidth: 100, height: 40, width: "100%" }}
              value={product.ratings}
              itemStyles={ratingsStyle}
              readOnly
            />{" "}
            | <span>2 Reviews</span>
          </div>
          <p className="text-lg font-medium mb-2">
            Category:{" "}
            <Link
              className="text-[#2192FF] font-normal text-base"
              href={`/baby-accessories`}
            >
              {product.category}
            </Link>
          </p>
          <p className="text-lg font-medium mb-3">$USD. {product.price}</p>
          {product.isFlashSale && (
            <div className="w-full md:w-3/5 lg:w-1/2  flex justify-center text-[#333] bg-[#ffc107] mt-1 animate-bounce duration-1000 gap-x-2 md:gap-x-4 text-lg md:text-xl  font-medium rounded-sm">
              <span className="-mt-0.5 ">Flash Sale </span>
              <Image height={30} width={30} src={starFalling} alt="star" />{" "}
            </div>
          )}
          <AddToCartButton product={product} />
        </section>
      </section>
      <section className="shadow-slate-400 shadow-xl bg-[#EEF5FF] flex flex-col gap-y-4 p-10 w-full max-w-full">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold">
          Product Description:
        </h1>
        {product.description && (
          <ol className="text-lg font-medium list-[square]">
            {product.description
              .split(/([.!?])\s*/g)
              .filter(
                (sentence: string) =>
                  sentence.trim().length > 0 &&
                  ![".", "!", "?"].includes(sentence)
              )
              .map((sentence: string, index: number) => (
                <li key={index}>{sentence}</li>
              ))}
          </ol>
        )}
      </section>
    </Container>
  );
};

export default SingleProductPage;
