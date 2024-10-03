"use server";

import { IProduct } from "@/types/product.type";

export async function createProduct(formData: Partial<IProduct>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/product`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    }, //* browser automatically supports  formData
    body: JSON.stringify(formData),
    cache: "no-store",
  });
  const productInfo = await res.json();
  return productInfo;
}
