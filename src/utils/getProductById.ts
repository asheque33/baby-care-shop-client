import { IProduct } from "@/types/product.type";

export async function getProductById(
  productId: string,
  options: RequestInit = {}
): Promise<{ data: IProduct }> {
  // Promise<{success:boolean,message:string,data:IProduct[]}>
  const inputOptions: RequestInit = {
    cache: "default",
    ...options,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/product/${productId}`,
    inputOptions
  );
  const data = res.json();
  return data;
}
