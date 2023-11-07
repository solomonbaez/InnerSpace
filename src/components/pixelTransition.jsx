import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const animate = {
  initial: {
    opacity: 0
  },
  open: (i) => ({
    opacity: 1,
    transition: {duration: 0.5, delay: 0.03 * i}
  }),
  closed: (i) => ({
    opacity: 0,
    transition: {duration: 0.5, delay: 0.03 * i}
  })
};

export default function Index({isActive}) {
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = () => {
    const pos = window.scrollY;
    setScrollPos(pos);
  }

  useEffect(() => {
    // restrict overlay movement to active
    if (isActive) {
      window.addEventListener("scroll", handleScroll, {passive: true});

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  })

  const shuffle = (a) => {
    var i, r, previous
    for (i = a.length - 1; i > 0; i--) {
      r = Math.floor(Math.random() * (i + 1));
      previous = a[i];
      a[i] = a[r];
      a[r] = previous
    }

    return a;
  }

  const pixelColors = [
    "pink-400",
    "green-300",
    "blue-200",
  ]
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * pixelColors.length);
    return pixelColors[randomIndex]
  }

  const generateGrid = () => {
    const { innerWidth, innerHeight} = window;
    const elementSize = innerWidth * 0.05;
    const elementCount = Math.ceil(innerHeight / elementSize) + 20;
    const shuffled = shuffle([...Array(elementCount)].map( (_, i) => i ))

    return shuffled.map( (randomElement, index) => {
      const bgColor = getRandomColor();
      return (
        <motion.div key={index}
          className={`w-full h-[5vw] bg-purple-300`}
          style={{
            transform: `translateY(${scrollPos}px)`, // Apply the scroll position
          }}
          variants={animate} initial="initial"
          animate={isActive ? "open" : "closed"}
          custom={randomElement}
        />
      )
    } )
  }

  return (
    <>
      <div className={`fixed top-0 ${isActive ? "transition-colors duration-[2500ms] bg-purple-300" : "bg-transparent"} left-0 h-full flex z-30 pointer-events-none mix-blend-difference`}>
        {
          [...Array(20)].map( (_, index) => {
            return (
              <div key={index} className={`w-[5vw] flex flex-col`}> 
                { generateGrid() }
              </div>
            )
          })
        }
      </div>
    </>
  )
}