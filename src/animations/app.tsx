"use client";
import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
}

export default function App({ enableDesktop }: { enableDesktop: boolean }) {
  return (
    <Ripple enableOrbit={enableDesktop}/>
  )
}