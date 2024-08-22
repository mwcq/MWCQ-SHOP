"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Filter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement; // 获取input的name属性
    const params = new URLSearchParams(searchParams); // 创建URLSearchParams对象
    params.set(name, value); // 设置参数
    replace(`${pathname}?${params.toString()}`); // 替换URL
  };

  return (
    <div className=" mt-12 flex justify-between">
      <div className=" flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className=" py-2 px-4 rounded-2xl text-xs font-medium border border-gray-300"
          onChange={handleFilterChange}
        >
          <option>全部</option>
          <option value="physical">物理</option>
          <option value="digital">数字化</option>
        </select>
        <input
          type="text"
          name="min"
          placeholder="最低价格"
          className=" pl-2 w-24 rounded-2xl text-xs font-medium ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="最高价格"
          className=" pl-2 w-24 rounded-2xl text-xs font-medium ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <select
          name="cat"
          id=""
          className=" py-2 px-4 rounded-2xl text-xs font-medium border border-gray-300"
          onChange={handleFilterChange}
        >
          <option>分类</option>
          <option value="">新品</option>
          <option value="">最受欢迎</option>
        </select>
        <select
          name=""
          id=""
          className=" py-2 px-4 rounded-2xl text-xs font-medium border border-gray-300"
        >
          <option>过滤全部</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white border border-gray-400"
          onChange={handleFilterChange}
        >
          <option>排序</option>
          <option value="asc price">价格(从低到高)</option>
          <option value="desc price">价格(从高到低)</option>
          <option value="asc lastUpdated">最新</option>
          <option value="desc lastUpdated">最老</option>
        </select>
      </div>
    </div>
  );
}
