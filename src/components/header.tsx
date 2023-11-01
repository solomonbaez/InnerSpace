// "use client";
// import { useState } from "react";

// export default function Header() {
//     const [activeMenu, setActiveMenu] = useState<boolean>(false);

//     return (
//         <div id="menu" onClick={() => {setActiveMenu(!activeMenu)}} 
//             className="fixed top-10 right-10 w-20 h-20 rounded-full bg-blue-500 cursor-pointer flex items-center justify-center"
//         >
//             <div className="w-full">
//                 <div className="h-1 w-2/5 bg-white relative transition-transform duration-300 
//                                 before:top-5 before:rotate-45 before:origin-center
//                                 after:top-0 after:-rotate-45 after:origin-center"
//                                 />
//                 <div className="h-1 w-2/5 bg-white relative transition-transform duration-300 
//                                 before:top-5 before:rotate-45 before:origin-center
//                                 after:top-0 after:-rotate-45 after:origin-center"
//                                 />
//             </div>
//         </div>
//     )
// }

import React, { useState } from "react";

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <button
        className="fixed top-10 right-10 z-20 w-20 h-20 rounded-full bg-slate-500 flex items-center justify-center transform transition-transform"
        onClick={() => setIsActive(!isActive)}
        >
            <div className={`w-14 transition-transform transform translate-y-0 ${isActive ? "translate-y-1 origin-center duration-300" : ""}`}>
                <div className={`h-0.5 block bg-white relative transform transition-transform ${isActive ? "rotate-45 top-0.5 duration-300" : ""}`}></div>
                <div className={`h-0.5 mt-3 block bg-white relative transform transition-transform ${isActive ? "-rotate-45 -top-3 duration-300" : ""}`}></div>
            </div>
        </button>
    );
};

export default Header;
