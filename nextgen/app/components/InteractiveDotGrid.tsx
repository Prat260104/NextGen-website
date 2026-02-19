"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    size: number;
    alpha: number;
    speed: number;
    offset: number;
    direction: number;
}

const PARTICLE_COUNT_DESKTOP = 300; // reduced from 500
const PARTICLE_COUNT_MOBILE = 80;   // reduced from 175
const DOT_COLOR = [77, 188, 27];
const REPULSION_RADIUS = 250;       // reduced from 300
const REPULSION_RADIUS_SQ = REPULSION_RADIUS * REPULSION_RADIUS;
const REPULSION_STRENGTH = 90;
const ANIMATION_SPEED = 0.05;

export default function InteractiveDotGrid({ startAnimation = false }: { startAnimation?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const animFrameRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const rectRef = useRef<DOMRect | null>(null);
    const isMobileRef = useRef(false);
    const lastFrameRef = useRef(0);

    const buildParticles = useCallback(() => {
        const { w, h } = sizeRef.current;
        const centerX = w / 2;
        const count = isMobileRef.current ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
        const particles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            particles.push({
                baseX: x, baseY: y, x, y,
                size: Math.random() * 1.5 + 0.5,
                alpha: 0,
                speed: Math.random() * 0.5 + 0.2,
                offset: Math.random() * Math.PI * 2,
                direction: x < centerX ? -1 : 1,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        isMobileRef.current = window.innerWidth < 768;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) rectRef.current = rect;
            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            isMobileRef.current = w < 768;
            buildParticles();
        };

        const onMouseMove = (e: MouseEvent) => {
            if (isMobileRef.current) return;
            if (!rectRef.current && canvas.parentElement) {
                rectRef.current = canvas.parentElement.getBoundingClientRect();
            }
            if (rectRef.current) {
                mouseRef.current = {
                    x: e.clientX - rectRef.current.left,
                    y: e.clientY - rectRef.current.top,
                };
            }
        };

        const onScroll = () => {
            if (canvas.parentElement) {
                rectRef.current = canvas.parentElement.getBoundingClientRect();
            }
        };

        let time = 0;
        // Target 30fps — enough for this ambient effect, halves CPU vs 60fps
        const FRAME_INTERVAL = 1000 / 30;

        const animate = (now: number) => {
            animFrameRef.current = requestAnimationFrame(animate);

            // Throttle to ~30fps
            if (now - lastFrameRef.current < FRAME_INTERVAL) return;
            lastFrameRef.current = now;

            const { w, h } = sizeRef.current;
            const centerX = w / 2;
            if (!startAnimation) {
                // Stop the loop if animation is paused
                // But wait... if we return here, the loop stops? 
                // No, we need to check this *before* requesting next frame or inside the effect dependency
                // Actually, let's just render nothing and not clear if we want to be super efficient, 
                // but we need to clear if we were previously drawing.
                // For now, let's just make it efficient:
                return;
            }

            ctx.clearRect(0, 0, w, h);

            time += 0.015;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const isMobile = isMobileRef.current;

            // Batch all dots into a single path per opacity level for fewer draw calls
            // But since opacity varies per particle, we draw individually — 
            // however we skip sqrt by using squared distance
            const particles = particlesRef.current;
            const len = particles.length;

            for (let i = 0; i < len; i++) {
                const p = particles[i];

                // Move base position
                p.baseX += p.speed * p.direction;
                if (p.direction === -1 && p.baseX < -50) {
                    p.baseX = centerX - Math.random() * 50;
                    p.baseY = Math.random() * h;
                } else if (p.direction === 1 && p.baseX > w + 50) {
                    p.baseX = centerX + Math.random() * 50;
                    p.baseY = Math.random() * h;
                }

                // Wave motion
                const cycle = time + p.offset;
                const waveY = Math.sin(p.baseX * 0.005 + cycle) * 20 +
                    Math.sin(p.baseX * 0.01 + cycle * 0.5) * 10;
                const waveX = Math.cos(p.baseY * 0.005 + cycle) * 15;

                let targetX = p.baseX + waveX;
                let targetY = p.baseY + waveY;

                if (isMobile) {
                    // Mobile: no interaction, just smooth wave
                    p.x += (targetX - p.x) * ANIMATION_SPEED * 2;
                    p.y += (targetY - p.y) * ANIMATION_SPEED * 2;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${DOT_COLOR[0]},${DOT_COLOR[1]},${DOT_COLOR[2]},0.12)`;
                    ctx.fill();
                } else {
                    // Desktop: squared distance — no sqrt needed for culling
                    const dx = targetX - mx;
                    const dy = targetY - my;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < REPULSION_RADIUS_SQ) {
                        // Only compute sqrt when we actually need it (inside radius)
                        const dist = Math.sqrt(distSq);
                        const t = 1 - dist / REPULSION_RADIUS;
                        const force = t * t * REPULSION_STRENGTH;
                        const angle = Math.atan2(dy, dx);
                        targetX += Math.cos(angle) * force;
                        targetY += Math.sin(angle) * force;
                    }

                    p.x += (targetX - p.x) * ANIMATION_SPEED * 2;
                    p.y += (targetY - p.y) * ANIMATION_SPEED * 2;

                    // Only draw particles near cursor — boosted visibility
                    if (distSq < REPULSION_RADIUS_SQ) {
                        const dist = Math.sqrt(distSq);
                        const prox = 1 - dist / REPULSION_RADIUS;
                        const alpha = 0.3 + prox * 0.7; // min 0.3, max 1.0
                        const scale = 1 + prox * 2;     // up to 3x size

                        // Outer glow ring for dots very close to cursor
                        if (prox > 0.6) {
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.size * scale * 2.5, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(${DOT_COLOR[0]},${DOT_COLOR[1]},${DOT_COLOR[2]},${(prox - 0.6) * 0.15})`;
                            ctx.fill();
                        }

                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${DOT_COLOR[0]},${DOT_COLOR[1]},${DOT_COLOR[2]},${alpha})`;
                        ctx.fill();
                    }
                }
            }
        };

        let resizeTimeout: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSize, 200);
        };

        updateSize();
        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("mousemove", onMouseMove, { passive: true });
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            clearTimeout(resizeTimeout);
            window.removeEventListener("resize", onResize);
            window.removeEventListener("scroll", onScroll);
            document.removeEventListener("mousemove", onMouseMove);
        };
    }, [buildParticles, startAnimation]);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
