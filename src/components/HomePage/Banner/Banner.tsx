"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import banner2 from "../../../public/banner/banner2.jpg";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
const bannerImages = [banner2, banner2, banner2, banner2, banner2];

export function BannerSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="px-4 md:px-8  lg:px-12">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {bannerImages.map((bannerImg, index) => (
            <CarouselItem key={index}>
              <div>
                <Card>
                  <CardContent className="flex items-center justify-center p-0">
                    <Image
                      src={bannerImg}
                      alt="banner2"
                      width={1450}
                      height={800}
                      className="object-cover w-full h-auto"
                      priority={index === 0}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
