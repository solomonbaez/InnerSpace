import { motion } from "framer-motion";
const animate = {
  initial: {
      opacity: 0
  },
  open: {
      opacity: 1,
  },
  exit: {
      opacity: 0,
      transition: {duration: 0, delay: 0.6}
  }
}

export default function Index({isActive}) {
  return (
    <motion.div variants={animate} initial="initial" animate={isActive ? "open" : "exit"}
      className="h-[90vh] w-full z-20 fixed flex flex-col items-center justify-center mix-blend-difference uppercase"
    >
      <p className="text-6xl text-white m-1 mb-2">Home</p>
      <p className="text-6xl text-white m-1 mb-2">About</p>
      <p className="text-6xl text-white m-1 mb-2">Contact</p>
    </motion.div>
  )
}