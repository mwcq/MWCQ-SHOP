import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-gray-100 text-sm mt-24 py-24">
      {/* top */}
      <div className="flex flex-col md:flex-row justify-center gap-24">
        {/* left */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">MWCQ</div>
          </Link>
          <p className="flex items-center gap-2">
            <Image src="/地址.png" alt="" width={32} height={32} />
            广东省广州市天河区
          </p>
          <span className=" font-semibold flex items-center gap-2">
            <Image src="/邮箱.png" alt="" width={32} height={32} />
            908680719@qq.com
          </span>
          <span className=" font-semibold flex items-center gap-2">
            <Image src="/电话号码.png" alt="" width={32} height={32} />
            +86 13104072867
          </span>
          <div className="flex gap-6">
            <Image src="/QQ.png" alt="" width={32} height={32} />
            <Image src="/github.png" alt="" width={32} height={32} />
            <Image src="/bilibili.png" alt="" width={32} height={32} />
            <Image src="/wx.png" alt="" width={32} height={32} />
          </div>
        </div>
        {/* center */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className=" font-medium text-lg">公司</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">关于我们</Link>
              <Link href="/">职业发展</Link>
              <Link href="/">子公司</Link>
              <Link href="/">Blog</Link>
              <Link href="/">联系我们</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className=" font-medium text-lg">购物</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">最新品</Link>
              <Link href="/">饰品</Link>
              <Link href="/">男士</Link>
              <Link href="/">女士</Link>
              <Link href="/">所有商品</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className=" font-medium text-lg">帮助</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">联系客服</Link>
              <Link href="/">我的账号</Link>
              <Link href="/">搜索商店</Link>
              <Link href="/">法律 & 隐私</Link>
              <Link href="/">购物卡</Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className=" font-medium text-lg">订阅我们</h1>
          <p>有关促销等最新消息，我们将第一时间通知您！</p>
          <div className="flex">
            <input
              type="text"
              placeholder="请输入您的邮箱"
              className="w-3/4 p-4"
            />
            <button className="w-1/4 bg-red-400 text-white">订阅</button>
          </div>
          <span className="font-semibold">支付方式</span>
          <div className="flex justify-between">
            <Image src="/skrill.png" alt="" width={40} height={20} />
            <Image src="/paypal.png" alt="" width={40} height={20} />
            <Image src="/mastercard.png" alt="" width={40} height={20} />
            <Image src="/visa.png" alt="" width={40} height={20} />
            <Image src="/支付宝支付.png" alt="" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div>© 2024 MWCQ Shop</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className=" ">
            <span className=" text-gray-500 mr-4">Language</span>
            <span className=" font-medium">简体中文</span>
          </div>
          <div className="">
            <span className=" text-gray-500 mr-4">Currency</span>
            <span className=" font-medium">￥ 人民币</span>
          </div>
        </div>
      </div>
    </div>
  );
}
