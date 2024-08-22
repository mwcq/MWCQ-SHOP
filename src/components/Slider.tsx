"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const slides = [
  {
    id: 1,
    title: "Slide 1",
    description: "This is the 1 slide",
    img: "https://images.pexels.com/photos/26997897/pexels-photo-26997897.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Slide 2",
    description: "This is the 2 slide",
    img: "https://images.pexels.com/photos/27350492/pexels-photo-27350492.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Slide 3",
    description: "This is the 3 slide",
    img: "https://images.pexels.com/photos/27744785/pexels-photo-27744785.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

export default function Slider() {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === slides.length - 1 ? 0 : current + 1);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className=" h-[calc(100vh-80px)] overflow-hidden">
      <div
        className=" w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((item) => (
          <div
            className={`${item.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={item.id}
          >
            {/* text */}
            <div className="h-1/2 xl:w-1/2 xl:h-full flex justify-center items-center gap-8 flex-col 2xl:gap-12 text-center">
              <h2 className=" text-xl lg:text-3xl 2xl:text-5xl">
                {item.description}
              </h2>
              <h1 className=" text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                {item.title}
              </h1>
              <Link href={item.url}>
                <button className=" rounded-md bg-black text-white py-3 px-4">
                  查看商品
                </button>
              </Link>
            </div>
            {/* img */}
            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={item.img}
                alt=""
                fill
                sizes="100%"
                className=" object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className=" absolute m-auto left-1/2 bottom-8 gap-4 flex">
        {slides.map((item, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-500 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={item.id}
            onClick={() => {
              setCurrent(index);
            }}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] rounded-full bg-gray-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
