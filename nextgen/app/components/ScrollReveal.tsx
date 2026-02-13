"use client";

import { useRef } from "react";
import { motion, useInView, type TargetAndTransition } from "framer-motion";

type Variant = "fade-up" | "fade-left" | "fade-right" | "scale-in" | "blur-in";

interface ScrollRevealProps {
    children: React.ReactNode;
    variant?: Variant;
    delay?: number;
    duration?: number;
    className?: string;
    threshold?: number;
}

const variantMap: Record<Variant, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
    "fade-up": {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    "scale-in": {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    "blur-in": {
        hidden: { opacity: 0, filter: "blur(10px)", y: 30 },
        visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
};

export default function ScrollReveal({
    children,
    variant = "fade-up",
    delay = 0,
    duration = 0.7,
    className = "",
    threshold = 0.2,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    const { hidden, visible } = variantMap[variant];

    return (
        <motion.div
            ref={ref}
            initial={hidden}
            animate={isInView ? visible : hidden}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
