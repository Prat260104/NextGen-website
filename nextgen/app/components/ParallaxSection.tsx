"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number; // 0.5 = half speed, 2 = double speed
    className?: string;
    direction?: "up" | "down";
}

export default function ParallaxSection({
    children,
    speed = 0.5,
    className = "",
    direction = "up",
}: ParallaxSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const multiplier = direction === "up" ? -1 : 1;
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [100 * speed * multiplier, -100 * speed * multiplier]
    );

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y }}>{children}</motion.div>
        </div>
    );
}
