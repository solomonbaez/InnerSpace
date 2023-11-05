"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import Overlay from "@/components/overlay";
// import Menu from "@/components/menu"
import PixelTransition from "@/components/pixelTransition";
import ReactiveCursor from "@/components/reactiveCursor";
import { AnimatePresence } from "framer-motion";
import { useScramble } from "use-scramble";

const Ripple = dynamic(() => import("../animations/ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
  dpr: number, 
}

const Home: React.FC = () => {
  const reactiveElement = useRef<HTMLButtonElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0, dpr: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState<Dimensions>({ width: 0, height: 0, dpr:0 });
  const updateDimensions = () => {
    // const { innerWidth, innerHeight } = window;
    const clientWidth = window.document.documentElement.clientWidth;
    const clientHeight = window.document.documentElement.clientHeight;
    const dpr = window.devicePixelRatio;
    setDimensions({ width: clientWidth, height: clientHeight, dpr: dpr });

    // set a static dimension for the canvas to reduce state stress
    if (canvasDimensions.width === 0 && canvasDimensions.height === 0) {
      setCanvasDimensions({ width: clientWidth, height: clientWidth, dpr: dpr });
    }
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
      <Overlay isActive={isActive}/>
      <Header ref={reactiveElement} isActive={isActive} setIsActive={setIsActive}/>
      {/* <Menu isActive={isActive} /> */}
      <ReactiveCursor reactiveElement={reactiveElement}/>

      {/* { isActive && <div className="transition-opacity duration-1000 opacity-100 absolute z-20 h-screen w-screen bg-white mix-blend-difference"></div>} */}

      <AnimatePresence>
        { transition && dimensions.height > 0 && <PixelTransition isActive={isActive} dimensions={dimensions} /> }
        {/* {isActive && <Navigation />} */}
      </AnimatePresence>

      <div className="h-screen w-screen justify-center">

      <Suspense fallback={null}>
        <div className="h-[600px] w-[600px] md:h-[900px] md:w-[900px] lg:h-[1000px] lg:w-[1000px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Ripple dimensions={canvasDimensions}/>
        </div>

        <div className= {`bg-white absolute w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-difference uppercase text-black ${isActive ? "transition-opacity duration-700 opacity-0" : "opacity-100"}`}>
          <h1 ref={ ref } onFocus={replay} onMouseOver={replay} className="whitespace-nowrap text-5xl md:text-7xl lg:text-8xl"/>
        </div>
      </Suspense>
      </div>
      { !isActive ? (
        <div className="z-30 w-screen h-screen bg-transparent p-10 inline-flex flex-col justify-start pointer-events-none">
          <div className={`pt-10 flex-row items-center justify-center transition-opacity duration-700 ${isActive ? "opacity-0" : "opactiy-300"}`}>

            <p className="relative whitespace-normal w-5/6 left-1/2 -translate-x-1/2 text-2xl md:text-4xl text-white">
              Hi, I&apos;m Solomon Baez, a Fullstack Engineer with a focus on developing Backend solutions.
            </p>

          </div>
        </div>
      ): (null) }
    </main>
  )
}

export default Home;