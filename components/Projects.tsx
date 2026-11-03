"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import TiltCard from "./TiltCard";
import Reveal from "./Reveal";

type Project = {
    primeId: string;
    date: string;
    title: string;
    role: string;
    description: string;
    tags: string[];
    link: string;
    github: string;
    gradient: string;
    metrics?: { value: string; label: string }[];
    features: string[];
};

const projects: Project[] = [
    {
        primeId: "02",
        date: "Oct 2026",
        title: "Delhi-NCR Air-Quality Forecasting",
        role: "ML Engineer · Time Series & Spatio-Temporal Models",
        description: "72-hour PM2.5 forecasts for 56 regulatory monitoring stations across Delhi-NCR, fusing station data, NOAA GFS weather forecasts and VIIRS satellite fire detections. Live forecasts and a backtest explorer run in a public Streamlit app.",
        tags: ["PyTorch", "LightGBM", "Temporal Fusion Transformer", "Graph Neural Networks", "Streamlit", "GitHub Actions"],
        link: "https://delhi-aqi-forecast-ml.streamlit.app/",
        github: "https://github.com/akhilnathreddy/delhi-aqi-forecast",
        gradient: "from-sky-500 to-indigo-500",
        metrics: [
            { value: "−28%", label: "MAE vs persistence" },
            { value: "56", label: "stations" },
            { value: "72h", label: "forecast horizon" },
        ],
        features: [
            "Built a Temporal Fusion Transformer and a wind-aware spatio-temporal GNN from scratch in PyTorch, ensembled with LightGBM quantile models",
            "Designed a physics-informed smoke-arrival index that advects stubble-fire detections towards Delhi with forecast winds",
            "Leakage-free evaluation: blocked time folds with 72 h embargoes, held-out winter season, interval coverage and AQI category accuracy",
            "Level-anchored variants cut held-out winter MAE from 80.8 (persistence) to 60.2 µg/m³",
        ],
    },
    {
        primeId: "03",
        date: "Oct 2026",
        title: "Brain Tumor Segmentation (BraTS 2020)",
        role: "ML Engineer · Medical Computer Vision",
        description: "Segments gliomas in brain MRI into whole tumor, tumor core and enhancing tumor from four MRI sequences, reports tumor volumes in mL with a per-voxel uncertainty map, and keeps working when a sequence is missing.",
        tags: ["PyTorch", "U-Net", "segmentation-models-pytorch", "ONNX", "Kaggle GPU", "Streamlit"],
        link: "https://brain-tumor-seg-ml.streamlit.app/",
        github: "https://github.com/akhilnathreddy/brain-tumor-seg",
        gradient: "from-violet-500 to-fuchsia-500",
        metrics: [
            { value: "0.90", label: "Dice (whole tumor)" },
            { value: "0.97", label: "uncertainty AUROC" },
            { value: "~10 s", label: "per patient on CPU" },
        ],
        features: [
            "Compared U-Net, Attention U-Net and ResNet34 U-Net on a patient-level split of 369 patients, scored in 3D at native resolution",
            "Modality dropout keeps whole-tumor Dice at 0.83 without FLAIR, versus 0.58 for the model trained without it",
            "Uncertainty map flags errors: the 1% most uncertain voxels are wrong 35–40× more often than the rest",
            "Exported half-precision and ONNX weights; trained end-to-end in one unattended Kaggle T4 run",
        ],
    },
    {
        primeId: "05",
        date: "Feb 2026",
        title: "COVID-19 & Maternal Health Analytics",
        role: "Data Analyst · Healthcare",
        description: "Analysis of the Canadian Pregnancy during the COVID-19 Pandemic (PdP) survey to measure pandemic stress, maternal mental health and birth outcomes, with an interactive dashboard for segmented analysis.",
        tags: ["Data Cleaning", "Feature Engineering", "EDA", "Dashboards", "Google Sheets"],
        link: "#",
        github: "https://github.com/akhilnathreddy/Pregnant_Women_COVID19",
        gradient: "from-emerald-500 to-teal-500",
        metrics: [
            { value: "10.7k", label: "raw records" },
            { value: "5.4k", label: "after cleaning" },
        ],
        features: [
            "Cleaned and transformed ~10.8k survey records into an analysis-ready dataset",
            "Segmented EPDS depression and PROMIS anxiety scores by age, income and education",
            "Analyzed preterm birth, birth weight and NICU stays against pandemic-stress measures",
        ],
    },
];

function TimelineItem({ project, index }: { project: Project; index: number }) {
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
                                    {project.link !== "#" && (
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} live demo`}
                                            className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all duration-300"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </Link>
                                    )}
                                    {project.github !== "#" && (
                                        <Link
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} source code`}
                                            className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-black hover:text-white hover:scale-110 transition-all duration-300"
                                        >
                                            <Github className="w-5 h-5" />
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {project.description}
                            </p>

                            {project.metrics && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                    {project.metrics.map((metric) => (
                                        <div
                                            key={metric.label}
                                            className="rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3"
                                        >
                                            <div className={`text-2xl font-bold font-mono bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <ul className="space-y-2 mb-8">
                                {project.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className={`mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
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
                            Featured <span className="text-primary">ML Work</span>
                        </h2>
                    </Reveal>
                    <Reveal width="100%" delay={0.2}>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg text-center">
                            Models I&apos;ve built end to end: data pipelines, training, honest evaluation and deployment.
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
