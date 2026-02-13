"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";

const TIMELINE_PATH = "M 350 30 C 350 100, 110 100, 110 170 S 430 240, 430 330 S 80 380, 80 470 C 80 550, 330 590, 330 650";

const milestones = [
    { label: "Beginning", description: "Where it all started", pos: 0 },
    { label: "Concept", description: "Ideation & research", pos: 0.25 },
    { label: "Riva", description: "Our AI model", pos: 0.5 },
    { label: "AI Summit", description: "First public event", pos: 0.75 },
    { label: "Present", description: "Building the future", pos: 1 },
];

export default function AboutUs() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const isHeadingInView = useInView(headingRef, { once: true, amount: 0.3 });
    const [totalLength, setTotalLength] = useState(0);
    const [drawLength, setDrawLength] = useState(0);
    const [dotPositions, setDotPositions] = useState<{ x: number; y: number }[]>([]);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const progress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

    useEffect(() => {
        if (pathRef.current) {
            const len = pathRef.current.getTotalLength();
            setTotalLength(len);
            const positions = milestones.map((m) => {
                const pt = pathRef.current!.getPointAtLength(m.pos * len);
                return { x: pt.x, y: pt.y };
            });
            setDotPositions(positions);
        }
    }, []);

    useMotionValueEvent(progress, "change", (val) => {
        const clamped = Math.max(0, Math.min(1, val));
        setDrawLength(clamped * totalLength);
    });

    return (
        <section
            ref={sectionRef}
            className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden"
        >
            <div ref={headingRef} className="max-w-7xl mx-auto mb-16 md:mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 80, scale: 0.9 }}
                    animate={
                        isHeadingInView
                            ? { opacity: 1, y: 0, scale: 1 }
                            : { opacity: 0, y: 80, scale: 0.9 }
                    }
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-6xl md:text-[10rem] font-black tracking-tighter leading-none text-center"
                >
                    <span className="text-white">ABOUT </span>
                    <span className="text-[#4ade80] text-glow">US</span>
                </motion.h2>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8"
                >
                    We are a collective of student researchers, builders, and curious
                    minds exploring high-performance computing, artificial intelligence,
                    and the science behind large-scale systems.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-500 text-sm md:text-base italic leading-relaxed max-w-xl mx-auto"
                >
                    We bring ambitious ideas to life through collaboration,
                    experimentation, and real engineering. From first lines of code to
                    large-scale systems, we help students grow into builders of tomorrow&apos;s
                    technology.
                </motion.p>
            </div>

            <div className="max-w-2xl mx-auto relative" style={{ height: "700px" }}>
                <svg
                    viewBox="0 0 600 700"
                    fill="none"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d={TIMELINE_PATH}
                        stroke="rgba(74, 222, 128, 0.08)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        ref={pathRef}
                        d={TIMELINE_PATH}
                        stroke="url(#timelineGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={totalLength}
                        strokeDashoffset={totalLength - drawLength}
                    />

                    {dotPositions.map((pos, i) => (
                        <g key={milestones[i].label}>
                            <circle cx={pos.x} cy={pos.y} r="6" fill="#4ade80" opacity="0.15">
                                <animate
                                    attributeName="r"
                                    values="6;14;6"
                                    dur={`${2 + i * 0.3}s`}
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="0.4;0;0.4"
                                    dur={`${2 + i * 0.3}s`}
                                    repeatCount="indefinite"
                                />
                            </circle>
                            <circle
                                cx={pos.x}
                                cy={pos.y}
                                r="4"
                                fill="#4ade80"
                                filter="url(#dotGlow)"
                            />
                        </g>
                    ))}

                    <defs>
                        <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4ade80" />
                            <stop offset="50%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#4ade80" />
                        </linearGradient>
                        <filter id="dotGlow" x="-100%" y="-100%" width="400%" height="400%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {dotPositions.map((pos, i) => (
                    <motion.div
                        key={milestones[i].label}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="absolute whitespace-nowrap"
                        style={{
                            left: `${(pos.x / 600) * 100}%`,
                            top: `${(pos.y / 700) * 100}%`,
                            transform: i % 2 === 0 ? "translate(16px, -50%)" : "translate(-100%, -50%) translateX(-16px)",
                        }}
                    >
                        <p className="text-white font-bold text-sm md:text-base">{milestones[i].label}</p>
                        <p className="text-gray-500 text-xs">{milestones[i].description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
