import { motion } from "framer-motion";

const animate = {
  initial: {
    opacity: 0
  },
  open: (i) => ({
    opacity: 1,
    transition: {duration: 0, delay: 0.03 * i}
  }),
  closed: (i) => ({
    opacity: 0,
    transition: {duration: 0, delay: 0.03 * i}
  })
};

export default function Index({isActive, dimensions}) {
  const { width, height } = dimensions;
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
    "bg-neutral-800",
    "bg-neutral-900",
    "bg-neutral-700"
  ]
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * pixelColors.length);
    return pixelColors[randomIndex]
  }

  const generateGrid = () => {
    const { innerWidth, innerHeight } = window;
    const elementSize = innerWidth * 0.025;
    const elementCount = Math.ceil(innerHeight / elementSize);
    const shuffled = shuffle([...Array(elementCount)].map( (_, i) => i ))

    return shuffled.map( (randomElement, index) => {
      const bgColor = getRandomColor();
      return (
        <motion.div key={index}
          className={`w-full h-[5vw] ${bgColor} bg-`}
          variants={animate} initial="initial"
          animate={isActive ? "open" : "closed"}
          custom={randomElement}
        />
      )
    } )
  }

  return (
    <div className="flex overflow-hidden relative z-10 pointer-events-none">
      {
        [...Array(40)].map( (_, index) => {
          return (
            <div key={index} className="w-[2.5vw] flex flex-col">
              { generateGrid() }
            </div>
          )
        })
      }
    </div>
  )
}