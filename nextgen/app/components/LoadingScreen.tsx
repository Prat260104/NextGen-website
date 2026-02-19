"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Mobile Loading Screen ────────────────────────────────────────────────────
function MobileLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"ng" | "nextgen" | "done">("ng");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("nextgen"), 3000);
        const t2 = setTimeout(() => {
            setPhase("done");
            setTimeout(onComplete, 600);
        }, 7000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    key="mobile-loader"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6"
                >
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4DBC1B]/10 rounded-full blur-[40px]" />
                    </div>

                    <AnimatePresence mode="wait">
                        {phase === "ng" ? (
                            <motion.p
                                key="ng"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="font-black tracking-tighter leading-none"
                                style={{
                                    fontSize: "clamp(5rem, 30vw, 10rem)",
                                    color: "#4DBC1B",
                                    textShadow: "0 0 40px rgba(77,188,27,0.5), 0 0 80px rgba(77,188,27,0.2)",
                                }}
                            >
                                NG
                            </motion.p>
                        ) : (
                            <motion.div
                                key="nextgen"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center px-8"
                            >
                                <p
                                    className="font-black tracking-tight leading-none"
                                    style={{
                                        fontSize: "clamp(2.5rem, 16vw, 5rem)",
                                        color: "white",
                                        textShadow: "0 0 30px rgba(77,188,27,0.3)",
                                    }}
                                >
                                    Next<span style={{ color: "#4DBC1B" }}>Gen</span>
                                </p>
                                <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mt-2">SuperComputing</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="w-32 h-px bg-white/10 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-[#4DBC1B] rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 7, ease: "linear" }}
                        />
                    </div>

                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#4DBC1B]"
                            style={{
                                width: 2 + (i % 3), height: 2 + (i % 3),
                                left: `${10 + (i * 7.5) % 80}%`,
                                top: `${15 + (i * 11) % 70}%`,
                                opacity: 0.15 + (i % 4) * 0.08,
                            }}
                            animate={{ y: [0, -12, 0], opacity: [0.1, 0.4, 0.1] }}
                            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── Desktop Loading Screen (CSS-only, cinematic) ─────────────────────────────
function DesktopLoader({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<"ng" | "nextgen" | "done">("ng");

    useEffect(() => {
        const t1 = setTimeout(() => setPhase("nextgen"), 4000);
        const t2 = setTimeout(() => {
            setPhase("done");
            setTimeout(onComplete, 800);
        }, 9000);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== "done" && (
                <motion.div
                    key="desktop-loader"
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-8 overflow-hidden"
                >
                    {/* Ambient radial glow */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "nextgen" ? 1 : 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4DBC1B]/8 rounded-full blur-[60px]" />
                    </motion.div>

                    {/* Scanline overlay for cinematic feel */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(77,188,27,0.5) 2px, rgba(77,188,27,0.5) 3px)",
                        }}
                    />

                    {/* Main text */}
                    <AnimatePresence mode="wait">
                        {phase === "ng" ? (
                            <motion.div
                                key="ng"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20, scale: 1.05 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="text-center relative"
                            >
                                {/* Glitch lines */}
                                <motion.p
                                    className="font-black tracking-tighter leading-none select-none"
                                    style={{
                                        fontSize: "clamp(8rem, 18vw, 18rem)",
                                        color: "#4DBC1B",
                                        textShadow: "0 0 60px rgba(77,188,27,0.4), 0 0 120px rgba(77,188,27,0.15)",
                                    }}
                                    animate={{
                                        textShadow: [
                                            "0 0 60px rgba(77,188,27,0.4), 0 0 120px rgba(77,188,27,0.15)",
                                            "0 0 80px rgba(77,188,27,0.6), 0 0 160px rgba(77,188,27,0.25)",
                                            "0 0 60px rgba(77,188,27,0.4), 0 0 120px rgba(77,188,27,0.15)",
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    NG
                                </motion.p>
                                <motion.p
                                    className="text-gray-600 text-xs tracking-[0.5em] uppercase mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Initializing
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="nextgen"
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="text-center relative"
                            >
                                <motion.p
                                    className="font-black tracking-tight leading-none select-none"
                                    style={{
                                        fontSize: "clamp(4rem, 10vw, 9rem)",
                                        color: "white",
                                        textShadow: "0 0 40px rgba(77,188,27,0.2)",
                                    }}
                                >
                                    Next<span style={{ color: "#4DBC1B", textShadow: "0 0 40px rgba(77,188,27,0.5)" }}>Gen</span>
                                </motion.p>
                                <motion.p
                                    className="text-gray-500 tracking-[0.4em] uppercase mt-3"
                                    style={{ fontSize: "0.7rem" }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    SuperComputing
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Progress bar */}
                    <div className="w-48 h-px bg-white/8 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ background: "linear-gradient(90deg, #4DBC1B, #22d3ee)" }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 6.5, ease: "linear" }}
                        />
                    </div>

                    {/* Corner decorations */}
                    {[
                        "top-8 left-8 border-t border-l",
                        "top-8 right-8 border-t border-r",
                        "bottom-8 left-8 border-b border-l",
                        "bottom-8 right-8 border-b border-r",
                    ].map((cls, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-8 h-8 border-[#4DBC1B]/30 ${cls}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        />
                    ))}

                    {/* Floating ambient dots */}
                    {[...Array(16)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-[#4DBC1B]"
                            style={{
                                width: 1.5 + (i % 3),
                                height: 1.5 + (i % 3),
                                left: `${5 + (i * 6) % 90}%`,
                                top: `${10 + (i * 9) % 80}%`,
                            }}
                            animate={{
                                y: [0, -(10 + i % 8), 0],
                                opacity: [0.08, 0.3, 0.08],
                            }}
                            transition={{
                                duration: 2.5 + (i % 4) * 0.5,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    if (isMobile === null) return <div className="fixed inset-0 z-[100] bg-black" />;

    return isMobile
        ? <MobileLoader onComplete={onComplete} />
        : <DesktopLoader onComplete={onComplete} />;
}
