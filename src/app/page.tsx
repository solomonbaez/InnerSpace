"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/offscreen"
// import { OrbitControls } from "@react-three/drei"

import Header from "@/components/header";
import Overlay from "@/components/overlay";
import Menu from "@/components/menu"
import PixelTransition from "@/components/pixelTransition";
import ReactiveCursor from "@/components/reactiveCursor";
import Projects from "@/components/projects"

import { GolangSVG, RustSVG, TypeScriptSVG, PythonSVG } from "@/components/icons/langauges";
import { AnimatePresence } from "framer-motion";
import { useScramble } from "use-scramble";
import Lenis from "@studio-freight/lenis";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import dynamic from "next/dynamic";
const Ripple = dynamic(() => import("../animations/ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
  dpr: number, 
}

export default function Home() {
  // CURSOR INITIALIZATION
  const reactiveElement = useRef<HTMLButtonElement>(null);

  // R3F INITIALIZATION
  const [worker, setWorker] = useState<Worker | null>(null);
  useEffect(() => {
    const newWorker = new Worker(new URL("../animations/worker", import.meta.url), {type: "module"});
    setWorker(newWorker)

    return () => {
      newWorker.terminate();
      setWorker(null)
    }
  }, [])

  // // GSAP INITIALIZATION
  // useEffect(() => {
  //   const lenis = new Lenis({smoothTouch: true, infinite: true});
  //   lenis.on("scroll", ScrollTrigger.update)

  //   function raf(time: number) {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }

  //   // gsap.ticker.add((time) => {
  //   //   lenis.raf(time * 1000);
  //   // })
  //   // // gsap.ticker.lagSmoothing(0)

  //   requestAnimationFrame(raf)
  //   let sections = gsap.utils.toArray<HTMLElement>("section"),
  //     currentSection = sections[0];

  //   gsap.defaults({overwrite: 'auto', duration: 0.3});

  //   // stretch out the body height according to however many sections there are. 
  //   gsap.set("body", {height: (sections.length * 100) + "%"});

  //   // create a ScrollTrigger for each section
  //   sections.forEach((section, i) => {
  //     ScrollTrigger.create({
  //       // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
  //       start: () => (i - 0.5) * innerHeight,
  //       end: () => (i + 0.5) * innerHeight,
  //       // when a new section activates (from either direction), set the section accordinglyl.
  //       onToggle: self => self.isActive && setSection(section)
  //     });
  //   });

  //   function setSection(newSection: HTMLElement) {
  //     if (newSection !== currentSection) {
  //       gsap.to(currentSection, {scale: 0.8, autoAlpha: 0, ease: "slow(0.7,0.7,false"})
  //       gsap.to(newSection, {scale: 1, autoAlpha: 1, ease:"slow(0.7,0.7,false"});
  //       currentSection = newSection;
  //     }
  //   }

  //   // handles the infinite part, wrapping around at either end....
  //   ScrollTrigger.create({
  //     start: 1,
  //     end: () => ScrollTrigger.maxScroll(window) - 1,
  //     onLeaveBack: self => self.scroll(ScrollTrigger.maxScroll(window) - 1),
  //     onLeave: self => self.scroll(2)
  //   }).scroll(2);
  // }, [])

  // LENIS SMOOTHSCROLL
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  // WINDOW RESIZE
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0, dpr: 0 });
  const updateDimensions = () => {
    const clientWidth = window.document.documentElement.clientWidth;
    const clientHeight = window.document.documentElement.clientHeight;
    const dpr = window.devicePixelRatio;
    setDimensions({ width: clientWidth, height: clientHeight, dpr: dpr });
  }
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // MENU TRANSITION
  const [isActive, setIsActive] = useState<boolean>(false);
  // const [transition, setTransition] = useState<boolean>(false);
  // useEffect(() => {
  //   if (isActive) {
  //     setTransition(isActive)
  //   } else {
  //     const transitionTimeout = setTimeout(() => {
  //       setTransition(isActive)
  //     }, 900);

  //     return () => {
  //       clearTimeout(transitionTimeout)
  //     };
  //   }

  // }, [isActive, transition])

  // SCRAMBLE EFFECT
  const home = useScramble({
    text: "HELLO WORLD",
    speed: 0.2,
    tick: 1,
    seed: 4,
    overdrive: false,
  })
  const about = useScramble({
    text: "Hi, I&apos;m Solomon Baez, a Fullstack Engineer with a focus on developing Backend solutions.",
    speed: 0.2,
    tick: 1,
    seed: 4,
    overdrive: false,
  })

  return (
    <main>

      <Overlay isActive={isActive}/>
      <Header ref={reactiveElement} isActive={isActive} setIsActive={setIsActive}/>
      <Menu isActive={isActive} />
      <ReactiveCursor reactiveElement={reactiveElement}/>
      <div className="absolute z-20 top-5 left-1/2 -translate-x-1/2 w-[95%] overflow-hidden border border-gray-300 rounded-lg">

      <AnimatePresence>
      { dimensions.height > 0 && <PixelTransition isActive={isActive}/> }
      </AnimatePresence>

      <div className="relative z-20 overflow h-screen w-screen mix-blend-difference">
        <Suspense fallback={null}>
          <div className="absolute h-[600px] w-[600px] md:h-[900px] md:w-[900px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Canvas
              resize={{scroll: false, debounce:{scroll: 1, resize: 1}}}
              worker={worker!} 
              fallback={<Ripple />} 
              camera={{
                position: [0, 0, 6],
                fov: 50,
                aspect: 1,
                near: 0.1,
                far: 2000
              }}
              dpr = {1}
            />
          </div>
          <div className= {`bg-white absolute z-20 w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-black ${isActive ? "transition-opacity duration-700 opacity-0" : "opacity-100"}`}>
            <h1 ref={home.ref} onFocus={home.replay} onMouseOver={home.replay} className="whitespace-nowrap text-5xl md:text-7xl lg:text-8xl"/>
          </div>
        </Suspense>
      </div>

      <div className="flex flex-col justify-start ">
        <hr className="relative pr-10 left-1/2 -translate-x-1/2 w-[95%] bg-gray-300"/>
      </div>

      <div className="w-screen h-screen bg-transparent p-10 inline-flex flex-row items-center justify-center mix-blend-differenceb">
        <div className={`pt-10 w-5/6 flex-row items-center justify-center transition-opacity duration-700 ${isActive ? "opacity-0" : "opacity-300"}`}>
          <hr className="w-full pb-10" />
          <div className="flex w-full">
            <div className="w-1/3 flex flex-col space-y-3 md:text-2xl">
              <p>
                Go
                <small> - 1.5y</small>
              </p>
              <p>TS
                <small> - 1.5y</small>
              </p>
              <p>Rust 
                <small> - 1y</small>
              </p>
              <p>Python 
                <small> - 4y</small>
              </p>
            </div>
            <div className="pl-10 pb-2 w-2/3">
              <p ref={about.ref} onClick={about.replay} onMouseOver={about.replay} className="relative whitespace-normal text-xl md:text-4xl text-white" />
              <hr className="bg-white translate-y-10"/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start ">
        <hr className="relative pr-10 left-1/2 -translate-x-1/2 w-[95%] bg-gray-300"/>
      </div>

      <div className="w-full h-full bg-transparent p-10 flex items-center justify-center">
        <div className={`pt-10 w-5/6 flex-col items-center justify-center transition-opacity duration-700 ${isActive ? "opacity-0" : "opacity-300"}`}>

            <div className="relative -top-10 -left-10 pl-10 pt-2 pb-2 w-2/3">
              <p>RECENT PROJECTS</p>
              <br />
              <hr className="bg-white"/>
            </div>
          <div className="flex z-30 w-full">
            <Projects />
          </div>
        </div>
      </div>
    </div>
    </main>
  )
}
