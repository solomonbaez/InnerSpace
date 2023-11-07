import { motion } from "framer-motion";

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
    const { innerWidth, innerHeight } = window;
    const elementSize = innerWidth * 0.05;
    const elementCount = Math.ceil(innerHeight / elementSize);
    const shuffled = shuffle([...Array(elementCount)].map( (_, i) => i ))

    return shuffled.map( (randomElement, index) => {
      const bgColor = getRandomColor();
      return (
        <motion.div key={index}
          className={`w-full h-[5vw] bg-purple-300`}
          variants={animate} initial="initial"
          animate={isActive ? "open" : "closed"}
          custom={randomElement}
        />
      )
    } )
  }

  return (
    <div className="fixed flex z-20 h-full w-full pointer-events-none mix-blend-lighten">
      {
        [...Array(20)].map( (_, index) => {
          return (
            <div key={index} className="w-[5vw] flex flex-col bg-transparent">
              { generateGrid() }
            </div>
          )
        })
      }
    </div>
  )
}