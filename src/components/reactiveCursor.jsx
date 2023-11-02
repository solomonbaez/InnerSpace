"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Index({ reactiveElement }) {
  const [isHovered, setIsHovered] = useState(false);
  const cursorSize = isHovered ? 60 : 20;
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
    const { left, top, height, width } = reactiveElement.current.getBoundingClientRect();
    const center = {x: left + width / 2, y: top + height / 2}

    if (isHovered) {
      //distance between the mouse pointer and the center of the custom cursor and 
      const distance = {x: clientX - center.x, y: clientY - center.y}

      //move mouse to center of reactiveElement + slightly move it towards the mouse pointer
      mouse.x.set((center.x - cursorSize / 2) + (distance.x * 0.1));
      mouse.y.set((center.y - cursorSize / 2) + (distance.y * 0.1));
    } else {
      //move custom cursor to center of reactiveElement 
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    }
  }

  const manageMouseOver = e => {
    setIsHovered(true);
  };
  const manageMouseLeave = e => {
    setIsHovered(false);
  };

  useEffect(() => {
    reactiveElement.current.addEventListener("mouseenter", manageMouseOver);
    reactiveElement.current.addEventListener("mouseleave", manageMouseLeave);
    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      reactiveElement.current.removeEventListener("mouseenter", manageMouseOver);
      reactiveElement.current.removeEventListener("mouseleave", manageMouseLeave);
    }
  })

  return (
    <motion.div 
      style={{left: smoothMouse.x, top: smoothMouse.y}}
      animate={{width: cursorSize, height: cursorSize}}
      className="fixed w-4 h-4 z-20 bg-white rounded-full pointer-events-none" 
    />
  )
}