"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams); // 创建URLSearchParams对象
    params.set("page", pageNumber.toString()); // 设置参数
    replace(`${pathname}?${params.toString()}`); // 替换URL
  };

  return (
    <div className=" mt-12 flex justify-between w-full">
      <button
        className=" rounded-md bg-red-400 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasPrev}
        onClick={() => {
          // handlePrevPage();
          createPageUrl(currentPage - 1);
        }}
      >
        上一页
      </button>
      <button
        className=" rounded-md bg-red-400 text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasNext}
        onClick={() => {
          createPageUrl(currentPage + 1);
        }}
      >
        下一页
      </button>
    </div>
  );
}
