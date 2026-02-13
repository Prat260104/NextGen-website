"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveDotGrid from "./InteractiveDotGrid";

const wordVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.6,
            delay: 0.3 + i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
};

function SplitText({ text, className }: { text: string; className?: string }) {
    const words = text.split(" ");
    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={className}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 0.3em" }}
        >
            {words.map((word, i) => (
                <motion.span key={i} variants={wordVariants} custom={i} className="inline-block">
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

export default function Hero() {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <InteractiveDotGrid />
            </div>

            <motion.div
                animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4ade80]/10 rounded-full blur-[150px] -z-10"
            />

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className="mb-8"
                >
                    <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium tracking-wide border border-[#4ade80]/30 rounded-full bg-[#4ade80]/5 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
                        <span className="text-[#4ade80]">NEXTGEN</span>{" "}
                        <span className="text-gray-400">SuperComputing</span>
                    </motion.span>
                </motion.div>

                <div className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl">
                    <SplitText text="From Code to Supercomputers" />
                </div>

                <motion.h2
                    initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className="text-3xl md:text-5xl font-bold tracking-tight text-[#4ade80] mb-12 text-glow"
                >
                    Your Journey Starts Here
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="flex flex-col md:flex-row gap-6 items-center justify-center"
                >
                    <Link
                        href="/luna"
                        className="btn-glow px-8 py-3 text-lg font-medium text-[#4ade80] border border-[#4ade80] rounded-full hover:bg-[#4ade80]/10 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] magnetic-item"
                    >
                        <span>Explore Riva</span>
                    </Link>
                    <Link
                        href="/projects"
                        className="btn-glow px-8 py-3 text-lg font-medium text-[#4ade80] border border-[#4ade80] rounded-full hover:bg-[#4ade80]/10 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] magnetic-item"
                    >
                        <span>Other Projects</span>
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="scroll-indicator flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
                    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-gray-500">
                        <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
                        <motion.circle
                            cx="10" cy="10" r="3" fill="#4ade80"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
