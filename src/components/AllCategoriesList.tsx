"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { getCategories } from "@/utils/getCategories";
import { ICategory } from "@/types/category.type";
import { useRouter, useSearchParams } from "next/navigation";

const AllCategoriesList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories({ cache: "no-store" });
      setCategories(data);
    };
    fetchCategories();
  }, []);

  // Sync selected category from URL or session storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get category from sessionStorage if present
      const categoryFromSession =
        sessionStorage.getItem("selectedCategory") || "";

      // Get category from URL
      const categoryFromURL = searchParams.get("category");

      // Choose final category from URL or sessionStorage
      const finalCategory = categoryFromURL || categoryFromSession;

      if (finalCategory) {
        setSelectedCategory(finalCategory); // Update selected category state
        sessionStorage.setItem("selectedCategory", finalCategory); // Save selected category to sessionStorage
      }
      if (!searchParams.get("category")) {
        setSelectedCategory("");
        sessionStorage.removeItem("selectedCategory");
      }
    }
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category); // Update selected category state
    sessionStorage.setItem("selectedCategory", category); // Save selected category to sessionStorage
    router.push(`/baby-accessories?category=${category.toLowerCase()}`); // Update URL with selected category
  };

  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3">
      <div
        id="categories-lists"
        className="w-4/5 sm:w-3/4 md:w-full mx-auto md:mx-0 shadow-white shadow-md px-3 py-2 border-white rounded-sm"
      >
        <section className="category-type bg-white box-border">
          <h2 className="text-center md:text-start text-lg md:text-2xl lg:text-3xl font-semibold px-4 py-1">
            By Category
          </h2>
          <Separator className="my-2" />
          <RadioGroup
            className="px-4 pb-4"
            value={selectedCategory || ""}
            onValueChange={handleCategorySelect}
          >
            {categories?.map((category: ICategory) => (
              <div
                key={category.id.toString()}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={category.title}
                  id={category.id.toString()}
                  checked={selectedCategory === category.title.toLowerCase()} // Use this condition to check if it's selected
                />
                <Label htmlFor={category.id.toString()}>{category.title}</Label>
              </div>
            ))}
          </RadioGroup>
        </section>
      </div>
    </div>
  );
};

export default AllCategoriesList;
