"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Menu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && (
        <div className=" absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
          <Link href="/">首页</Link>
          <Link href="/shop">商城</Link>
          <Link href="/">交易</Link>
          <Link href="/">关于我们</Link>
          <Link href="/">联系我们</Link>
          <Link href="/">退出登录</Link>
          <Link href="/">购物车（1）</Link>
        </div>
      )}
    </div>
  );
}
