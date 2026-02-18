"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    size: number;
    alpha: number;
    speed: number;
    isLogo: boolean;
    phase: number;
    driftSpeed: number;
}

const BG_COUNT = 80;

function sampleText(
    text: string,
    w: number,
    h: number,
    fontSize: number,
    maxPts = 500
): [number, number][] {
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const c = off.getContext("2d");
    if (!c) return [];

    c.fillStyle = "#fff";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.font = `900 ${fontSize}px "Arial Black", "Impact", sans-serif`;
    c.fillText(text, w / 2, h / 2);

    const img = c.getImageData(0, 0, w, h);
    const pts: [number, number][] = [];

    // Start with a base step, then increase if we'd exceed maxPts
    let step = Math.max(6, Math.round(fontSize / 20));

    // First pass: count how many points we'd get
    let count = 0;
    for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
            if (img.data[(py * w + px) * 4 + 3] > 128) count++;
        }
    }
    // If too many, scale step up proportionally
    if (count > maxPts) {
        step = Math.ceil(step * Math.sqrt(count / maxPts));
    }

    for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
            if (img.data[(py * w + px) * 4 + 3] > 128) {
                pts.push([px, py]);
            }
        }
    }
    return pts;
}

function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef(0);
    const [fadeOut, setFadeOut] = useState(false);
    const completedRef = useRef(false);
    const targetsRef = useRef<{ ng: [number, number][]; full: [number, number][] }>({
        ng: [],
        full: [],
    });

    const init = useCallback((w: number, h: number) => {
        const isMobile = w < 768;

        // On mobile: use larger font so particles sample cleanly (not pixelated)
        // On desktop: use standard proportional sizes
        const ngFontSize = isMobile
            ? Math.min(w * 0.45, h * 0.3)   // e.g. 390px phone → ~175px font
            : Math.min(h * 0.35, w * 0.18);

        const fullFontSize = isMobile
            ? Math.min(w * 0.18, h * 0.12)  // e.g. 390px phone → ~70px font
            : Math.min(h * 0.2, w * 0.08);

        // Cap particles on mobile to prevent lag
        const maxPts = isMobile ? 300 : 600;
        const ng = sampleText("NG", w, h, ngFontSize, maxPts);
        const full = sampleText("NextGen", w, h, fullFontSize, maxPts);

        targetsRef.current = { ng, full };

        // Use whichever has more points
        const logoCount = Math.max(ng.length, full.length);
        const particles: Particle[] = [];

        for (let i = 0; i < logoCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                targetX: 0,
                targetY: 0,
                size: 1.5 + Math.random() * 1.0,
                alpha: 0.6 + Math.random() * 0.4,
                speed: 0.03 + Math.random() * 0.03,
                isLogo: true,
                phase: Math.random() * Math.PI * 2,
                driftSpeed: 0.15 + Math.random() * 0.4,
            });
        }

        // Background particles — fewer on mobile
        const bgCount = isMobile ? 40 : BG_COUNT;
        for (let i = 0; i < bgCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                targetX: 0,
                targetY: 0,
                size: 0.5 + Math.random() * 0.8,
                alpha: 0.03 + Math.random() * 0.06,
                speed: 0,
                isLogo: false,
                phase: Math.random() * Math.PI * 2,
                driftSpeed: 0.1 + Math.random() * 0.3,
            });
        }

        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        init(w, h);

        const start = performance.now();
        const { ng, full } = targetsRef.current;
        const logoCount = Math.max(ng.length, full.length);

        // ═══════════════════════════════════════
        //  15-SECOND CINEMATIC TIMELINE
        // ═══════════════════════════════════════
        //  0   – 2s    ✦ Float (all particles)
        //  2   – 5s    ✦ Converge → "NG"
        //  5   – 7.5s  ✦ Hold "NG" + glow
        //  7.5 – 10.5s ✦ Morph → "NextGen"
        //  10.5– 12.5s ✦ Hold "NextGen" + glow
        //  12.5– 14s   ✦ Collapse inward
        //  14  – 15s   ✦ Fade out
        // ═══════════════════════════════════════

        const animate = (now: number) => {
            const t = (now - start) / 1000;
            ctx.clearRect(0, 0, w, h);

            // Phase progress (0→1)
            const converge = t < 2 ? 0 : easeInOutCubic(Math.min(1, (t - 2) / 3));
            const morph = t < 7.5 ? 0 : easeInOutCubic(Math.min(1, (t - 7.5) / 3));
            const collapse = t < 12.5 ? 0 : easeInOutCubic(Math.min(1, (t - 12.5) / 1.5));

            // Exit
            if (t > 14 && !completedRef.current) {
                completedRef.current = true;
                setFadeOut(true);
                setTimeout(onComplete, 1000);
            }

            // ── Ambient glow when text is formed ──
            const glow = converge * 0.08 * (1 - collapse);
            if (glow > 0.001) {
                const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.35);
                g.addColorStop(0, `rgba(77, 188, 27, ${glow})`);
                g.addColorStop(0.5, `rgba(77, 188, 27, ${glow * 0.15})`);
                g.addColorStop(1, "rgba(77, 188, 27, 0)");
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, w, h);
            }

            // ── Background particles ──
            for (let i = logoCount; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                p.x += Math.cos(p.phase + t * 0.3) * p.driftSpeed;
                p.y += Math.sin(p.phase + t * 0.2) * p.driftSpeed;
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                const pulse = 0.4 + Math.sin(t * 1.5 + p.phase) * 0.6;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(77, 188, 27, ${p.alpha * pulse})`;
                ctx.fill();
            }

            // ── Logo particles ──
            for (let i = 0; i < logoCount; i++) {
                const p = particlesRef.current[i];
                if (!p?.isLogo) continue;

                const ngPt = ng[i % ng.length];
                const fullPt = full[i % full.length];

                // Blend target NG → NextGen
                const tx = morph > 0 ? ngPt[0] + (fullPt[0] - ngPt[0]) * morph : ngPt[0];
                const ty = morph > 0 ? ngPt[1] + (fullPt[1] - ngPt[1]) * morph : ngPt[1];

                if (collapse > 0) {
                    // Collapse to center
                    p.x += (w / 2 - p.x) * collapse * 0.12;
                    p.y += (h / 2 - p.y) * collapse * 0.12;
                } else if (converge > 0) {
                    // Converge toward text position
                    // Use direct lerp — snaps quickly with acceleration
                    const spd = p.speed + converge * converge * 0.15;
                    p.x += (tx - p.x) * spd;
                    p.y += (ty - p.y) * spd;
                } else {
                    // Floating
                    p.x += Math.sin(t * 0.5 + p.phase) * p.driftSpeed;
                    p.y += Math.cos(t * 0.3 + p.phase * 1.4) * p.driftSpeed;
                    if (p.x < -10) p.x = w + 10;
                    if (p.x > w + 10) p.x = -10;
                    if (p.y < -10) p.y = h + 10;
                    if (p.y > h + 10) p.y = -10;
                }

                // Alpha & size
                const fadeA = 1 - collapse;
                const a = converge > 0
                    ? p.alpha * (0.2 + converge * 0.8) * fadeA
                    : p.alpha * 0.1;
                const sz = converge > 0
                    ? p.size * (0.6 + converge * 0.4) * (1 - collapse * 0.5)
                    : p.size * 0.4;

                // Glow halo when formed
                if (converge > 0.8 && collapse === 0) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, sz * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(77, 188, 27, ${(converge - 0.8) * 0.04})`;
                    ctx.fill();
                }

                // Core particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(77, 188, 27, ${a})`;
                ctx.fill();
            }

            // ── Flash at formation moments - REMOVED ──


            animRef.current = requestAnimationFrame(animate);
        };

        animRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animRef.current);
    }, [init, onComplete]);

    return (
        <AnimatePresence>
            {!fadeOut ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[100] bg-black"
                >
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                </motion.div>
            ) : (
                <motion.div
                    key="loader-out"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[100] bg-black"
                >
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
