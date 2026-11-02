"use client";

import { motion } from "framer-motion";
import { HarmonicFloat, SpringBounce, SPRING_CONFIG } from "./MathMotion";
import Reveal from "./Reveal";
import {
    SiPython,
    SiTypescript,
    SiPytorch,
    SiScikitlearn,
    SiOnnx,
    SiOpencv,
    SiNumpy,
    SiPandas,
    SiPlotly,
    SiJupyter,
    SiStreamlit,
    SiFastapi,
    SiDocker,
    SiKubernetes,
    SiGithubactions,
    SiAmazon,
    SiKaggle,
    SiGooglecolab,
    SiPostgresql,
    SiMongodb,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
} from "react-icons/si";
import { TbBrain, TbChartLine, TbSql, TbTree, TbTopologyStar3 } from "react-icons/tb";

const techCategories = [
    {
        title: "Languages",
        color: "border-red-200 hover:border-red-400",
        text: "text-red-500",
        bg: "bg-red-50",
        skills: [
            { name: "Python", icon: SiPython },
            { name: "SQL", icon: TbSql },
            { name: "TypeScript", icon: SiTypescript },
        ],
    },
    {
        title: "Machine Learning & Deep Learning",
        color: "border-purple-200 hover:border-purple-400",
        text: "text-purple-500",
        bg: "bg-purple-50",
        skills: [
            { name: "PyTorch", icon: SiPytorch },
            { name: "scikit-learn", icon: SiScikitlearn },
            { name: "LightGBM", icon: TbTree },
            { name: "Transformers", icon: TbBrain },
            { name: "Graph NNs", icon: TbTopologyStar3 },
            { name: "OpenCV", icon: SiOpencv },
        ],
    },
    {
        title: "Data & Experimentation",
        color: "border-blue-200 hover:border-blue-400",
        text: "text-blue-500",
        bg: "bg-blue-50",
        skills: [
            { name: "NumPy", icon: SiNumpy },
            { name: "Pandas", icon: SiPandas },
            { name: "Jupyter", icon: SiJupyter },
            { name: "Plotly", icon: SiPlotly },
            { name: "Time Series", icon: TbChartLine },
        ],
    },
    {
        title: "Deployment & MLOps",
        color: "border-green-200 hover:border-green-400",
        text: "text-green-500",
        bg: "bg-green-50",
        skills: [
            { name: "ONNX", icon: SiOnnx },
            { name: "Streamlit", icon: SiStreamlit },
            { name: "FastAPI", icon: SiFastapi },
            { name: "Docker", icon: SiDocker },
            { name: "K8s", icon: SiKubernetes },
            { name: "Actions", icon: SiGithubactions },
        ],
    },
    {
        title: "Compute & Cloud",
        color: "border-cyan-200 hover:border-cyan-400",
        text: "text-cyan-500",
        bg: "bg-cyan-50",
        skills: [
            { name: "AWS", icon: SiAmazon },
            { name: "Kaggle GPUs", icon: SiKaggle },
            { name: "Colab", icon: SiGooglecolab },
        ],
    },
    {
        title: "Data Stores & Web",
        color: "border-yellow-200 hover:border-yellow-400",
        text: "text-yellow-500",
        bg: "bg-yellow-50",
        skills: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MongoDB", icon: SiMongodb },
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Node.js", icon: SiNodedotjs },
        ],
    },
];

export default function TechStack() {
    return (
        <section id="tech" className="py-20 relative bg-white/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
                            Skills & Technologies
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
                            The toolbox I use to take models from raw data to production.
                        </p>
                    </Reveal>
                </div>

                <div className="space-y-16">
                    {techCategories.map((category, catIndex) => (
                        <div key={category.title} className="flex flex-col items-center">
                            <Reveal width="100%">
                                <h3 className={`text-center text-sm font-mono font-semibold uppercase tracking-widest mb-6 ${category.text}`}>
                                    {category.title}
                                </h3>
                            </Reveal>
                            <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
                                {category.skills.map((skill, index) => (
                                    <Reveal key={skill.name} delay={index * 0.1}>
                                        <HarmonicFloat
                                            amplitude={4}
                                            frequency={0.3 + index * 0.05}
                                            phase={index * Math.PI / 3}
                                        >
                                            <SpringBounce>
                                                <div
                                                    className={`
                                                        w-32 h-28 md:w-40 md:h-32 
                                                        bg-white 
                                                        border-2 ${category.color} 
                                                        rounded-2xl 
                                                        flex flex-col items-center justify-center gap-3 
                                                        cursor-pointer 
                                                        shadow-sm hover:shadow-xl transition-all duration-300
                                                    `}
                                                >
                                                    <div className={`p-3 rounded-full ${category.bg} ${category.text}`}>
                                                        <skill.icon className="w-6 h-6 md:w-8 md:h-8" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-gray-700">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            </SpringBounce>
                                        </HarmonicFloat>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
