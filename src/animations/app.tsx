"use client";
import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
}

export default function App({ dimensions }: { dimensions: Dimensions }) {

  const [enableDesktop, setEnableDesktop] = useState<boolean>(true);
  useEffect(() => {
    if (dimensions.width <= 640) {
      setEnableDesktop(false);
    }
  }, [enableDesktop, dimensions.width])

  return (
    <Ripple enableOrbit={enableDesktop}/>
  )
}