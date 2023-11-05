"use client";
import React from 'react'
import dynamic from "next/dynamic";

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
}

export default function App({ dimensions }: { dimensions: Dimensions }) {
  // customize orbit behavior based on device screen
  var enableOrbit = true;
  if (dimensions.width <= 640) {
    !enableOrbit 
  }

  return (
    <Ripple enableOrbit={enableOrbit}/>
  )
}