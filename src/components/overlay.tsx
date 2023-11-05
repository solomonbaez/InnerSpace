import React, { forwardRef } from 'react';
import Diamond from "@/components/diamond"
import MagneticGSAP from "@/components/magneticGSAP"


export default function Index() {
  return (
    <>
      <div className="absolute z-30 top-0 left-0 w-screen h-screen bg-transparent p-10 mix-blend-difference inline-flex flex-col justify-start pointer-events-none">

        <div className="pb-10 flex-row items-center justify-start">
          <p className="fixed z-20 flex-1 h-8 text-4xl font-bold leading-8 text-white tracking-tighter">
            SB
          </p>
        </div>
        <div className="pt-10 flex-row items-start justify-start">
          <p className="flex-1 h-full text-12 leading-6 text-white">
            <b>FULLSTACK ENGINEER</b>
            <br />
            🂠 🂡 🂠 🂱 🂠
            <br />
            <b>—</b>
          </p>
        </div>

        <div className="absolute top-0 right-0 w-0 hidden md:flex md:flex-row h-screen items-end justify-end">
          <p className="absolute rotate-90 text-2xl top-1/2 -right-40 font-bold text-white whitespace-nowrap">
            S C R O L L  D O W N &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↦
          </p>
        </div>
      </div>
    </>
  );
}


{/* export function Overlay() { return (
    <div style={{ position: "absolute", bottom: 40, right: 40 }}>
      <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "black" }}>
        <a href="http://pmnd.rs/">pmnd.rs</a> <a href="https://github.com/pmndrs">git</a> <a href="https://codesandbox.io/s/zxpv7">csb</a>
      </p>
    </div>
  )
} */}

      // <div className="h-3" />
      // <div className="h-full w-full flex-1 p-0 inline-flex flex-row items-end justify-center">
      //   <p className="flex-1 text-[250] leading-4 text-white m-0 tracking-tighter">X</p>
      //   <div className="w-3" />
      //   <p className="flex-1 text-[250] leading-4 text-white text-right m-0 tracking-tighter">_01</p>
      // </div>
      // <div className="h-16" />
      // <div className="pointer-events-none w-full p-0 inline-flex flex-row items-end justify-center">
      //   <p className="h-full w-full whitespace-nowrap flex-1 text-12 leading-6 text-white">
      //     <b>Wonders of Antiquity</b>
      //     <br />
      //     Pythagorean Mathematics
      //   </p>
      //   <div className="w-3" />
      //   <p className="h-full w-full flex-1 text-lg text-white whitespace-nowrap tracking-tighter">
      //     THE SUMMIT OF THE MANY
      //   </p>
      //   <div className="w-3" />
      //   <p className="h-full w-full flex-1 font-12 leading-4 text-right text-white"></p>
      // </div>
