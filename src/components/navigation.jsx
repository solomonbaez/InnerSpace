"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { menuSlide } from "@/components/animation";
import Link from "@/components/link";

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

export default function Navigation() {
    const pathname = usePathname();
    const [indicator, setIndicator] = useState(pathname)

    return (
        <motion.div variants={menuSlide} initial="initial" animate="enter" exit="exit"
                    className="h-screen bg-slate-800 top-0 right-0"
        >
            <div onMouseLeave={() => {setIndicator(pathname)}} className="flex flex-col text-6xl gap-3 mt-20">
            <div className="box-border h-full p-96 flex-col justify-between">
                <div className="flex-col text-6xl gap-3 mt-20">
                    <p>NAVIGATION</p>
                </div>
            {
                navigationComponents.map( (data, index) => {
                    return <Link key={index}
                                 data={{...data, index}}
                                 isActive={indicator == data.href}
                                 setIndicator={setIndicator} 
                            />
                })
            }
            <div className="flex w-full justify-between text-12 gap-10">
                <a>GITHUB</a>
                <a>VERCEL</a>
                <a>LINKEDIN</a>
            </div>
            </div>
        </div>
        </motion.div>
    )
}