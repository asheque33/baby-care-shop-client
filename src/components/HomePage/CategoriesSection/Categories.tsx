import { Button } from "@/components/ui/button";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const categories = [
    {
      title: "Baby BathTub",
      href: "/baby-accessories?category=baby bathtub",
      image: "https://i.ibb.co.com/KjNVytH/bath-tub.png",
      bgSize: "128px",
    },
    {
      title: "Feeding Bottle",
      href: "/baby-accessories?category=feeding bottle",
      image: "https://i.ibb.co.com/7rWvcwY/feeding-bottle.png",
      bgSize: "64px",
    },
    {
      title: "Baby Potty Seat",
      href: "/baby-accessories?category=baby potty seat",
      image: "https://i.ibb.co.com/KzRTnCy/potty-seat.png",
      bgSize: "64px",
    },
    {
      title: "Baby Oral Care",
      href: "/baby-accessories?category=baby oral care",
      image: "https://i.ibb.co.com/PmY1v6C/oral-care.png",
      bgSize: "128px",
    },
  ];
  return (
    <section className="py-8">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-[#3C3D37] text-lg md:text-2xl lg:text-3xl font-bold">
          Top Categories
        </h2>
        <h6 className="text-slate-400 italic text-lg">
          Top categories has gotten places in terms of their selling feedback
          given by the user.
        </h6>
      </div>
      <div>
        <div className="grid md:grid-cols-3 gap-4 h-96 mx-auto">
          <CategoryCard {...categories[0]} />

          <div className="grid grid-rows-2 gap-y-4">
            <CategoryCard {...categories[1]} />
            <CategoryCard {...categories[2]} />
          </div>
          <CategoryCard {...categories[3]} />
        </div>
        <div className="w-[25%] my-8 mx-auto">
          <Link href="/categories">
            <Button className="btn-square rounded-md md:rounded-full block ">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
