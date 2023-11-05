import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from './animation';

export default function Index({data, isActive, setIndicator}) {
    const { title, href, index} = data;
  
    return (
      <motion.div 
        className="relative flex items-center"
        onMouseEnter={() => {setIndicator(href)}} 
        custom={index} 
        variants={slide} 
        initial="initial" 
        animate="enter" 
        exit="exit"
      >
        <motion.div 
          variants={scale} 
          animate={isActive ? "open" : "closed"} 
          className="h-3 w-3 bg-white border rounded-lg absolute -left-8"
        >
        </motion.div>
        <Link href={href}>{title}</Link>
      </motion.div>
    )
}