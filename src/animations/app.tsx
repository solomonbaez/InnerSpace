"use client";
import React from 'react'
import dynamic from "next/dynamic";
import { useScramble } from "use-scramble"

const Ripple = dynamic(() => import("./ripple"), {ssr: false});

export default function App() {
  const { ref, replay } = useScramble({
    text: "HELLO WORLD",
    speed: 0.2,
    tick: 3,
    seed: 3,
    overdrive: false,
  })

  return (
    // <div className='h-screen w-screen'>
    <>
      <Ripple />
      <div className='absolute w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 uppercase text-white'>
        <h1 ref={ ref } onFocus={replay} onMouseOver={replay}/>
      </div>
    </>
    // </div>
  )
}