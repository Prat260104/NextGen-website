"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const navLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
];

export default function Navbar({ ready: parentReady = true }: { ready?: boolean }) {
    const [hidden, setHidden] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const [scrollReady, setScrollReady] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!scrollReady) return;
        const diff = latest - lastScrollY.current;
        if (diff > 5 && latest > 100) {
            setHidden(true);
            setMobileMenuOpen(false); // Close menu on scroll down
        } else if (diff < -5) {
            setHidden(false);
        }
        setScrolled(latest > 50);
        lastScrollY.current = latest;
    });

    useEffect(() => {
        if (!parentReady) return;
        const timer = setTimeout(() => {
            setHidden(false);
            setScrollReady(true);
        }, 3500);
        return () => clearTimeout(timer);
    }, [parentReady]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: hidden ? -100 : 0,
                    opacity: hidden ? 0 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-colors duration-500 ${scrolled || mobileMenuOpen
                    ? "bg-black/80 backdrop-blur-xl shadow-[0_1px_0_rgba(77,188,27,0.1)]"
                    : "bg-black/30 backdrop-blur-md"
                    }`}
            >
                <Link href="/" className="text-base md:text-lg font-bold tracking-tight z-50 relative">
                    <span className="text-[#4DBC1B]">NEXTGEN</span>{" "}
                    <span className="text-white hidden sm:inline">SuperComputing</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#4DBC1B] transition-colors px-4 py-2 rounded-md group"
                        >
                            {link.name}
                            <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:block">
                    <Link
                        href="/contact"
                        className="px-5 py-2 text-sm font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 relative text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden flex flex-col items-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-2xl font-bold text-gray-300 hover:text-[#4DBC1B] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-8 py-3 text-lg font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 transition-all"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
