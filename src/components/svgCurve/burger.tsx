
export default function Index( {isActive, setIsActive}: {isActive: boolean, setIsActive: (isActive: boolean) => void} ) {
    return (
        <>
            <button
            className="fixed top-10 right-10 z-30 w-20 h-20 flex items-center justify-center transform transition-transform"
            onClick={() => setIsActive(!isActive)}
            >
                <div className={`w-14 transition-transform transform translate-y-0 ${isActive ? "translate-y-1 origin-center duration-300" : ""}`}>
                    <div className={`h-0.5 rounded-lg block bg-white relative transform transition-transform ${isActive ? "rotate-45 top-0.5 duration-300 ease-in-out" : ""}`}></div>
                    <div className={`h-0.5 rounded-lg mt-3 block bg-white relative transform transition-transform ${isActive ? "-rotate-45 -top-3 duration-300 ease-in-out" : ""}`}></div>
                </div>
            </button>
        </>
    );
};