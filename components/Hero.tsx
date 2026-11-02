"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const words = ["Medical Imaging", "Forecasting", "Real-World Data"];

export default function Hero() {
    const [currentWord, setCurrentWord] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setCurrentWord(
                isDeleting
                    ? fullText.substring(0, currentWord.length - 1)
                    : fullText.substring(0, currentWord.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && currentWord === fullText) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentWord === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentWord, isDeleting, loopNum, typingSpeed]);

    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block py-1 px-3 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-600 mb-6 font-medium"
                    >
                        Open to Machine Learning Engineer roles
                    </motion.span>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-gray-900">
                        Machine Learning <br />
                        <span className="text-gradient">
                            for {currentWord}
                        </span>
                        <span className="animate-pulse text-primary">|</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        I&apos;m Akhil, a Machine Learning Engineer. I take models from raw data to deployed apps: deep learning, time-series forecasting and computer vision, with honest evaluation and baselines they have to beat.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            href="#projects"
                            className="group relative px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95"
                        >
                            View ML Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#contact"
                            className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-all shadow-sm hover:shadow-lg hover:-translate-y-1 active:scale-95"
                        >
                            Contact Me
                        </Link>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-6 text-gray-500">
                        <Link href="https://github.com/akhilnathreddy" className="hover:text-black transition-all hover:scale-110 hover:rotate-12 duration-300">
                            <Github className="w-6 h-6" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/akhil-nath-reddy-kommuru-9510b6323/" className="hover:text-blue-600 transition-all hover:scale-110 hover:-rotate-12 duration-300">
                            <Linkedin className="w-6 h-6" />
                        </Link>
                        <Link href="https://x.com/AkhilKommuru124" className="hover:text-black transition-all hover:scale-110 hover:rotate-12 duration-300">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </Link>
                    </div>

                </motion.div>
            </div >
        </section >
    );
}
