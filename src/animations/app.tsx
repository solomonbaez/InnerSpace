"use client";
import React from 'react'
import dynamic from "next/dynamic";

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

export default function App() {
  return (
    <Ripple />
  )
}