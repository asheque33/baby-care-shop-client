import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CategoriesSection = () => {
  return (
    <section className="px-4 md:px-8 py-8 lg:px-12">
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
        <div className="grid md:grid-cols-3 gap-4 h-96 text-white text-xl font-medium ">
          <Link
            href="/baby-accessories?category=baby bathtub"
            className="bg-[#27374D] rounded-xl flex items-end ps-6 pb-6 justify-start hover:scale-105 hover:transition-all"
          >
            Baby BathTub
          </Link>

          <div className="grid grid-rows-2 gap-y-6">
            <Link
              href="/baby-accessories?category=feeding bottle"
              className="bg-[#27374D] rounded-xl flex items-end ps-6 pb-3 justify-start hover:scale-105 hover:transition-all"
            >
              {/*bg-gradient-to-tr  from-[#378CE7] to-[#5356FF]*/}
              Feeding Bottle
            </Link>
            <Link
              href="/baby-accessories?category=baby potty seat"
              className="bg-[#27374D] rounded-xl flex items-end ps-6 pb-3 justify-start hover:scale-105 hover:transition-all"
            >
              Baby Potty Seat
            </Link>
          </div>
          <Link
            href="/baby-accessories?category=baby oral care"
            className="bg-[#27374D] rounded-xl flex items-end ps-6 pb-6 justify-start hover:scale-105 hover:transition-all "
          >
            Baby Oral Care
          </Link>
        </div>
        <div className="w-[12%] mt-6 mb-8 mx-auto">
          <Link href="/categories">
            <Button className="  btn-square rounded-full w-full px-8 py-2">
              View All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
