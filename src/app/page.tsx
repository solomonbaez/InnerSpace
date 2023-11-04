"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header"
import Underlay from "@/components/underlay"
// import Menu from "@/components/menu"
import PixelTransition from "@/components/pixelTransition"
import ReactiveCursor from "@/components/reactiveCursor"
import { AnimatePresence } from "framer-motion";
import { useScramble } from "use-scramble";

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

  const { ref, replay } = useScramble({
    text: "HELLO WORLD",
    speed: 0.2,
    tick: 1,
    seed: 4,
    overdrive: false,
  })

  return (
    <main>
      <Underlay />
      <Header ref={reactiveElement} isActive={isActive} setIsActive={setIsActive}/>
      {/* <Menu isActive={isActive} /> */}
      <ReactiveCursor reactiveElement={reactiveElement}/>

      <AnimatePresence>
        { transition && dimensions.height > 0 && <PixelTransition isActive={isActive} dimensions={dimensions} /> }
      </AnimatePresence>

      <div className="h-screen w-screen justify-center">

      <Suspense fallback={null}>
        <App />

        <div className='absolute w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-difference uppercase text-white'>
          <h1 ref={ ref } onFocus={replay} onMouseOver={replay} className="whitespace-nowrap text-4xl md:text-6xl lg:text-8xl"/>
        </div>
      </Suspense>
      </div>
      <div className="h-screen w-screen">
        <App />
      </div>
    </main>
  )
}

export default Home;