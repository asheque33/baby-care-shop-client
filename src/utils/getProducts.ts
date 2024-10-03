import { IProduct } from "@/types/product.type";

export async function getProducts(
  options: RequestInit = {}
): Promise<{ data: IProduct[] }> {
  // Promise<{success:boolean,message:string,data:IProduct[]}>
  const inputOptions: RequestInit = {
    // cache: "default",
    ...options,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/products`,
    inputOptions
  );
  const data = res.json();
  return data;
}

/*
// api function with more customizable options
export async function getProducts(customOptions: RequestInit = {}) {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "default", // default cache option
  };

  const mergedOptions = { ...defaultOptions, ...customOptions };

  const response = await fetch("https://example.com/api/products", mergedOptions);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

*/
