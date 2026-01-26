"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
    { name: "About", href: "#about", vector: "(1, 0)" },
    { name: "Tech", href: "#tech", vector: "(0, 1)" },
    { name: "Projects", href: "#projects", vector: "(1, 1)" },
    { name: "Contact", href: "#contact", vector: "(2, 1)" },
];

export default function MathNav() {
    const [activeSection, setActiveSection] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Scroll spy
            for (const section of sections) {
                const element = document.getElementById(section.href.substring(1));
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section.href);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed z-50 transition-all duration-500 ease-out ${isScrolled
                ? "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl"
                : "top-0 left-0 right-0"
                }`}
        >
            <div
                className={`transition-all duration-500 ease-out flex items-center justify-between ${isScrolled
                    ? "bg-white/95 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl px-6 py-3"
                    : "bg-transparent max-w-7xl mx-auto px-6 py-5 w-full"
                    }`}
            >
                {/* Logo with XY Axis */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">A</span>
                        </div>
                        {/* X and Y axis */}
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-0.5 bg-gray-900" />
                        <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-gray-900">x</span>

                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-0.5 h-3 bg-gray-900" />
                        <span className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-[10px] font-mono font-bold text-gray-900">y</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">
                        AKHIL
                    </span>
                </Link>

                {/* Right side container for nav + CTA */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Navigation */}
                    <div className="flex items-center gap-2">
                        {sections.map((section) => (
                            <Link
                                key={section.name}
                                href={section.href}
                                onClick={() => setActiveSection(section.href)}
                            >
                                <motion.div
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-colors ${activeSection === section.href
                                        ? "bg-gray-900 text-white"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="font-medium">{section.name}</span>
                                    <span className={`text-[10px] font-mono ${activeSection === section.href ? "text-gray-400" : "text-gray-400"}`}>
                                        {section.vector}
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="#contact"
                        className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full font-medium text-sm hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <span className="font-mono text-primary">f</span>
                        <span>(contact)</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-lg bg-gray-100 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </motion.nav>
    );
}
