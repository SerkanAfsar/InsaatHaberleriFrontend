"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import CustomElement from "../utils/custom-element";
import { SwiperOptions } from "swiper/types";
import { cn } from "@/lib";
import React from "react";

export type SwiperListProps<T extends object> = {
  data: T[];
  className?: string;
  swiperBreakPoints?: SwiperOptions["breakpoints"];
  prevClass: string;
  nextClass: string;
  component: React.ComponentType<{ item: T }>;
};

const customBreakPoints = {
  640: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
};

export default function SwiperList<T extends object>({
  swiperBreakPoints,
  className,
  data,
  nextClass,
  prevClass,
  component,
}: SwiperListProps<T>) {
  const Component = component;
  return (
    <CustomElement
      className={cn("relative container mx-auto", className && className)}
    >
      <button type="button" aria-label="Öncekiler" className={prevClass}>
        <ChevronLeft size={22} />
      </button>
      <Swiper
        modules={[Navigation, Autoplay, Grid]}
        className="last-company-swiper"
        slidesPerView={1}
        loop
        spaceBetween={20}
        autoplay={{
          delay: 3000, // 3 saniyede bir ilerler
          disableOnInteraction: false, // Elle kaydırdıktan sonra devam eder
          pauseOnMouseEnter: true, // Fare üzerindeyken duraklar
        }}
        breakpoints={swiperBreakPoints ?? customBreakPoints}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        grabCursor
        grid={{
          fill: "row",
        }}
      >
        {data.map((item, key) => {
          return (
            <SwiperSlide key={key}>
              <Component item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button type="button" aria-label="Öncekiler" className={nextClass}>
        <ChevronRight size={22} />
      </button>
    </CustomElement>
  );
}
