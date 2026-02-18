"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
    { label: "Quick Links", href: "#" },
    { label: "Live", href: "#" },
    { label: "Resources", href: "#" },
    { label: "Take Notes", href: "#" },
];

export default function Footer() {
    return (
        <footer className="relative bg-black pt-24 md:pt-32 pb-8 px-4 md:px-8 overflow-hidden">
            {/* CTA Area */}
            <div className="max-w-6xl mx-auto mb-24 md:mb-32">
                <div className="flex flex-col md:flex-row items-start justify-between gap-12">
                    {/* Left: Big CTA text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <h2 className="text-3xl md:text-5xl font-black leading-tight">
                            <span className="text-white">Experience power</span>
                            <br />
                            <span className="text-white">like </span>
                            <span className="text-[#4DBC1B] text-glow">NEVER BEFORE</span>
                        </h2>
                    </motion.div>

                    {/* Right: Quick links */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex-shrink-0"
                    >
                        <ul className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <motion.li
                                    key={link.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                                    viewport={{ once: true }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-[#4DBC1B] transition-colors text-sm nav-link-animated magnetic-item"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Large Brand Name */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h3 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-black tracking-tight">
                    <span className="text-[#4DBC1B]">NEXTGEN</span>{" "}
                    <span className="text-white">SuperComputing</span>
                </h3>
            </motion.div>

            {/* Divider */}
            <div className="max-w-6xl mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-[#4DBC1B]/20 to-transparent mb-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs text-gray-600">
                            <span className="text-[#4DBC1B]/60">NEXTGEN</span>{" "}
                            <span className="text-gray-600">SuperComputing</span>
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs text-gray-600">
                            © {new Date().getFullYear()} All rights reserved.
                        </span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
}
