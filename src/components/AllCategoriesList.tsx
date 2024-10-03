"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { getCategories } from "@/utils/getCategories";
import { ICategory } from "@/types/category.type";
import { useRouter } from "next/navigation";

const AllCategoriesList = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const handleCategorySelect = (category: string) => {
    router.push(`/baby-accessories?category=${category.toLocaleLowerCase()}`);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories({
        cache: "no-store",
      });
      setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3">
      <div
        id="categories-lists"
        className=" w-4/5 sm:w-3/4 md:w-full mx-auto md:mx-0 shadow-white shadow-md px-3 py-2 border-white rounded-sm"
      >
        <section className="category-type bg-white box-border">
          <h2 className="text-center md:text-start text-lg md:text-2xl lg:text-3xl font-semibold px-4 py-1">
            By Category
          </h2>
          <Separator className="my-2 " />
          <RadioGroup
            className="px-4 pb-4"
            // defaultValue="comfortable"
          >
            {categories?.map((category: ICategory) => (
              // <Link
              //   key={category.id.toString()}
              //   href={`/baby-accessories?category=${category.title.toLocaleLowerCase()}`}
              // >
              <div
                key={category.id.toString()}
                onClick={() => handleCategorySelect(category.title)}
                className="flex items-center space-x-2"
              >
                <RadioGroupItem
                  value={category.title}
                  id={category.id.toString()}
                />
                <Label htmlFor={category.id.toString()}>{category.title}</Label>
              </div>
              // {/* </Link> */}
            ))}
          </RadioGroup>
        </section>
      </div>
    </div>
  );
};

export default AllCategoriesList;
