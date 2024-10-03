// export async function getOrders(
//   options: RequestInit = {}
// ): Promise<{ data: any[] }> {
//   // Promise<{success:boolean,message:string,data:IProduct[]}>
//   const inputOptions: RequestInit = {
//     // cache: "default",
//     ...options,
//   };
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URI}/orders`,
//     inputOptions
//   );
//   const data = res.json();
//   return data;
// }
