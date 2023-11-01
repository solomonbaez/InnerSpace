import React from "react";
import { motion } from "framer-motion";

export default function Index() {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight/2} 100 0`
  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight/2} 100 0`

  const curveSVG = {
    initial: {
      d: initialPath
    }, 
    enter: {
      d: targetPath,
      transition: {duration: 1, ease: [0.76, 0, 0,24, 1]}
    },
    exit: {
      d: initialPath,
      transition: {duration: 0.8, ease: [0.76, 0, 0,24, 1]}
    }
  }

  return (
    <svg className="absolute top-0 -left-24 w-24 h-full fill-neutral-800 stroke-none">
      <motion.path variants={curveSVG} initial="initial" animate="enter" enter="enter" exit="exit" />
    </svg>
  )

}