
export default function Index({ isActive }: {isActive: boolean}) {
  return (
    <>
      <div className="absolute z-30 top-0 left-0 w-screen h-screen bg-transparent p-10 inline-flex flex-col justify-start pointer-events-none">

        <div className="pb-10 md:ml-[1vw] flex-row w-full items-center mix-blend-difference justify-start">
          <p className="fixed flex-1 h-8 text-4xl font-bold leading-8 text-white tracking-tighter">
            SB
          </p>
        </div>

        <div className={`pt-5 md:pt-10 md:ml-[1vw] flex-row items-start justify-start transition-opacity duration-700 ${isActive ? "opacity-0" : "opactiy-300"}`}>
          <p className="flex-1 h-full text-12 leading-6 text-white">
            <b>FULLSTACK ENGINEER</b>
            <br />
            <b className="invisible md:visible">🂠 🂡 🂠 🂱 🂠</b>
            <br />
            <b className="invisible md:visible">—</b>
          </p>
        </div>

        <div className="absolute top-5 right-[2vw] w-0 hidden md:flex md:flex-row h-screen items-end justify-start">
          <p className="absolute rotate-90 text-2xl top-1/2 -right-40 font-bold text-white whitespace-nowrap">
            S C R O L L  D O W N &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↦
          </p>
        </div>
      </div>
    </>
  );
}
