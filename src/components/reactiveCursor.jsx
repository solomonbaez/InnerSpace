"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Index({ reactiveElement }) {
  const cursorSize = 15;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5};
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  const moveMouse = e => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  } 

  useEffect(() => {
    window.addEventListener("mousemove", moveMouse);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
    }
  })

  return (
    <>
      <motion.div style={{left: smoothMouse.x, top: smoothMouse.y}}
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none" 
      />
    </>
  )
}