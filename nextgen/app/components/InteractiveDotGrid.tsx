"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    baseX: number;
    baseY: number;
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    size: number;
    alpha: number;
    speed: number;
    offset: number; // For individual wave variance
    direction: number; // -1 for left, 1 for right
}


const PARTICLE_COUNT_DESKTOP = 700;
const PARTICLE_COUNT_MOBILE = 250;
const DOT_COLOR = [77, 188, 27];
const REPULSION_RADIUS = 300;
const REPULSION_STRENGTH = 100;
const ANIMATION_SPEED = 0.05;

export default function InteractiveDotGrid({ startAnimation = false }: { startAnimation?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animFrameRef = useRef<number>(0);
    const sizeRef = useRef({ w: 0, h: 0 });
    const rectRef = useRef<DOMRect | null>(null);

    const buildParticles = useCallback(() => {
        const w = sizeRef.current.w;
        const h = sizeRef.current.h;
        const centerX = w / 2;
        const particles: Particle[] = [];

        // Determine particle count based on width
        const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

        for (let i = 0; i < count; i++) {
            const x = Math.random() * w;
            const y = Math.random() * h;
            const direction = x < centerX ? -1 : 1;

            particles.push({
                baseX: x,
                baseY: y,
                x,
                y,
                targetX: x,
                targetY: y,
                size: Math.random() * 1.5 + 0.5,
                alpha: 0, // Start invisible
                speed: Math.random() * 0.5 + 0.2,
                offset: Math.random() * Math.PI * 2,
                direction,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateSize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement?.getBoundingClientRect();
            // Cache the rect for mouse move calculations
            if (rect) rectRef.current = rect;

            const w = rect?.width || window.innerWidth;
            const h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            sizeRef.current = { w, h };
            buildParticles();
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!rectRef.current && canvas.parentElement) {
                rectRef.current = canvas.parentElement.getBoundingClientRect();
            }
            if (rectRef.current) {
                mouseRef.current = {
                    x: e.clientX - rectRef.current.left,
                    y: e.clientY - rectRef.current.top
                };
            }
        };

        // Update rect on scroll to keep mouse position accurate relative to canvas
        const onScroll = () => {
            if (canvas.parentElement) {
                rectRef.current = canvas.parentElement.getBoundingClientRect();
            }
        };

        let time = 0;

        const animate = () => {
            const w = sizeRef.current.w;
            const h = sizeRef.current.h;
            const centerX = w / 2;

            ctx.clearRect(0, 0, w, h);

            // Only animate/draw if allowed
            if (startAnimation) {
                time += 0.01;
                const mx = mouseRef.current.x;
                const my = mouseRef.current.y;

                particlesRef.current.forEach((p) => {
                    // Determine movement based on direction
                    p.baseX += p.speed * p.direction;

                    // Wrap logic
                    if (p.direction === -1 && p.baseX < -50) {
                        p.baseX = centerX - Math.random() * 50;
                        p.baseY = Math.random() * h;
                    } else if (p.direction === 1 && p.baseX > w + 50) {
                        p.baseX = centerX + Math.random() * 50;
                        p.baseY = Math.random() * h;
                    }

                    // Fluid Wave Motion
                    const cycle = time + p.offset;
                    const waveY = Math.sin(p.baseX * 0.005 + cycle) * 20 +
                        Math.sin(p.baseX * 0.01 + cycle * 0.5) * 10;
                    const waveX = Math.cos(p.baseY * 0.005 + cycle) * 15;

                    let targetX = p.baseX + waveX;
                    let targetY = p.baseY + waveY;

                    // Mouse interaction
                    const dx = targetX - mx;
                    const dy = targetY - my;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < REPULSION_RADIUS) {
                        const t = 1 - dist / REPULSION_RADIUS;
                        const force = t * t * REPULSION_STRENGTH;
                        const angle = Math.atan2(dy, dx);
                        targetX += Math.cos(angle) * force;
                        targetY += Math.sin(angle) * force;
                    }

                    p.x += (targetX - p.x) * ANIMATION_SPEED * 2;
                    p.y += (targetY - p.y) * ANIMATION_SPEED * 2;

                    // Draw ONLY if near cursor
                    if (dist < REPULSION_RADIUS) {
                        const prox = 1 - dist / REPULSION_RADIUS;
                        // Opacity fades out at edge of radius
                        const alpha = prox * 0.6; // Max opacity 0.6
                        const scale = 1 + prox * 1.5;

                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${DOT_COLOR[0]}, ${DOT_COLOR[1]}, ${DOT_COLOR[2]}, ${alpha})`;
                        ctx.fill();
                    }
                });
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        let resizeTimeout: NodeJS.Timeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateSize, 200);
        };

        updateSize();
        window.addEventListener("resize", onResize);
        window.addEventListener("scroll", onScroll);
        document.addEventListener("mousemove", onMouseMove);
        animate();

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
