"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveDotGrid from "./InteractiveDotGrid";

function useTypewriter(text: string, speed = 50, startNow = true) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!startNow) return;
        let i = 0;
        setDisplayed("");
        setDone(false);
        const interval = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, startNow]);

    return { displayed, done };
}

export default function Hero({ ready = true }: { ready?: boolean }) {
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

    const [startLine1, setStartLine1] = useState(false);
    const line1 = useTypewriter("From Code to Supercomputers", 50, startLine1);
    const line2 = useTypewriter("Your Journey Starts Here", 50, line1.done);
    const showUI = line2.done;

    // Start typing only after loading screen is gone
    useEffect(() => {
        if (!ready) return;
        const timer = setTimeout(() => setStartLine1(true), 500);
        return () => clearTimeout(timer);
    }, [ready]);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <InteractiveDotGrid startAnimation={showUI} />
            </div>

            {/* Subtle ambient glow — loops */}
            <motion.div
                animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#4DBC1B]/10 rounded-full blur-[150px] -z-10 will-change-transform"
            />

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative z-10 max-w-5xl mx-auto"
            >
                {/* Heading Line 1 — typing */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-3 min-h-[1.2em]">
                    {line1.displayed}
                    {!line1.done && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-[#4DBC1B]"
                        >
                            |
                        </motion.span>
                    )}
                </h1>

                {/* Heading Line 2 — typing, green with glow */}
                <h2
                    className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[#4DBC1B] mb-8 md:mb-12 min-h-[1.2em]"
                    style={{ textShadow: "0 0 40px rgba(77, 188, 27, 0.3)" }}
                >
                    {line2.displayed}
                    {line1.done && !line2.done && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-[#4DBC1B]"
                        >
                            |
                        </motion.span>
                    )}
                </h2>

                {/* Buttons — fade in after typing */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={showUI ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col sm:flex-row gap-5 items-center justify-center"
                >
                    <Link
                        href="#riva"
                        className="px-8 py-3 text-base font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_25px_rgba(77,188,27,0.3)] transition-all duration-300 hover:scale-105 magnetic-item"
                    >
                        Explore Riva
                    </Link>
                    <Link
                        href="#projects"
                        className="px-8 py-3 text-base font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_25px_rgba(77,188,27,0.3)] transition-all duration-300 hover:scale-105 magnetic-item"
                    >
                        Other Projects
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator — looping */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={showUI ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
                    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-gray-500">
                        <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
                        <motion.circle
                            cx="10" cy="10" r="3" fill="#4DBC1B"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
