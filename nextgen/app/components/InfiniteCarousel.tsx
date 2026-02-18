"use client";

import { motion, useMotionValue, animate, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
    title: string;
    subtitle: string;
    image: string;
    desc?: string;
}

interface InfiniteCarouselProps {
    items: CarouselItem[];
}

export default function InfiniteCarousel({ items }: InfiniteCarouselProps) {
    // Triplicate for infinite illusion
    const [displayItems, setDisplayItems] = useState<CarouselItem[]>([...items, ...items, ...items]);

    // Config
    const GAP = 16;
    const AUTO_DELAY = 1000; // 2 Seconds

    // State
    const [imgWidth, setImgWidth] = useState(600);
    const [containerWidth, setContainerWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(items.length); // Start in middle set
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Update widths on resize
    useEffect(() => {
        const handleResize = () => {
            const newImgWidth = window.innerWidth < 768 ? Math.min(window.innerWidth * 0.75, 350) : 600;
            setImgWidth(newImgWidth);

            if (containerRef.current) {
                const newContainerWidth = containerRef.current.offsetWidth;
                setContainerWidth(newContainerWidth);

                // Immediately snap to correct position for current index without animation to prevent drift
                const centerOffset = newContainerWidth / 2 - newImgWidth / 2;
                const targetX = -(currentIndex * (newImgWidth + GAP)) + centerOffset;
                x.set(targetX);
            }
        };

        // Initial setup
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex, GAP]);

    // Snap to specific slide index
    const snapToSlide = async (index: number, immediate = false) => {
        if (!containerRef.current) return;

        // Caclulate center position
        const centerOffset = containerRef.current.offsetWidth / 2 - imgWidth / 2;
        const targetX = -(index * (imgWidth + GAP)) + centerOffset;

        if (immediate) {
            x.set(targetX);
            setCurrentIndex(index);
        } else {
            setIsAnimating(true);
            await animate(x, targetX, {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
            });
            setIsAnimating(false);
            setCurrentIndex(index);

            // Loop Logic
            if (index < items.length) {
                const newIndex = index + items.length;
                const newTargetX = -(newIndex * (imgWidth + GAP)) + centerOffset;
                x.set(newTargetX);
                setCurrentIndex(newIndex);
            }
            else if (index >= items.length * 2) {
                const newIndex = index - items.length;
                const newTargetX = -(newIndex * (imgWidth + GAP)) + centerOffset;
                x.set(newTargetX);
                setCurrentIndex(newIndex);
            }
        }
    };

    // Auto Play
    useEffect(() => {
        if (isHovered || isAnimating) return;

        const timer = setInterval(() => {
            snapToSlide(currentIndex + 1);
        }, AUTO_DELAY);

        return () => clearInterval(timer);
    }, [isHovered, isAnimating, currentIndex, imgWidth]);

    // Manual Navigation
    const nextSlide = () => snapToSlide(currentIndex + 1);
    const prevSlide = () => snapToSlide(currentIndex - 1);

    return (
        <div
            className="relative w-full h-[550px] md:h-[500px] flex flex-col justify-center overflow-hidden py-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
        >
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 z-10 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

            {/* Track */}
            <motion.div
                className="flex items-center"
                style={{
                    x,
                    gap: GAP,
                }}
            >
                {displayItems.map((item, idx) => (
                    <CarouselCard
                        key={`${idx}-${item.title}`}
                        item={item}
                        width={imgWidth}
                        isCenter={idx === currentIndex}
                    />
                ))}
            </motion.div>

            {/* Navigation Buttons - Bottom on Mobile, Centered Side on Desktop */}
            <button
                onClick={prevSlide}
                className="absolute left-1/3 -translate-x-full bottom-2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-10 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#4DBC1B] flex items-center justify-center bg-black/50 backdrop-blur-sm text-[#4DBC1B] hover:bg-[#4DBC1B] hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(77,188,27,0.2)] group"
            >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-1/3 translate-x-full bottom-2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-10 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#4DBC1B] flex items-center justify-center bg-black/50 backdrop-blur-sm text-[#4DBC1B] hover:bg-[#4DBC1B] hover:text-black hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(77,188,27,0.2)] group"
            >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Progress Dots */}
            <div className="absolute bottom-16 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {items.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-300 ${(currentIndex % items.length) === i
                            ? "w-8 bg-[#4DBC1B] shadow-[0_0_10px_#4DBC1B]"
                            : "w-1.5 bg-white/20"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

// Extracted Card
function CarouselCard({ item, width, isCenter }: { item: CarouselItem, width: number, isCenter: boolean }) {

    return (
        <motion.div
            animate={{
                scale: isCenter ? 1.05 : 0.9,
                opacity: isCenter ? 1 : 0.6,
                zIndex: isCenter ? 10 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{ width }}
            className={`relative group aspect-[16/9] flex-shrink-0 rounded-2xl overflow-hidden border border-[#4DBC1B]/20 bg-[#0a0a0a]`}
        >
            {/* Image */}
            <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-10 group-hover:blur-md"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:bg-black/95" />

            {/* Content Container */}
            <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end group-hover:justify-center group-hover:items-center transition-all duration-500">
                <div className="w-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:text-center">
                    <p className="text-[#4DBC1B] text-xs md:text-sm font-bold tracking-widest uppercase mb-1 md:mb-2 opacity-80 group-hover:opacity-100">
                        {item.subtitle}
                    </p>
                    <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-4 shadow-black drop-shadow-lg leading-tight">
                        {item.title}
                    </h3>

                    {/* Description Reveal */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                        <div className="overflow-hidden">
                            <p className="text-gray-200 text-xs md:text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 leading-relaxed max-w-2xl mx-auto">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active Border Glow */}
            <div className={`absolute inset-0 border-2 border-[#4DBC1B] rounded-2xl transition-opacity duration-300 pointer-events-none ${isCenter ? 'opacity-100 shadow-[0_0_20px_rgba(77,188,27,0.3)]' : 'opacity-0'} group-hover:opacity-100`} />
        </motion.div>
    );
}
