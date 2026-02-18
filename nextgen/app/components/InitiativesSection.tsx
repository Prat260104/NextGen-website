"use client";

import { motion } from "framer-motion";

const initiatives = [
    {
        id: "01",
        title: "Innovation",
        description: "Pushing the boundaries of AI with student-led research in computer vision, NLP, and generative models.",
        align: "right"
    },
    {
        id: "02",
        title: "Collaboration",
        description: "Open-sourcing our tools to build a global community of developers and researchers working together.",
        align: "left"
    },
    {
        id: "03",
        title: "Education",
        description: "Empowering the next generation through hands-on workshops, hackathons, and mentorship programs.",
        align: "right"
    }
];

export default function WorkingOnSection() {
    return (
        <section className="relative bg-black py-32 px-4 md:px-8 overflow-hidden min-h-screen flex flex-col justify-center">

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-32 uppercase tracking-widest font-bold text-xl md:text-3xl"
                >
                    <span className="text-white">What We're </span>
                    <span className="text-[#4DBC1B]">Working On</span>
                </motion.h2>

                <div className="flex flex-col gap-24 md:gap-40 relative">
                    {/* Vertical connecting line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4DBC1B]/20 to-transparent hidden md:block" />

                    {initiatives.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col md:flex-row items-center relative ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                        >
                            {/* Number Background - Centered behind content or to side */}
                            <div className={`absolute top-1/2 -translate-y-1/2 ${index % 2 === 0 ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} z-0 pointer-events-none hidden md:block`}>
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 0.1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-[300px] font-black text-gray-500 leading-none select-none"
                                >
                                    {index + 1}
                                </motion.span>
                            </div>

                            {/* Empty space / Alignment */}
                            <div className="flex-1 hidden md:block" />

                            {/* Content Box */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="flex-1 relative z-10 w-full md:w-auto"
                            >
                                <div
                                    className="relative p-6 md:p-10 border border-[#4DBC1B] rounded-none bg-black group hover:bg-[#4DBC1B]/10 transition-colors duration-500"
                                    style={{
                                        boxShadow: "0 0 0 1px rgba(77, 188, 27, 0.2)"
                                    }}
                                >
                                    {/* Outline style from reference */}
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#4DBC1B] bg-black" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#4DBC1B] bg-black" />
                                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#4DBC1B] bg-black" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#4DBC1B] bg-black" />

                                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 group-hover:text-[#4DBC1B] transition-colors uppercase tracking-tighter">{item.title}</h3>
                                    <p className="text-gray-400 text-base leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
