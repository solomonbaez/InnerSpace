import dynamic from "next/dynamic";
import { Canvas } from "@react-three/offscreen";
// import Canvas from "@react-three/fiber"

const Ripple = dynamic(() => import("./ripple"), {ssr: false});
const worker = new Worker(new URL("./worker", import.meta.url), {type: "module"});

interface Dimensions {
  width: number,
  height: number,
	dpr: number, 
}

const ripple: Dimensions = {
  width: 640,
  height: 640,
  dpr: 1,
}

export default function App() {
  return (
    <Canvas
      worker={worker} 
      fallback={null} //<Ripple dimensions={ripple}/>}
      camera={{
        position: [0, 0, 6],
        fov: 50,
        aspect: ripple.width / ripple.height,
        near: 0.1,
        far: 2000
      }}
      dpr={ripple.dpr}
      // className="bg-white"
    />
  )
}