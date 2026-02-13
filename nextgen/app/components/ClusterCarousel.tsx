"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clusterItems = [
    { title: "GPU Node Alpha", subtitle: "NVIDIA A100 × 8" },
    { title: "GPU Node Beta", subtitle: "NVIDIA H100 × 4" },
    { title: "CPU Cluster", subtitle: "AMD EPYC × 16" },
    { title: "Storage Array", subtitle: "100TB NVMe SSD" },
    { title: "Network Fabric", subtitle: "400Gbps InfiniBand" },
];

export default function ClusterCarousel() {
    const [current, setCurrent] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const prev = () => setCurrent((c) => (c === 0 ? clusterItems.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === clusterItems.length - 1 ? 0 : c + 1));

    const getVisibleIndices = () => {
        const indices = [];
        for (let i = -1; i <= 1; i++) {
            indices.push((current + i + clusterItems.length) % clusterItems.length);
        }
        return indices;
    };

    return (
        <section className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                    <span className="text-white">MEET THE </span>
                    <span className="text-[#4ade80] text-glow">CLUSTER</span>
                </h2>
            </motion.div>

            <div ref={containerRef} className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {getVisibleIndices().map((idx, pos) => {
                                const item = clusterItems[idx];
                                const isCenterCard = pos === 1;
                                return (
                                    <motion.div
                                        key={`${idx}-${item.title}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: isCenterCard ? 1 : 0.6, scale: isCenterCard ? 1 : 0.92 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className={`relative rounded-xl border ${isCenterCard ? "border-[#4ade80]/40" : "border-[#4ade80]/15"} bg-[#0a0a0a] overflow-hidden`}
                                        style={{
                                            aspectRatio: "16/10",
                                            boxShadow: isCenterCard ? "0 0 30px rgba(74, 222, 128, 0.15)" : "none",
                                        }}
                                    >
                                        <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-[#4ade80]/30 rounded-tl-xl" />
                                        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-[#4ade80]/30 rounded-tr-xl" />
                                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-[#4ade80]/30 rounded-bl-xl" />
                                        <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-[#4ade80]/30 rounded-br-xl" />
                                        <div
                                            className="absolute inset-0 opacity-[0.03]"
                                            style={{
                                                backgroundImage: "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)",
                                                backgroundSize: "30px 30px",
                                            }}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div>
                            <p className="text-white font-bold text-lg">{clusterItems[current].title}</p>
                            <p className="text-gray-500 text-sm">{clusterItems[current].subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] hover:bg-[#4ade80]/10 transition-colors magnetic-item"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] hover:bg-[#4ade80]/10 transition-colors magnetic-item"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
