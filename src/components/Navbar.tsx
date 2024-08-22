import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Menu from "./Menu";
import Image from "next/image";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
// import NavIcons from "./NavIcons";
const NavIcons = dynamic(() => import("./NavIcons"), { ssr: false });

export default function Navbar() {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* 移动端 */}
      <div className="flex justify-between items-center h-full md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">MWCQ</div>
        </Link>
        <Menu></Menu>
      </div>
      {/* PC端 */}
      <div className="hidden md:flex justify-between items-center h-full gap-8">
        {/* 左侧 */}
        <div className="left w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={24} height={24}></Image>
            <div className="text-2xl tracking-wide">MWCQ</div>
          </Link>
          <div className=" hidden xl:flex gap-4">
            <Link href="/">首页</Link>
            <Link href="/shop">商城</Link>
            <Link href="/">交易</Link>
            <Link href="/">关于我们</Link>
            <Link href="/">联系我们</Link>
          </div>
        </div>
        {/* 右侧 */}
        <div className="right w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  );
}
