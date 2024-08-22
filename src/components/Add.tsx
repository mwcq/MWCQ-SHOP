"use client";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import React from "react";

export default function Add({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) {
  const [quantity, setQuantity] = React.useState(1);

  const stock = stockNumber;

  const wixClient = useWixClient();

  const handleButton = (type: "d" | "a") => {
    if (type === "a") {
      if (quantity < stock) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const { addItem, isLoading } = useCartStore();

  // const addItem = async () => {
  //   const response = await wixClient.currentCart.addToCurrentCart({
  //     lineItems: [
  //       {
  //         catalogReference: {
  //           appId: process.env.NEXT_PUBLIC_WIX_APP_ID,
  //           catalogItemId: productId,
  //           ...(variantId && { options: { variantId } }),
  //         },
  //         quantity: stockNumber,
  //       },
  //     ],
  //   });
  // };

  return (
    <div className=" flex flex-col gap-4">
      <h4 className=" font-medium">选择数量</h4>
      <div className=" flex justify-between">
        <div className=" flex items-center gap-4">
          <div className=" bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className=" cursor-pointer text-xl"
              onClick={() => {
                handleButton("d");
              }}
            >
              -
            </button>
            {quantity}
            <button
              className=" cursor-pointer text-xl"
              onClick={() => {
                handleButton("a");
              }}
            >
              +
            </button>
          </div>
          {stockNumber < 1 ? (
            <div className=" text-xs">缺货</div>
          ) : (
            <div className=" text-xs">
              剩余库存: <span className=" text-orange-400">{stock}</span>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            addItem(wixClient, productId, variantId, quantity);
          }}
          disabled={isLoading}
          className=" w-36 text-sm rounded-3xl ring-1 ring-red-400 text-red-400 py-2 px-4 hover:bg-red-400 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none disabled:ring-0"
        >
          加入购物车
        </button>
      </div>
    </div>
  );
}
