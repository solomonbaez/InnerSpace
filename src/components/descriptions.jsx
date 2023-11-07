import React from 'react'

export default function index({data, selectedProject}) {

    const crop = (string, maxLength) => {
        return string.substring(0, maxLength);
    }
    
    return (
        <div className="absolute top-[3px] h-full w-full z-20 pointer-events-none">
            {
                data.map( (project, i) => {
                    const { title, description } = project;
                    return (
                    <div 
                        key={i} 
                        className="flex justify-between items-center pl-[10%] pr-[10%]"
                        // style={{clipPath: selectedProject == i ? "inset(0 0 0)" : "inset(50% 0 50%"}}
                    >
                        <p>{crop(title, 9)}</p>
                        <p>{description}</p>
                    </div>
                    )
                })
            }
        </div>
    )
}