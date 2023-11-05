"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { menuSlide } from "./animation";
import Link from "./link";
import Curve from "./curve";

const navigationComponents = [
    {
        title: "home",
        href: "/",
    },
    {
        title: "about",
        href: "/",
    },
    {
        title: "projects",
        href: "/",
    }
]

export default function Index() {
    const pathname = usePathname();
    const [indicator, setIndicator] = useState(pathname)

    return (
        <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit"
                    className="h-screen bg-neutral-800 top-0 right-0"
        >
            <div key="body" className="box-border h-full p-24 flex flex-col justify-between">
                <div key="nav" onMouseLeave={() => {setIndicator(pathname)}} className="flex flex-col text-6xl gap-3 mt-20">
                    <div key="header" className="text-neutral-500 border-b-neutral-500 uppercase text-12 mb-10">
                        <p>Navigation</p> 
                    </div>
                    {
                        navigationComponents.map( (data, index) => {
                            return <Link key={index}
                                         data={{...data, index}}
                                         isActive={indicator === data.href}
                                         setIndicator={setIndicator} 
                                    />
                        })
                    }
                </div>
                <div key="footer" className="flex w-full justify-between text-12 gap-10">
                    <a href="https://github.com/solomonbaez" className="font-light text-white">Github</a>
                    <a href="https://inner-space-five.vercel.app/" className="font-light text-white">Vercel</a>
                    <a href="https://linkedin.com/in/solomonbaez" className="font-light text-white">LinkedIn</a>
                </div>
            </div>
            <Curve />
        </motion.div>
    )
}