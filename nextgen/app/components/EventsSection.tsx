"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
    { title: "AI Summit 2024", subtitle: "Annual Conference" },
    { title: "HPC Workshop", subtitle: "Hands-on Training" },
    { title: "Hackathon", subtitle: "48-Hour Build" },
    { title: "Research Symposium", subtitle: "Paper Presentations" },
    { title: "GPU Programming", subtitle: "CUDA Workshop" },
    { title: "Cloud Summit", subtitle: "Infrastructure Talk" },
];

export default function EventsSection() {
    const [page, setPage] = useState(0);
    const eventsPerPage = 3;
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const visibleEvents = events.slice(page * eventsPerPage, page * eventsPerPage + eventsPerPage);

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
                    <span className="text-white">LATEST EVENTS </span>
                    <span className="text-[#4ade80] text-glow">CONDUCTED</span>
                </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {visibleEvents.map((event, i) => (
                        <motion.div
                            key={`${event.title}-${page}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(74, 222, 128, 0.2)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative rounded-xl border border-[#4ade80]/20 bg-[#0a0a0a] overflow-hidden mb-4 magnetic-item"
                                style={{ aspectRatio: "4/3" }}
                            >
                                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#4ade80]/40 rounded-tl-xl" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#4ade80]/40 rounded-tr-xl" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#4ade80]/40 rounded-bl-xl" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#4ade80]/40 rounded-br-xl" />
                                <div
                                    className="absolute inset-0 opacity-[0.03]"
                                    style={{
                                        backgroundImage: "linear-gradient(rgba(74,222,128,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.5) 1px, transparent 1px)",
                                        backgroundSize: "25px 25px",
                                    }}
                                />
                                <div className="absolute inset-0 bg-[#4ade80]/0 group-hover:bg-[#4ade80]/[0.03] transition-colors duration-500" />
                            </motion.div>
                            <h3 className="text-white font-bold text-lg">{event.title}</h3>
                            <p className="text-gray-500 text-sm">{event.subtitle}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={page === 0}
                        className="w-8 h-8 rounded-full border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] hover:bg-[#4ade80]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed magnetic-item"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={page === totalPages - 1}
                        className="w-8 h-8 rounded-full border border-[#4ade80]/30 flex items-center justify-center text-[#4ade80] hover:bg-[#4ade80]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed magnetic-item"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </motion.button>
                    <div className="flex gap-2 ml-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === page ? "bg-[#4ade80] w-6" : "bg-gray-600 hover:bg-gray-500"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
