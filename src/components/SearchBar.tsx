"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const product = formData.get("product") as string;

    if (product) {
      router.push(`/list?name=${product}`);
    }
  };

  return (
    <form
      className=" flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="搜索"
        name="product"
        className=" flex-1 outline-none bg-transparent"
      />
      <button className=" cursor-pointer">
        <Image src="/search.png" alt="" width={16} height={16}></Image>
      </button>
    </form>
  );
}
