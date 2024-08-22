import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export default async function CategoriesList() {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className=" px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex md:gap-8 gap-4">
        {cats.items.map((item) => (
          <Link
            key={item._id}
            href={"/list?cat=" + item.slug}
            className=" flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className=" relative w-full h-96 bg-slate-100">
              <Image
                src={item.media?.mainMedia?.image?.url || "cat.png"}
                alt=""
                fill
                sizes="20vw"
                className=" object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-clip tracking-wide">
              {item.name === "All Products" ? "所有分类" : item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
