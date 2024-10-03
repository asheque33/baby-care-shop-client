import { IProduct } from "@/types/product.type";

// values(key, value) form theke  ashche
export function modifyToFormData(values: IProduct) {
  console.log("input values", values);
  const plainObject = { ...values };
  const data = JSON.stringify(plainObject);
  const formData = new FormData();
  formData.append("data", data);
  return formData;
}
