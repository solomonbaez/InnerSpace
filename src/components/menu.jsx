import { motion } from "framer-motion";

const animate = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1
  }, 
  exit: {
    opacity: 0
  },
}

export default function Index({isActive}) {
  return (
    <motion.div variants={animate} initial="initial" animate={isActive ? "open" : "closed"}
      className="h-screen bg-neutral-800 w-full z-10 fixed flex flex-col items-center justify-center"
    >
      <p>Home</p>
      <p>About</p>
      <p>Projects</p>
    </motion.div>
  )
}