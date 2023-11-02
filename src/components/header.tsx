
export default function Index( {isActive, setIsActive}: {isActive: boolean, setIsActive: (isActive: boolean) => void} ) {
    return (
      <>
        <button
        className="fixed top-10 right-10 z-30 w-20 h-20 flex items-center justify-center"
        onClick={() => setIsActive(!isActive)}
        >
          <div className="flex flex-row">
              <div className={`h-0.5 w-5 bg-white relative transition-transform duration-300 ease-in-out -top-2 -right-5 ${isActive ? "translate-x-1 rotate-45" : "-rotate-45"}`}></div>
              <div className={`h-0.5 w-5 bg-white relative transition-transform duration-300 ease-in-out -top-2 -right-5 ${isActive ? "-translate-x-1 -rotate-45" : "rotate-45"}`}></div>
              
              <div className={`h-0.5 w-5 bg-white relative transition-transform duration-300 ease-in-out top-2 right-5 ${isActive ? "translate-x-1 -translate-y-1 -rotate-45" : "rotate-45"}`}></div>
              <div className={`h-0.5 w-5 bg-white relative transition-transform duration-300 ease-in-out top-2 right-5 ${isActive ? "-translate-x-1 -translate-y-1 rotate-45" : "-rotate-45"}`}></div>
          </div>
        </button>
      </>
    );
}
  