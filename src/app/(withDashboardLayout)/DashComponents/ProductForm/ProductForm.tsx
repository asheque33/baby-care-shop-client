"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/services/actions/createProductData";
import { ICategory } from "@/types/category.type";
import { IProduct } from "@/types/product.type";
import { createProductSchema } from "@/types/productZod.type";
import { getCategories } from "@/utils/getCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProductForm = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
  });
  const { handleSubmit, control, reset } = form;

  //  input fields form-> modifyToFormData->backend server:createProduct->submit-handler
  const onSubmit: SubmitHandler<Partial<IProduct>> = async (inputFields) => {
    let isFlashSale = true;
    if (inputFields.prevPrice === inputFields.price) {
      isFlashSale = false;
    }
    const data = { ...inputFields, isFlashSale };
    try {
      const res = await createProduct(data);
      toast.success("Product created successfully!");

      reset();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await getCategories({ cache: "no-store" });
        setCategories(data);
      } catch (error) {
        throw new Error("Categories are not fetching");
      }
    }
    fetchCategories();
  }, []);
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
                    <SelectValue placeholder="Select a Category" />
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
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
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
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Previous Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="0"
                  onChange={(event) => onChange(parseFloat(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ratings Field */}
        <FormField
          control={control}
          name="ratings"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Ratings</FormLabel>
              <FormControl>
                <Input
                  onChange={(event) => onChange(parseFloat(event.target.value))}
                  placeholder="Product Ratings"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description Field */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-blue-400/80 hover:bg-blue-400/95 focus:bg-blue-400/95 hover:text-white text-white transition-all rounded-md"
          variant="outline"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
