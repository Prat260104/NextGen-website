"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "framer-motion";

// Desktop path — wider swing
const TIMELINE_PATH_DESKTOP = "M 350 30 C 350 100, 150 100, 150 170 S 450 240, 450 330 S 150 380, 150 470 C 150 550, 350 590, 350 650";
// Mobile path — tighter swing so labels stay within screen
const TIMELINE_PATH_MOBILE = "M 320 30 C 320 100, 180 100, 180 170 S 420 240, 420 330 S 180 380, 180 470 C 180 550, 320 590, 320 650";

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
    const [isMobile, setIsMobile] = useState(false);

    const TIMELINE_PATH = isMobile ? TIMELINE_PATH_MOBILE : TIMELINE_PATH_DESKTOP;

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.1", "end 0.1"],
    });

    const progress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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
    }, [TIMELINE_PATH]);

    useMotionValueEvent(progress, "change", (val) => {
        const clamped = Math.max(0, Math.min(1, val));
        setDrawLength(clamped * totalLength);
    });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative bg-black pt-24 pb-10 md:pt-32 md:pb-16 px-4 md:px-8"
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
                    className="text-5xl sm:text-7xl md:text-[10rem] font-black tracking-tighter leading-none text-center"
                >
                    <span className="text-white">ABOUT </span>
                    <span className="text-[#4DBC1B] text-glow">US</span>
                </motion.h2>
            </div>

            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-32">
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-gray-300 text-base md:text-xl leading-relaxed mb-8"
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

            {/* Timeline — same SVG design on all screen sizes */}
            <div
                className="mx-auto relative px-10 md:px-0"
                style={{
                    height: "clamp(450px, 80vw, 700px)",
                    maxWidth: "min(42rem, calc(100vw - 2rem))",
                    overflow: "visible",
                }}
            >
                <svg
                    viewBox="0 0 600 700"
                    fill="none"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d={TIMELINE_PATH}
                        stroke="rgba(77, 188, 27, 0.08)"
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
                            <circle cx={pos.x} cy={pos.y} r="6" fill="#4DBC1B" opacity="0.15">
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
                                fill="#4DBC1B"
                                filter="url(#dotGlow)"
                            />
                        </g>
                    ))}

                    <defs>
                        <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4DBC1B" />
                            <stop offset="50%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#4DBC1B" />
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
                        className="absolute"
                        style={{
                            left: `${(pos.x / 600) * 100}%`,
                            top: `${(pos.y / 700) * 100}%`,
                            transform: i % 2 === 0 ? "translate(12px, -50%)" : "translate(calc(-100% - 12px), -50%)",
                            // Prevent text from wrapping to keep it compact
                            whiteSpace: "nowrap",
                        }}
                    >
                        <p className="text-white font-bold text-xs md:text-sm">{milestones[i].label}</p>
                        <p className="text-gray-500 text-[10px] md:text-xs">{milestones[i].description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
