"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Zap, Cpu, FileText, Database, Play
} from "lucide-react";
import dynamic from "next/dynamic";


// Dynamically import ThreeSphere with no SSR to avoid canvas issues
const ThreeSphere = dynamic(() => import("./SphereAnimation"), { ssr: false });

const features = [
    { icon: Zap, label: "Fast\nTraining" },
    { icon: Cpu, label: "Smart\nPredictions" },
    { icon: FileText, label: "Real\nData Ready" },
    { icon: Database, label: "Research\nReady" },
];

export default function RivaSection() {
    return (
        <section id="riva" className="relative bg-black text-white pt-0 pb-24 px-4 md:px-8 overflow-hidden min-h-[80vh] flex flex-col justify-center items-center">

            {/* Background 01 */}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] md:text-[450px] font-bold text-white/[0.2] select-none pointer-events-none leading-none z-0 tracking-tighter">
                01
            </div>

            <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">

                {/* Left Text */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-3 text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left order-2 md:order-1"
                >
                    <p className="max-w-xs mx-auto md:mx-0">
                        Riva is our in-house machine learning model designed to explore real-world datasets,
                        automate workflows, and power student research.
                    </p>
                </motion.div>

                {/* Center Content */}
                <div className="md:col-span-6 relative flex flex-col items-center justify-center order-1 md:order-2 h-[700px]">

                    {/* Ring Visual Layer - Behind Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center z-0 pointer-events-none">
                        <div className="w-[850px] h-[850px] opacity-70">
                            <ThreeSphere />
                        </div>
                    </div>

                    {/* Typography Layer */}
                    <div className="relative z-10 flex flex-col items-center mb-10 pointer-events-none">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-white font-bold tracking-[0.2em] text-lg md:text-xl mb-[-10px] z-20"
                        >
                            MEET
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-7xl md:text-[150px] font-black text-white/90 tracking-tighter leading-none z-10"
                            style={{
                                textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(77, 188, 27, 0.4)"
                            }}
                        >
                            RIVA
                        </motion.h2>
                    </div>
                </div>

                {/* Right Text */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="md:col-span-3 text-center md:text-right order-3"
                >
                    <div className="max-w-xs mx-auto md:ml-auto">
                        <h3 className="text-white font-bold tracking-widest text-lg mb-2">TRAIN. TEST. DEPLOY.</h3>
                        <p className="text-gray-400 text-sm">Optimised for experimentation and rapid prototyping</p>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 w-full max-w-[1400px] mt-12">

                {/* Slogan */}
                <div className="flex flex-col items-center justify-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-white font-bold text-lg tracking-widest mb-10 text-center uppercase"
                    >
                        From data to decisions in seconds
                    </motion.p>
                </div>

                {/* Footer Grid */}
                <div className="flex flex-col md:flex-row items-end justify-between px-4 gap-12 md:gap-0">

                    {/* Icons */}
                    <div className="flex gap-10 mx-auto md:mx-0">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex flex-col items-center text-center gap-4 group"
                            >
                                <feature.icon className="w-8 h-8 text-[#4DBC1B] group-hover:scale-110 transition-transform" />
                                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed group-hover:text-white transition-colors">
                                    {feature.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* View Demo Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="hidden md:block relative group cursor-pointer"
                    >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4DBC1B] to-[#22d3ee] rounded-lg blur opacity-20 group-hover:opacity-50 transition duration-500" />
                        <div className="relative w-[300px] h-[160px] bg-black border border-[#4DBC1B]/50 rounded-lg flex items-center justify-center overflow-hidden">
                            {/* Technical markings */}
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-1 h-1 bg-[#4DBC1B] rounded-full" />
                                <div className="w-1 h-1 bg-[#4DBC1B]/50 rounded-full" />
                            </div>
                            <div className="absolute bottom-2 left-2 flex gap-1">
                                <div className="w-1 h-1 bg-[#4DBC1B] rounded-full" />
                                <div className="w-1 h-1 bg-[#4DBC1B]/50 rounded-full" />
                            </div>

                            {/* Corner brackets */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4DBC1B] rounded-tl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4DBC1B] rounded-br-lg" />

                            <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase group-hover:text-[#4DBC1B] transition-colors">
                                View Demo
                            </span>

                            <div className="w-16 h-16 rounded-full border border-[#4DBC1B]/30 flex items-center justify-center group-hover:border-[#4DBC1B] group-hover:scale-110 transition-all duration-300">
                                <Play className="w-6 h-6 text-[#4DBC1B] fill-[#4DBC1B] ml-1" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
