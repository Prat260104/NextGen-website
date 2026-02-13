"use client";

import { motion } from "framer-motion";

export default function ViewportGlow() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9990]">
            {/* Top glow */}
            <motion.div
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 right-0 h-[200px]"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(74,222,128,0.12) 0%, transparent 70%)",
                }}
            />
            {/* Bottom glow */}
            <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 right-0 h-[200px]"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(96,165,250,0.1) 0%, transparent 70%)",
                }}
            />
            {/* Left glow */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-0 bottom-0 left-0 w-[200px]"
                style={{
                    background:
                        "radial-gradient(ellipse 100% 60% at 0% 50%, rgba(74,222,128,0.08) 0%, transparent 70%)",
                }}
            />
            {/* Right glow */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                className="absolute top-0 bottom-0 right-0 w-[200px]"
                style={{
                    background:
                        "radial-gradient(ellipse 100% 60% at 100% 50%, rgba(96,165,250,0.08) 0%, transparent 70%)",
                }}
            />
        </div>
    );
}
