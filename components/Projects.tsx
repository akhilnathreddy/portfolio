"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";

const projects = [
    {
        primeId: "02",
        date: "Feb 2025 – Present",
        title: "AI Image Generator",
        role: "Full Stack Developer",
        description: "Built a production-ready AI platform that generates realistic images from text prompts using Stable Diffusion. Implemented a credit system, user gallery, and high-performance image processing pipeline.",
        tags: ["Next.js", "Python", "FastAPI", "PyTorch", "PostgreSQL"],
        link: "#",
        github: "#",
        gradient: "from-violet-500 to-purple-500",
        features: [
            "Developed responsive UI using React & Tailwind",
            "Built scalable REST APIs with FastAPI",
            "Optimized image generation latency by 40%",
            "Integrated Stripe for payment processing"
        ]
    },
    {
        primeId: "03",
        date: "Nov 2024 – Jan 2025",
        title: "E-Commerce Dashboard",
        role: "Frontend Engineer",
        description: "Real-time analytics dashboard for online stores with predictive sales modeling. Visualized complex data sets using interactive charts and graphs.",
        tags: ["React", "Tremor", "PostgreSQL", "AWS"],
        link: "#",
        github: "#",
        gradient: "from-blue-500 to-cyan-500",
        features: [
            "Implemented real-time data updates via WebSockets",
            "Designed accessible and dark-mode compatible UI",
            "Reduced bundle size by 30% with code splitting"
        ]
    },
    {
        primeId: "05",
        date: "Aug 2024 – Oct 2024",
        title: "Smart Chatbot",
        role: "AI Engineer",
        description: "Context-aware chatbot powered by LLMs for customer support automation. Handles thousands of concurrent queries with sub-second response times.",
        tags: ["OpenAI API", "Node.js", "Redis", "Docker"],
        link: "#",
        github: "#",
        gradient: "from-emerald-500 to-teal-500",
        features: [
            "Fine-tuned GPT-3.5 on custom support data",
            "Implemented semantic search using vector databases",
            "Deployed on Kubernetes for high availability"
        ]
    },
    {
        primeId: "07",
        date: "May 2024 – July 2024",
        title: "Portfolio V1",
        role: "Creative Developer",
        description: "My previous portfolio website built with vanilla JS and WebGL. Experimented with 3D graphics and shader programming.",
        tags: ["JavaScript", "WebGL", "GSAP", "Three.js"],
        link: "#",
        github: "#",
        gradient: "from-orange-500 to-red-500",
        features: [
            "Created custom WebGL shaders for background effects",
            "Achieved 100/100 Lighthouse performance score",
            "Implemented smooth scroll and page transitions"
        ]
    },
];

function TimelineItem({ project, index }: { project: any; index: number }) {
    return (
        <div
            className="relative grid grid-cols-1 md:grid-cols-[38.2%_61.8%] gap-8 mb-20 last:mb-0 items-start"
            style={{ columnGap: "calc(100% * 0.05)" }} // 5% gap for spacing
        >
            {/* Date Column (Left - 38.2%) */}
            <div className="text-right pt-2 hidden md:block pr-8 border-r border-gray-100">
                <Reveal width="100%" delay={index * 0.1}>
                    <h3 className="text-3xl font-bold text-gray-300">φ = 1.618</h3>
                    <h3 className="text-xl font-medium text-gray-500 mt-2">{project.date}</h3>
                </Reveal>
            </div>

            {/* Mobile Date */}
            <div className="md:hidden pl-12 mb-2">
                <span className="text-lg font-bold text-gray-500">{project.date}</span>
            </div>

            {/* Timeline Line & Dot (Center - Adjusted for Golden Ratio) */}
            <div className="absolute left-4 md:left-[38.2%] top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent md:to-gray-200 -z-10">
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`absolute top-0 left-0 w-full bg-gradient-to-b ${project.gradient}`}
                />
            </div>

            <div className="absolute left-4 md:left-[38.2%] top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-200 z-10 shadow-sm">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`w-full h-full rounded-full bg-gradient-to-r ${project.gradient}`}
                />
            </div>

            {/* Content Column (Right - 61.8%) */}
            <div className="pl-12 md:pl-0">
                <Reveal width="100%" delay={index * 0.1}>
                    <TiltCard className="h-full">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full relative overflow-hidden group">
                            {/* Gradient Top Border */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradient}`} />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-mono text-primary/50 text-sm font-bold">#{project.primeId}</span>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 mt-1">{project.role}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        href={project.link}
                                        className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all duration-300"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href={project.github}
                                        className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all duration-300"
                                    >
                                        <Github className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            <ul className="space-y-2 mb-8">
                                {project.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-50 text-gray-600 border border-gray-100"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </TiltCard>
                </Reveal>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-20 relative bg-white/50 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <Reveal width="100%">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 text-center">
                            Featured <span className="text-primary">Work</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
                            A timeline of my journey building scalable applications and AI solutions.
                        </p>
                    </Reveal>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <TimelineItem key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
