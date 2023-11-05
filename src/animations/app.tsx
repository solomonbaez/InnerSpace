"use client";
import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
}

export default function App({ dimensions }: { dimensions: Dimensions }) {
  const [enableOrbit, setEnableOrbit] = useState<boolean>(true);

  useEffect(() => {
    if (dimensions.width <= 640) {
      setEnableOrbit(false);
    }
  }, [enableOrbit, dimensions.width])

  return (
    <Ripple enableOrbit={enableOrbit}/>
  )
}