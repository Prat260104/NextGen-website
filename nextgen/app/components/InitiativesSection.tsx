"use client";

import { motion } from "framer-motion";

const initiatives = [
    {
        title: "INITIATIVE 1",
        description:
            "Building next-generation computing infrastructure for student researchers and engineers to push the boundaries of what's possible.",
    },
    {
        title: "INITIATIVE 2",
        description:
            "Developing scalable AI pipelines that enable rapid experimentation and deployment of machine learning models at scale.",
    },
    {
        title: "INITIATIVE 3",
        description:
            "Creating open-source tools and frameworks for the high-performance computing community to accelerate scientific discovery.",
    },
];

export default function InitiativesSection() {
    return (
        <section className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                    <span className="text-white">WHAT WE&apos;RE </span>
                    <span className="text-[#4ade80] text-glow">WORKING ON</span>
                </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
                {initiatives.map((initiative, i) => {
                    const isReversed = i % 2 !== 0;
                    return (
                        <motion.div
                            key={initiative.title}
                            initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true, amount: 0.3 }}
                            className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
                        >
                            <div className={`flex-1 ${isReversed ? "md:text-right" : "md:text-left"}`}>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{initiative.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{initiative.description}</p>
                            </div>

                            <div className="flex-1 w-full">
                                <motion.div
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(74, 222, 128, 0.2)" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="relative rounded-xl border border-[#4ade80]/20 bg-[#0a0a0a] overflow-hidden magnetic-item"
                                    style={{ aspectRatio: "16/10" }}
                                >
                                    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4ade80]/40 rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#4ade80]/40 rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#4ade80]/40 rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4ade80]/40 rounded-br-xl" />
                                    <div
                                        className="absolute inset-0 opacity-[0.03]"
                                        style={{
                                            backgroundImage: "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)",
                                            backgroundSize: "30px 30px",
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
