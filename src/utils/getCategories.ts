import { ICategory } from "@/types/category.type";

export async function getCategories(
  options: RequestInit = {}
): Promise<{ data: ICategory[] }> {
  // Promise<{success:boolean,message:string,data:ICategory[]}>
  const inputOptions: RequestInit = {
    // cache: "default",
    ...options,
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/categories`,
    inputOptions
  );
  const data = res.json();
  return data;
}

// export async function getCategories(customOptions: RequestInit = {}) {
//   const defaultOptions: RequestInit = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     cache: "default", // default cache option
//   };

//   const mergedOptions = { ...defaultOptions, ...customOptions };

//   const response = await fetch(
//     "${process.env.NEXT_PUBLIC_BACKEND_URI}/categories",
//     mergedOptions
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await response.json();
//   return data;
// }
