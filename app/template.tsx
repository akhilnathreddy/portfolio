"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                transform: "matrix(0.8, 0.2, -0.2, 0.8, 0, 100)", // Matrix: scale, skew, translate
                filter: "blur(10px)"
            }}
            animate={{
                opacity: 1,
                transform: "matrix(1, 0, 0, 1, 0, 0)", // Identity matrix
                filter: "blur(0px)"
            }}
            exit={{
                opacity: 0,
                transform: "matrix(1.2, -0.1, 0.1, 1.2, 0, -100)",
                filter: "blur(10px)"
            }}
            transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for "snappy" math feel
            }}
        >
            {children}
        </motion.div>
    );
}
