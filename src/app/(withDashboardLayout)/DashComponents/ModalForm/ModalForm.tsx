"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProductSchema } from "@/types/productZod.type";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProduct } from "@/types/product.type";
import { getCategories } from "@/utils/getCategories";
import { ICategory } from "@/types/category.type";
import { updateProduct } from "@/utils/updateProductById";
import { toast } from "sonner";

interface ModalFormProps {
  product: IProduct;
  setVisible: Dispatch<SetStateAction<boolean>>;
  getUpdated: (updatedProduct: IProduct) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({
  product,
  setVisible,
  getUpdated,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  // Initialize react-hook-form with default values from the passed product
  const form = useForm<z.infer<typeof updateProductSchema>>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      image: product.image || "",
      title: product.title || "",
      category: product.category || "",
      price: product.price || 0,
      prevPrice: product.prevPrice || 0,
    },
  });
  const { handleSubmit, control, reset } = form;

  // Fetch categories only once
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Update form values if the passed product prop changes
  useEffect(() => {
    reset({
      image: product.image || "",
      title: product.title || "",
      category: product.category || "",
      price: product.price || 0,
      prevPrice: product.prevPrice || 0,
    });
  }, [product, reset]);

  // Form submit handler
  const onSubmit: SubmitHandler<Partial<IProduct>> = async (data) => {
    try {
      const updatedData = {
        ...data,
        isFlashSale: data.prevPrice !== data.price,
      };

      const response = await updateProduct(product._id, updatedData);

      if (response.success) {
        toast.success("Product updated successfully");
        getUpdated({ ...product, ...updatedData });
        setVisible(false);
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      toast.error("An error occurred during update");
      console.error(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Field */}
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: ICategory) => (
                      <SelectItem key={category.id} value={category.title}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Product Price"
                  value={value}
                  onChange={(event) => onChange(parseFloat(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Previous Price Field */}
        <FormField
          control={control}
          name="prevPrice"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Previous Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Previous Product Price"
                  value={value}
                  onChange={(event) => onChange(parseFloat(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-blue-400/80 hover:bg-blue-400/95 focus:bg-blue-400/95 hover:text-white text-white transition-all rounded-md"
          variant="outline"
          type="submit"
          onClick={() => setVisible(false)}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ModalForm;
