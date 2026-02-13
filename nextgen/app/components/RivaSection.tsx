"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
    Shield, Brain, Type, BarChart3, Code2, Terminal, Paintbrush, Music,
} from "lucide-react";

const featureIcons = [
    { icon: Shield, label: "Security" },
    { icon: Brain, label: "AI" },
    { icon: Type, label: "NLP" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Code2, label: "Code" },
    { icon: Terminal, label: "Terminal" },
    { icon: Paintbrush, label: "Creative" },
    { icon: Music, label: "Audio" },
];

function WireframeSphere() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const size = 500;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cx = size / 2;
        const cy = size / 2;
        const radius = size * 0.4;

        let angle = 0;

        const drawEllipse = (rotX: number, rotY: number, alpha: number) => {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = "#4ade80";
            ctx.lineWidth = 0.8;
            ctx.beginPath();

            for (let t = 0; t <= Math.PI * 2; t += 0.02) {
                const x = radius * Math.cos(t);
                const y = radius * Math.sin(t);

                const cosRX = Math.cos(rotX);
                const sinRX = Math.sin(rotX);
                const y1 = y * cosRX;
                const z1 = y * sinRX;

                const cosRY = Math.cos(rotY);
                const sinRY = Math.sin(rotY);
                const x2 = x * cosRY + z1 * sinRY;

                const px = cx + x2;
                const py = cy + y1;

                if (t === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, size, size);
            angle += 0.004;

            for (let i = 0; i < 12; i++) {
                const rot = (i / 12) * Math.PI + angle;
                drawEllipse(0, rot, 0.25);
            }

            for (let i = 1; i < 8; i++) {
                const tilt = (i / 8) * Math.PI - Math.PI / 2;
                drawEllipse(tilt, angle * 0.5, 0.2);
            }

            ctx.save();
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = "#4ade80";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.ellipse(cx, cy, radius, radius * Math.abs(Math.cos(angle * 0.5)), 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            animRef.current = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 500, height: 500, opacity: 0.6 }}
        />
    );
}

export default function RivaSection() {
    return (
        <section className="relative bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">
            <div className="relative flex items-center justify-center mb-16" style={{ minHeight: "400px" }}>
                <WireframeSphere />
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="relative z-10 text-4xl md:text-6xl font-black tracking-tight text-center"
                >
                    <span className="text-white">TAKE A LOOK AT </span>
                    <span className="text-[#4ade80] text-glow">RIVA</span>
                </motion.h2>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto mb-12"
            >
                <div
                    className="relative rounded-2xl border border-[#4ade80]/30 bg-black/50 backdrop-blur-sm overflow-hidden"
                    style={{
                        boxShadow: "0 0 30px rgba(74, 222, 128, 0.15), inset 0 0 30px rgba(74, 222, 128, 0.05)",
                        aspectRatio: "16/9",
                    }}
                >
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#4ade80]/50 rounded-tl-2xl" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#4ade80]/50 rounded-tr-2xl" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#4ade80]/50 rounded-bl-2xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#4ade80]/50 rounded-br-2xl" />

                    <motion.div
                        animate={{ y: ["-100%", "400%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent"
                    />

                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: "linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-[#4ade80]/40 text-lg font-mono"
                        >
                            RIVA v2.0 — AI Interface
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto mb-16"
            >
                <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
                    {featureIcons.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.08, type: "spring", stiffness: 200 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.2, backgroundColor: "rgba(74, 222, 128, 0.15)" }}
                                className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#4ade80]/20 flex items-center justify-center bg-[#4ade80]/5 transition-all cursor-pointer magnetic-item"
                                title={item.label}
                            >
                                <Icon className="w-5 h-5 md:w-6 md:h-6 text-[#4ade80]/70" />
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
            >
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    Riva is our in-house AI model built by students to power research,
                    projects, and experimentation. From computer vision to generative AI,
                    Riva helps members turn ideas into real systems.
                </p>
            </motion.div>
        </section>
    );
}
