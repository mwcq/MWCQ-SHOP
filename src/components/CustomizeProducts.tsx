"use client";
import { products } from "@wix/stores";
import React, { useEffect } from "react";
import Add from "./Add";

export default function CustomizeProducts({
  productId,
  variants,
  productOptions,
}: {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
}) {
  const [selectedOptions, setSelectedOptions] = React.useState<{
    [key: string]: string;
  }>({});

  const [selectedVariant, setSelectedVariant] =
    React.useState<products.Variant | null>();

  useEffect(() => {
    const variant = variants.find((variant) => {
      const varinatChoices = variant.choices;
      if (!varinatChoices) return false;
      return Object.entries(selectedOptions).every(
        ([key, value]) => varinatChoices[key] === value
      );
    });
    setSelectedVariant(variant);
  }, [selectedOptions, variants]);

  const handleOptionSelection = (optionName: string, choiceValue: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: choiceValue }));
  };

  const isVarinatInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.inStock &&
        variant.stock?.quantity &&
        variant.stock?.quantity > 0
      );
    });
  };

  return (
    <div className=" flex flex-col gap-6">
      {productOptions.map((option) => {
        return (
          <div className=" flex flex-col gap-4" key={option.name}>
            <h4 className=" font-medium">选择{option.name}</h4>
            <ul className="flex items-center gap-3">
              {option.choices?.map((choice) => {
                const disabled = !isVarinatInStock({
                  ...selectedOptions,
                  [option.name!]: choice.description!,
                });

                const selected =
                  selectedOptions[option.name!] === choice.description;

                return option.name === "色彩" ? (
                  <li
                    className=" w-8 h-8 rounded-full ring-1 ring-gray-200 relative"
                    style={{
                      backgroundColor: choice.value,
                      cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!disabled) {
                        handleOptionSelection(
                          option.name!,
                          choice.description!
                        );
                      }
                    }}
                  >
                    {selected && (
                      <div className=" absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    {disabled && (
                      <div className=" absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </li>
                ) : (
                  <li
                    className=" ring-1 ring-red-400 text-red-400 rounded-md py-1 px-4 text-sm"
                    style={{
                      cursor: disabled ? "not-allowed" : "pointer",
                      backgroundColor: selected
                        ? "#f87171 "
                        : disabled
                        ? "#FBCFE8"
                        : "white",
                      color: selected || disabled ? "white" : "#f87171",
                      boxShadow: disabled ? "none" : "",
                    }}
                    onClick={() => {
                      if (!disabled) {
                        handleOptionSelection(
                          option.name!,
                          choice.description!
                        );
                      }
                    }}
                  >
                    {choice.description}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <Add
        productId={productId}
        variantId={
          selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
        }
        stockNumber={selectedVariant?.stock?.quantity || 0}
      />
      {/* <h4 className=" font-medium">选择{option.name}</h4>
      <ul className="flex items-center gap-3">
        <li className=" w-8 h-8 rounded-full ring-1 ring-gray-200 cursor-pointer relative bg-red-500">
          <div className=" absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
        <li className=" w-8 h-8 rounded-full ring-1 ring-gray-200 cursor-pointer relative bg-blue-500"></li>
        <li className=" w-8 h-8 rounded-full ring-1 ring-gray-200 cursor-not-allowed relative bg-green-500">
          <div className=" absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </li>
      </ul> */}
      {/* <h4 className=" font-medium">选择尺寸</h4>
      <ul className="flex items-center gap-3">
        <li className=" ring-1 ring-red-400 text-red-400 rounded-md py-1 px-4 text-sm cursor-pointer">
          S
        </li>
        <li className=" ring-1 ring-red-400 text-white bg-red-400 rounded-md py-1 px-4 text-sm cursor-pointer">
          M
        </li>
        <li className=" ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
          L
        </li>
      </ul> */}
    </div>
  );
}
