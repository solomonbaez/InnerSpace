
export default function Index( {isActive}: {isActive: boolean} ) {
  return (
    <>
      <div className="flex flex-row z-40 pointer-events-none">
          <div className={`h-0.5 w-5 bg-black relative transition-transform duration-300 ease-in-out -top-2 -right-5 ${isActive ? "translate-x-1 rotate-45" : "-rotate-45"}`}></div>
          <div className={`h-0.5 w-5 bg-black relative transition-transform duration-300 ease-in-out -top-2 -right-5 ${isActive ? "-translate-x-1 -rotate-45" : "rotate-45"}`}></div>
          
          <div className={`h-0.5 w-5 bg-black relative transition-transform duration-300 ease-in-out top-2 right-5 ${isActive ? "translate-x-1 -translate-y-1 -rotate-45" : "rotate-45"}`}></div>
          <div className={`h-0.5 w-5 bg-black relative transition-transform duration-300 ease-in-out top-2 right-5 ${isActive ? "-translate-x-1 -translate-y-1 rotate-45" : "-rotate-45"}`}></div>
      </div>
    </>
  );
}