"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Golden ratio constant
const PHI = 1.618033988749895;

export default function MathCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [nearestElement, setNearestElement] = useState<{
        distance: number;
        angle: number;
    } | null>(null);

    const centerX = useRef(0);
    const centerY = useRef(0);

    useEffect(() => {
        // Calculate center of viewport
        centerX.current = window.innerWidth / 2;
        centerY.current = window.innerHeight / 2;

        const handleResize = () => {
            centerX.current = window.innerWidth / 2;
            centerY.current = window.innerHeight / 2;
        };

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            // Calculate distance and angle from center
            const dx = e.clientX - centerX.current;
            const dy = e.clientY - centerY.current;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees

            setNearestElement({ distance, angle });

            // Check if hovering over interactive element
            const target = e.target as HTMLElement;
            const isInteractive = Boolean(
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("cursor-pointer")
            );

            setIsHovering(isInteractive);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Format number to fixed decimals
    const formatNum = (n: number, decimals = 0) => n.toFixed(decimals);

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Main cursor dot */}
                    <motion.div
                        className="fixed pointer-events-none z-[9999] mix-blend-difference"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: 1,
                            scale: isHovering ? 1.5 : 1,
                            x: position.x - 8,
                            y: position.y - 8,
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    >
                        <div className={`w-4 h-4 rounded-full ${isHovering ? "bg-primary" : "bg-white"}`} />
                    </motion.div>

                    {/* Coordinate display */}
                    <motion.div
                        className="fixed pointer-events-none z-[9998] font-mono text-[10px]"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 0.9,
                            x: position.x + 16,
                            y: position.y + 16,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        <div className="bg-black/90 text-white px-2 py-1.5 rounded-md whitespace-nowrap">
                            <span className="text-gray-400">(</span>
                            <span className="text-white">{formatNum(position.x)}</span>
                            <span className="text-gray-400">, </span>
                            <span className="text-white">{formatNum(position.y)}</span>
                            <span className="text-gray-400">)</span>
                        </div>
                    </motion.div>

                    {/* Radial guide lines to center (visible on hover) */}
                    {isHovering && nearestElement && (
                        <motion.svg
                            className="fixed inset-0 pointer-events-none z-[9997]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                        >
                            <line
                                x1={centerX.current}
                                y1={centerY.current}
                                x2={position.x}
                                y2={position.y}
                                stroke="white"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                            />
                            {/* Angle arc */}
                            <path
                                d={`M ${centerX.current + 30} ${centerY.current} A 30 30 0 ${nearestElement.angle > 0 ? "0" : "1"
                                    } 1 ${centerX.current + 30 * Math.cos((nearestElement.angle * Math.PI) / 180)} ${centerY.current + 30 * Math.sin((nearestElement.angle * Math.PI) / 180)
                                    }`}
                                stroke="cyan"
                                strokeWidth="2"
                                fill="none"
                            />
                        </motion.svg>
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
