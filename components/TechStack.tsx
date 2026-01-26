"use client";

import { motion } from "framer-motion";
import { HarmonicFloat, SpringBounce, SPRING_CONFIG } from "./MathMotion";
import Reveal from "./Reveal";
import {
    SiJavascript,
    SiTypescript,
    SiPython,
    SiHtml5,
    SiCss3,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiMui,
    SiNodedotjs,
    SiExpress,
    SiFastapi,
    SiScikitlearn,
    SiNumpy,
    SiPandas,
    SiMysql,
    SiPostgresql,
    SiMongodb,
    SiPrisma,
    SiAmazon,
    SiDocker,
    SiKubernetes,
    SiGithubactions,
    SiGnubash,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const techCategories = [
    {
        title: "Languages",
        color: "border-red-200 hover:border-red-400",
        text: "text-red-500",
        bg: "bg-red-50",
        skills: [
            { name: "JavaScript", icon: SiJavascript },
            { name: "TypeScript", icon: SiTypescript },
            { name: "Python", icon: SiPython },
        ],
    },
    {
        title: "Frontend",
        color: "border-blue-200 hover:border-blue-400",
        text: "text-blue-500",
        bg: "bg-blue-50",
        skills: [
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "Tailwind", icon: SiTailwindcss },
            { name: "MUI", icon: SiMui },
            { name: "HTML", icon: SiHtml5 },
            { name: "CSS", icon: SiCss3 },
        ],
    },
    {
        title: "Backend",
        color: "border-green-200 hover:border-green-400",
        text: "text-green-500",
        bg: "bg-green-50",
        skills: [
            { name: "Node.js", icon: SiNodedotjs },
            { name: "Express", icon: SiExpress },
            { name: "FastAPI", icon: SiFastapi },
            { name: "REST API", icon: TbApi },
        ],
    },
    {
        title: "AI & Data",
        color: "border-purple-200 hover:border-purple-400",
        text: "text-purple-500",
        bg: "bg-purple-50",
        skills: [
            { name: "scikit-learn", icon: SiScikitlearn },
            { name: "NumPy", icon: SiNumpy },
            { name: "Pandas", icon: SiPandas },
        ],
    },
    {
        title: "Database",
        color: "border-yellow-200 hover:border-yellow-400",
        text: "text-yellow-500",
        bg: "bg-yellow-50",
        skills: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "MySQL", icon: SiMysql },
            { name: "MongoDB", icon: SiMongodb },
            { name: "Prisma", icon: SiPrisma },
        ],
    },
    {
        title: "DevOps",
        color: "border-cyan-200 hover:border-cyan-400",
        text: "text-cyan-500",
        bg: "bg-cyan-50",
        skills: [
            { name: "AWS", icon: SiAmazon },
            { name: "Docker", icon: SiDocker },
            { name: "K8s", icon: SiKubernetes },
            { name: "Actions", icon: SiGithubactions },
            { name: "Bash", icon: SiGnubash },
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
                            My technical toolbox for building digital products.
                        </p>
                    </Reveal>
                </div>

                <div className="space-y-16">
                    {techCategories.map((category, catIndex) => (
                        <div key={category.title} className="flex flex-col items-center">
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
