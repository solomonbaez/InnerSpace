'use client';
import { useState } from 'react';
import Titles from "./titles"
// import Descriptions from "./descriptions"

const data = [
    {
        title: "Hyacinth",
        description: "Working on the Next-Generation HMI Experience without no driving experience.",
        speed: 0.5
    },
    {
        title: "Acantha",
        description: "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
        speed: 0.67
    },
    {
        title: "Koios",
        description: "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
        speed: 1
    },
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    return (
        <div className="absolut z-10 w-full">
          <Titles data={data} setSelectedProject={setSelectedProject}/>
          {/* <Descriptions data={data} selectedProject={selectedProject}/>         */}
        </div>
    )
}