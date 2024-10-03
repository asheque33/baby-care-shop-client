import { z } from "zod";

export const createProductSchema = z.object({
  image: z.string({
    required_error: "Image must be provided",
    invalid_type_error: "Image must be a valid url",
  }),
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be a positive number"),
  prevPrice: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, "Price must be a positive number"),
  isFlashSale: z.boolean().default(true).optional(),
  ratings: z.number().min(1, "Ratings must be a number"),
  description: z.string().min(1, "Description is required"),
});

export const updateProductSchema = z.object({
  image: z.string(),
  title: z.string().min(1, "Title is required"),
  category: z.string(),
  price: z.number().positive(),
  prevPrice: z.number().positive(),
});
