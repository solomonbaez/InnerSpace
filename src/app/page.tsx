"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header"
// import Menu from "@/components/menu"
import PixelTransition from "@/components/pixelTransition"
import ReactiveCursor from "@/components/reactiveCursor"
import { AnimatePresence } from "framer-motion";

const App = dynamic(() => import("../animations/app"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
}

const Home: React.FC = () => {
  const reactiveElement = useRef<HTMLButtonElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<Dimensions>({width: 0, height: 0});
  const updateDimensions = () => {
    const { innerWidth, innerHeight } = window;
    setDimensions({width: innerWidth, height: innerHeight});
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      setTransition(isActive)
    } else {
      const transitionTimeout = setTimeout(() => {
        setTransition(isActive)
      }, 900);

      return () => {
        clearTimeout(transitionTimeout)
      };
    }

  }, [isActive, transition])

  return (
    <main>
      <Header ref={reactiveElement} isActive={isActive} setIsActive={setIsActive}/>
      {/* <Menu isActive={isActive} /> */}
      <ReactiveCursor reactiveElement={reactiveElement}/>

      <AnimatePresence>
        { transition && dimensions.height > 0 && <PixelTransition isActive={isActive} dimensions={dimensions} /> }
      </AnimatePresence>

      <div className="h-screen w-screen justify-center text-8xl">
        <App />
      </div>

      {/* <div className='items-center justify-center absolute w-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 uppercase text-2xl text-white'>
        <h1 className="text-white">HELLO WORLD</h1>
      </div> */}
    </main>
  )
}

export default Home;