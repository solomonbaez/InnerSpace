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

export default function Index({isActive, dimensions}) {
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

  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    if (dimensions.innerWidth > 640) {
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  }, [dimensions.innerWidth, setDesktop])

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
    const elementSize = desktop ? (innerWidth * 0.1) : (innerWidth * 0.05);
    const elementCount = Math.ceil(innerHeight / elementSize);
    const shuffled = shuffle([...Array(elementCount)].map( (_, i) => i ))

    return shuffled.map( (randomElement, index) => {
      const bgColor = getRandomColor();
      return (
        <motion.div key={index}
          className={`w-full bg-purple-300 ${desktop ? "h-[5vw]" : "h-[10vw]"}`}
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
      <div className={`fixed top-0 ${isActive ? "transition-colors duration-[2500ms] rounded-lg overflow-hidden bg-purple-300" : "bg-transparent"} left-0 h-full flex z-30 pointer-events-none mix-blend-difference`}>
        {
          [...Array(desktop ? 20 : 10)].map( (_, index) => {
            return (
              <div key={index} className={`flex flex-col ${desktop ? "w-[5vw]" : "w-[10vw]"}`}> 
                { generateGrid() }
              </div>
            )
          })
        }
      </div>
    </>
  )
}