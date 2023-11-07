'use client';
import { useState } from 'react';
import Titles from "./titles"
// import Descriptions from "./descriptions"

const data = [
    {
        title: "Inner Space",
        href: "https://github.com/solomonbaez/InnerSpace",
        description: "This website!",
        speed: 0.5
    },
    {
        title: "Hyacinth",
        href: "https://github.com/solomonbaez/SB-Go-Newsletter-API",
        description: "Newsletter API built in Go",
        speed: 0.5
    },
    {
        title: "Acantha",
        href: "https://github.com/solomonbaez/hyacinth-newsletter-service",
        description: "Newsletter API build in Rust",
        speed: 0.67
    },
    {
        title: "Koios",
        href: "https://github.com/solomonbaez/koios-framework",
        description: "Convolutional Neural Network Framework built in Python with NumPy",
        speed: 1
    },
]

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null)
    return (
        <div className="absolut z-10 w-full mix-blend-difference">
          <Titles data={data} setSelectedProject={setSelectedProject}/>
          {/* <Descriptions data={data} selectedProject={selectedProject}/>         */}
        </div>
    )
}