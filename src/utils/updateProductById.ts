"use server";
import axios from "axios";

// Update product function using axios
export const updateProduct = async (
  productId: string,
  updatedData: Record<string, unknown>
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/products/${productId}`,
      updatedData,

      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    return response?.data;
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while updating the product.",
    };
  }
};
