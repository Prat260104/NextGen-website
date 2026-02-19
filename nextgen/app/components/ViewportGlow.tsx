"use client";

import { motion } from "framer-motion";

export default function ViewportGlow() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9990]">
            <div className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden">
                {/* Unified ambient glow - Top/Bottom */}
                <motion.div
                    animate={{ opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full will-change-[opacity]"
                    style={{
                        background: `
                        radial-gradient(circle at 50% 0%, rgba(77,188,27,0.08) 0%, transparent 50%),
                        radial-gradient(circle at 50% 100%, rgba(96,165,250,0.08) 0%, transparent 50%)
                    `,
                    }}
                />
            </div>
        </div>
    );
}
