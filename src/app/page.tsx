"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import Overlay from "@/components/overlay";
// import Menu from "@/components/menu"
import PixelTransition from "@/components/pixelTransition";
import ReactiveCursor from "@/components/reactiveCursor";
import { AnimatePresence } from "framer-motion";
import { useScramble } from "use-scramble";

const Ripple = dynamic(() => import("../animations/ripple"), {ssr: false});

interface Dimensions {
  width: number,
  height: number,
  dpr: number, 
}

const Home: React.FC = () => {
  const reactiveElement = useRef<HTMLButtonElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [transition, setTransition] = useState<boolean>(false);

  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0, dpr: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState<Dimensions>({ width: 0, height: 0, dpr:0 });
  const updateDimensions = () => {
    // const { innerWidth, innerHeight } = window;
    const clientWidth = window.document.documentElement.clientWidth;
    const clientHeight = window.document.documentElement.clientHeight;
    const dpr = window.devicePixelRatio;
    setDimensions({ width: clientWidth, height: clientHeight, dpr: dpr });

    // set a static dimension for the canvas to reduce state stress
    if (canvasDimensions.width === 0 && canvasDimensions.height === 0) {
      setCanvasDimensions({ width: clientWidth, height: clientWidth, dpr: dpr });
    }
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      setTransition(isActive)
    } else {
      const transitionTimeout = setTimeout(() => {
        setTransition(isActive)
      }, 900);

      return () => {
        clearTimeout(transitionTimeout)
      };
    }

  }, [isActive, transition])

  const { ref, replay } = useScramble({
    text: "HELLO WORLD",
    speed: 0.2,
    tick: 1,
    seed: 4,
    overdrive: false,
  })

  return (
    <main>
      <Overlay isActive={isActive}/>
      <Header ref={reactiveElement} isActive={isActive} setIsActive={setIsActive}/>
      {/* <Menu isActive={isActive} /> */}
      <ReactiveCursor reactiveElement={reactiveElement}/>

      {/* { isActive && <div className="transition-opacity duration-1000 opacity-100 absolute z-20 h-screen w-screen bg-white mix-blend-difference"></div>} */}

      <AnimatePresence>
        { transition && dimensions.height > 0 && <PixelTransition isActive={isActive} dimensions={dimensions} /> }
        {/* {isActive && <Navigation />} */}
      </AnimatePresence>

      <div className="h-screen w-screen justify-center">

      <Suspense fallback={null}>
        <Ripple dimensions={canvasDimensions}/>

        <div className= {`bg-white absolute w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mix-blend-difference uppercase text-black ${isActive ? "transition-opacity duration-700 opacity-0" : "opacity-100"}`}>
          <h1 ref={ ref } onFocus={replay} onMouseOver={replay} className="whitespace-nowrap text-5xl md:text-7xl lg:text-8xl"/>
        </div>
      </Suspense>
      </div>
      { !isActive ? (
        <div className="z-30 w-screen h-screen bg-transparent p-10 inline-flex flex-col justify-start pointer-events-none">
          <div className={`pt-10 flex-row items-center justify-center transition-opacity duration-700 ${isActive ? "opacity-0" : "opactiy-300"}`}>

            <p className="relative whitespace-normal w-5/6 left-1/2 -translate-x-1/2 text-2xl md:text-4xl text-white">
              Hi, I&apos;m Solomon Baez, a Fullstack Engineer with a focus on developing Backend solutions.
            </p>
            <div>
              <svg width="250px" height="192px" viewBox="0 0 512 192" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                  <g>
                      <path d="M292.533152,13.2950639 L293.657233,14.0455076 C306.869315,22.7704678 316.342129,34.7361275 322.574244,49.1946331 C324.069951,51.4381943 323.072813,52.6846171 320.081398,53.4324709 L315.017741,54.7277932 C303.571167,57.6768058 294.487155,60.1566573 283.191384,63.10567 L276.74841,64.7843862 C274.428264,65.3583626 273.787695,65.1170696 271.320433,62.3073717 L270.972336,61.9081465 C267.453024,57.9195933 264.816991,55.2559574 260.154613,52.878088 L259.255961,52.4353326 C243.551033,44.7075107 228.344673,46.9510719 214.135452,56.1746012 C197.184101,67.1431227 188.459141,83.3466202 188.708425,103.538671 C188.95771,123.481438 202.668362,139.93422 222.361843,142.67635 C239.313195,144.919911 253.522416,138.937081 264.740222,126.223568 C266.983783,123.481438 268.978059,120.490023 271.470905,117.000039 L223.358982,117.000039 C218.124006,117.000039 216.877583,113.759339 218.622575,109.521501 L219.486848,107.487264 C222.690544,100.033179 227.659682,89.3185944 230.887235,83.1925665 L231.591356,81.8743455 C232.452883,80.3801337 234.202861,78.3609287 237.568203,78.3609287 L317.791861,78.3603482 C321.394911,66.9456209 327.24084,56.159659 335.038473,45.9539335 C353.236247,22.0226141 375.17329,9.55838523 404.838154,4.32340907 C430.265181,-0.163713323 454.196501,2.32913245 475.884259,17.0369225 C495.577741,30.4982897 507.792685,48.6960639 511.033385,72.6273834 C515.271222,106.280802 505.549124,133.702105 482.365658,157.134856 C465.912876,173.836922 445.720825,184.306875 422.537359,189.043282 C415.806676,190.289704 409.075992,190.538989 402.594593,191.286843 C379.909697,190.788274 359.219077,184.306875 341.769156,169.3498 C329.496056,158.740849 321.041799,145.701725 316.840932,130.522127 C313.926247,136.409796 310.44016,142.04853 306.370746,147.412757 C288.422257,171.094792 264.989506,185.802582 235.324641,189.791135 C210.894753,193.031835 188.209856,188.295428 168.26709,173.338353 C149.820031,159.378417 139.350079,140.931358 136.607949,117.997177 C133.367249,90.8251575 141.344356,66.3952689 157.797138,44.9567952 C175.496343,21.7733295 198.929093,7.06553943 227.59682,1.8305633 C250.59563,-2.32879605 272.633891,0.235689133 292.533152,13.2950639 L292.533152,13.2950639 Z M411.120284,49.0171223 L410.322415,49.1946331 C387.138949,54.4296092 372.181875,69.1373993 366.697614,92.5701496 C362.210492,112.014347 371.683306,131.707829 389.631795,139.684935 C403.342447,145.667765 417.053099,144.919911 430.265181,138.189228 C449.958663,127.96856 460.6779,112.014347 461.924323,90.575873 C461.675038,87.3351735 461.675038,84.8423277 461.176469,82.3494819 C456.739764,57.9476028 434.511926,44.025432 411.120284,49.0171223 L411.120284,49.0171223 Z M116.415898,94.5644262 C117.413036,94.5644262 117.911605,95.3122799 117.911605,96.3094183 L117.413036,102.292248 C117.413036,103.289387 116.415898,104.03724 115.668044,104.03724 L61.3240061,103.787956 C60.3268678,103.787956 60.0775833,103.040102 60.5761524,102.292248 L64.0661365,96.0601337 C64.5647057,95.3122799 65.561844,94.5644262 66.5589823,94.5644262 L116.415898,94.5644262 Z M121.900159,71.6302451 C122.897297,71.6302451 123.395866,72.3780988 123.146581,73.1259525 L121.152305,79.1087824 C120.90302,80.1059207 119.905882,80.6044899 118.908744,80.6044899 L0.99713831,80.8537744 C0,80.8537744 -0.249284578,80.3552053 0.249284578,79.6073515 L5.48426071,72.8766679 C5.98282987,72.1288142 7.22925276,71.6302451 8.22639107,71.6302451 L121.900159,71.6302451 Z M134.862957,48.6960639 C135.860095,48.6960639 136.109379,49.4439176 135.61081,50.1917714 L131.372973,56.6731704 C130.874403,57.4210241 129.62798,58.1688779 128.880127,58.1688779 L38.6391096,57.9195933 C37.6419713,57.9195933 37.3926867,57.4210241 37.8912558,56.6731704 L43.126232,49.9424868 C43.6248011,49.1946331 44.871224,48.6960639 45.8683623,48.6960639 L134.862957,48.6960639 Z" fill="#00ACD7" fill-rule="nonzero"></path>
                  </g>
              </svg>
              <svg width="256px" height="256px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                  <title>TypeScript</title>
                  <g>
                      <path d="M20,0 L236,0 C247.045695,0 256,8.954305 256,20 L256,236 C256,247.045695 247.045695,256 236,256 L20,256 C8.954305,256 0,247.045695 0,236 L0,20 C0,8.954305 8.954305,0 20,0 Z" fill="#3178C6"></path>
                      <path d="M150.518,200.475 L150.518,228.095 C155.01,230.397 160.323,232.123 166.456,233.274 C172.589,234.425 179.053,235 185.849,235 C192.471,235 198.763,234.367 204.723,233.101 C210.683,231.835 215.91,229.749 220.401,226.844 C224.893,223.938 228.449,220.14 231.07,215.45 C233.69,210.761 235,204.964 235,198.059 C235,193.053 234.251,188.665 232.754,184.896 C231.257,181.127 229.097,177.775 226.275,174.841 C223.454,171.906 220.07,169.274 216.126,166.943 C212.181,164.613 207.732,162.412 202.779,160.341 C199.151,158.844 195.898,157.392 193.018,155.982 C190.139,154.572 187.691,153.134 185.676,151.666 C183.66,150.199 182.105,148.645 181.011,147.005 C179.917,145.365 179.37,143.51 179.37,141.438 C179.37,139.539 179.859,137.828 180.838,136.303 C181.817,134.778 183.2,133.469 184.985,132.376 C186.77,131.282 188.958,130.434 191.55,129.829 C194.141,129.225 197.021,128.923 200.188,128.923 C202.492,128.923 204.925,129.096 207.487,129.441 C210.05,129.786 212.627,130.318 215.219,131.038 C217.81,131.757 220.329,132.663 222.777,133.757 C225.224,134.85 227.485,136.116 229.558,137.554 L229.558,111.747 C225.354,110.136 220.761,108.942 215.78,108.165 C210.799,107.388 205.083,107 198.633,107 C192.068,107 185.849,107.705 179.975,109.115 C174.101,110.524 168.932,112.725 164.469,115.717 C160.006,118.71 156.479,122.522 153.887,127.154 C151.296,131.786 150,137.324 150,143.769 C150,151.997 152.375,159.017 157.127,164.829 C161.878,170.64 169.09,175.56 178.765,179.588 C182.566,181.142 186.108,182.666 189.39,184.163 C192.673,185.659 195.509,187.212 197.899,188.823 C200.289,190.434 202.175,192.189 203.557,194.088 C204.939,195.987 205.63,198.145 205.63,200.562 C205.63,202.345 205.198,204 204.334,205.525 C203.471,207.049 202.16,208.373 200.404,209.495 C198.648,210.617 196.459,211.494 193.839,212.127 C191.219,212.76 188.152,213.077 184.639,213.077 C178.65,213.077 172.719,212.027 166.845,209.926 C160.97,207.826 155.528,204.676 150.518,200.475 L150.518,200.475 Z M104.482,131.742 L140,131.742 L140,109 L41,109 L41,131.742 L76.3447,131.742 L76.3447,233 L104.482,233 L104.482,131.742 Z" fill="#FFFFFF"></path>
                  </g>
            </svg>

            </div>

          </div>
        </div>
      ): (null) }
    </main>
  )
}

export default Home;