"use client";
import { useCartStore } from "@/hooks/useCartStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import useWixClient from "@/hooks/useWixClient";

export default function CarModel() {
  // const cartItems = true;

  const wixClient = useWixClient();

  const { cart, isLoading, removeItem } = useCartStore();

  // @ts-ignore
  const total = cart?.subtotal.amount;

  return (
    <div className=" w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgba(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cart.lineItems ? (
        <div className=" text-sm">购物车是空的</div>
      ) : (
        <>
          <h2 className=" text-xl">购物车</h2>
          <div className="flex flex-col gap-8">
            {cart.lineItems.map((item) => (
              <div className=" flex gap-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className=" object-cover rounded-md"
                  />
                )}
                <div className=" flex flex-col justify-between w-full">
                  {/* top */}
                  <div>
                    {/* title */}
                    <div className=" flex items-center justify-between gap-8">
                      <h3 className=" font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className=" p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className=" text-xs text-green-500">
                            {item.quantity} x
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    {/* desc */}
                    <div className=" text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* bottom */}
                  <div className=" flex justify-between text-sm">
                    <span className=" text-gray-500">
                      数量：{item.quantity}
                    </span>
                    <span
                      className=" text-blue-500 "
                      onClick={() => {
                        removeItem(wixClient, item._id!);
                      }}
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    >
                      删除
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* button */}
          <div>
            <div className="flex items-center justify-between font-semibold">
              <span>总计</span>
              <span>${total || 0}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              在结账时计算运费和税金。
            </p>
            <div className="flex justify-between text-sm">
              <button className=" rounded-md py-3 px-4 ring-1 ring-gray-300">
                查看购物车
              </button>
              <button
                className=" rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoading}
              >
                结账
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
