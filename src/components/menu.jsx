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
  }
}

export default function Index({isActive}) {
  return (
    <motion.div variants={animate} initial="initial" animate={isActive ? "open" : "closed"}
      className="h-[90vh] w-full z-20 fixed flex flex-col items-center justify-center"
    >
      <p className="text-4xl m-1 mb-2">Home</p>
      <p className="text-4xl m-1 mb-2">About</p>
      <p className="text-4xl m-1 mb-2">Contact</p>
    </motion.div>
  )
}