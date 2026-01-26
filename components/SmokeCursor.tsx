"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    life: number;
    maxLife: number;
}

export default function SmokeCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const lastMouse = useRef({ x: 0, y: 0 });
    const lastTime = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize canvas
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", handleMouseMove);

        // Animation loop
        const animate = (time: number) => {
            const dt = time - lastTime.current;
            lastTime.current = time;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate velocity
            const dx = mouse.current.x - lastMouse.current.x;
            const dy = mouse.current.y - lastMouse.current.y;
            const velocity = Math.sqrt(dx * dx + dy * dy);

            // Emit particles based on velocity
            if (velocity > 0.1) {
                const count = Math.min(Math.floor(velocity * 0.5), 10); // Cap emission
                for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = Math.random() * 0.5;

                    particles.current.push({
                        x: mouse.current.x + (Math.random() - 0.5) * 10,
                        y: mouse.current.y + (Math.random() - 0.5) * 10,
                        vx: (Math.random() - 0.5) * 0.5 - dx * 0.05, // Drift opposite to movement
                        vy: (Math.random() - 0.5) * 0.5 - dy * 0.05,
                        size: Math.random() * 10 + 5 + velocity * 0.2, // Faster = bigger puffs
                        alpha: Math.random() * 0.3 + 0.1,
                        life: 0,
                        maxLife: Math.random() * 40 + 20,
                    });
                }
            }

            // Update and draw particles
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];

                // Update
                p.x += p.vx;
                p.y += p.vy;
                p.size += 0.2; // Expand
                p.life++;
                p.alpha -= 0.01; // Fade

                // Draw
                if (p.alpha > 0 && p.life < p.maxLife) {
                    ctx.beginPath();
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                    gradient.addColorStop(0, `rgba(100, 100, 100, ${p.alpha})`);
                    gradient.addColorStop(1, "rgba(100, 100, 100, 0)");
                    ctx.fillStyle = gradient;
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    particles.current.splice(i, 1);
                }
            }

            lastMouse.current = { ...mouse.current };
            requestAnimationFrame(animate);
        };

        const animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9990]"
        />
    );
}
