"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import CarModel from "./CarModel";
import Cookies from "js-cookie";
import useWixClient from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";

export default function NavIcons() {
  const [isProFileOpen, setIsProfileOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const [isLoding, setIsLoding] = React.useState(false);

  const wixClient = useWixClient();

  const router = useRouter();

  const pathName = usePathname();

  const isLoggedIn = wixClient.auth.loggedIn();
  // const isLoggedIn = false;

  const handleProFile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen(!isProFileOpen);
    }
  };

  // 通过wix登录
  // const wixClient = useWixClient();
  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );
  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoding(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoding(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  const { cart,counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className=" flex gap-4 items-center xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className=" cursor-pointer"
        onClick={handleProFile}
        // onClick={login}
      />
      {isProFileOpen && (
        <div className=" bg-white absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-20">
          <Link href="/">个人配置</Link>
          <div className=" mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoding ? "正在退出登录" : "退出登录"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className=" cursor-pointer"
      />
      <div
        className=" relative cursor-pointer"
        onClick={() => {
          setIsCartOpen(!isCartOpen);
        }}
      >
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className=" cursor-pointer"
        />
        <div className=" absolute -top-4 -right-4 w-6 h-6 rounded-full bg-[#FF4D4F] text-white text-center text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CarModel />}
    </div>
  );
}
