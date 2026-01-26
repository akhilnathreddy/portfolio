"use client";

import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Spring physics constants (real damping equation: F = -kx - cv)
const SPRING_CONFIG = {
    stiffness: 150, // k (spring constant)
    damping: 15,    // c (damping coefficient)
    mass: 1,        // m
};

// Harmonic motion: y(t) = A * sin(ωt + φ)
interface HarmonicFloatProps {
    children: React.ReactNode;
    amplitude?: number;  // A
    frequency?: number;  // ω (radians per second)
    phase?: number;      // φ (initial phase)
    className?: string;
}

export function HarmonicFloat({
    children,
    amplitude = 10,
    frequency = 0.5,
    phase = 0,
    className = "",
}: HarmonicFloatProps) {
    const [y, setY] = useState(0);

    useEffect(() => {
        let animationId: number;
        const startTime = Date.now();

        const animate = () => {
            const t = (Date.now() - startTime) / 1000; // time in seconds
            // y(t) = A * sin(2πft + φ)
            const newY = amplitude * Math.sin(2 * Math.PI * frequency * t + phase);
            setY(newY);
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [amplitude, frequency, phase]);

    return (
        <motion.div
            className={className}
            style={{ y }}
        >
            {children}
        </motion.div>
    );
}

// Sine wave hover: displacement follows sin(θ) where θ is mouse position
interface SineHoverProps {
    children: React.ReactNode;
    intensity?: number;
    className?: string;
}

export function SineHover({ children, intensity = 5, className = "" }: SineHoverProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Transform mouse position to sine-based rotation
    const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        // Normalize to -0.5 to 0.5
        const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
        const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

        // Apply sine transformation for smooth, natural feel
        x.set(Math.sin(normalizedX * Math.PI));
        y.set(Math.sin(normalizedY * Math.PI));
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            transition={{ type: "spring", ...SPRING_CONFIG }}
        >
            {children}
        </motion.div>
    );
}

// Spring Bounce: Real physics-based spring with damping
interface SpringBounceProps {
    children: React.ReactNode;
    className?: string;
}

export function SpringBounce({ children, className = "" }: SpringBounceProps) {
    const scale = useSpring(1, SPRING_CONFIG);

    return (
        <motion.div
            className={className}
            style={{ scale }}
            onHoverStart={() => scale.set(1.05)}
            onHoverEnd={() => scale.set(1)}
            onTapStart={() => scale.set(0.95)}
            onTap={() => scale.set(1)}
        >
            {children}
        </motion.div>
    );
}

// Damped Oscillation on click: x(t) = A * e^(-γt) * cos(ωt)
interface DampedClickProps {
    children: React.ReactNode;
    className?: string;
}

export function DampedClick({ children, className = "" }: DampedClickProps) {
    const [offset, setOffset] = useState(0);

    const handleClick = () => {
        const A = 20;      // Initial amplitude
        const gamma = 3;   // Damping factor
        const omega = 15;  // Angular frequency
        const startTime = Date.now();

        const animate = () => {
            const t = (Date.now() - startTime) / 1000;
            // Damped oscillation: x(t) = A * e^(-γt) * cos(ωt)
            const x = A * Math.exp(-gamma * t) * Math.cos(omega * t);

            if (Math.abs(x) > 0.1) {
                setOffset(x);
                requestAnimationFrame(animate);
            } else {
                setOffset(0);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <motion.div
            className={className}
            style={{ x: offset }}
            onClick={handleClick}
        >
            {children}
        </motion.div>
    );
}

// Circular motion: x = r*cos(θ), y = r*sin(θ)
interface CircularOrbitProps {
    children: React.ReactNode;
    radius?: number;
    speed?: number; // revolutions per second
    className?: string;
}

export function CircularOrbit({
    children,
    radius = 20,
    speed = 0.2,
    className = "",
}: CircularOrbitProps) {
    const [pos, setPos] = useState({ x: radius, y: 0 });

    useEffect(() => {
        let animationId: number;
        const startTime = Date.now();

        const animate = () => {
            const t = (Date.now() - startTime) / 1000;
            const theta = 2 * Math.PI * speed * t;
            // Parametric circle: x = r*cos(θ), y = r*sin(θ)
            setPos({
                x: radius * Math.cos(theta),
                y: radius * Math.sin(theta),
            });
            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationId);
    }, [radius, speed]);

    return (
        <motion.div
            className={className}
            style={{ x: pos.x, y: pos.y }}
        >
            {children}
        </motion.div>
    );
}

// Export spring config for use in other components
export { SPRING_CONFIG };
