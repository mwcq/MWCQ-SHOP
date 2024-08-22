"use client";

import { WixClientContext } from "@/context/wixContext";
import { useContext } from "react";

export default function useWixClient() {
  return useContext(WixClientContext);
}
