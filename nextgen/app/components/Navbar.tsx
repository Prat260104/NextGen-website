"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const navLinks = [
    { name: "Luna", href: "#luna" },
    { name: "About Us", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Events", href: "#events" },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const lastScrollY = useRef(0);
    const [ready, setReady] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (!ready) return;
        const diff = latest - lastScrollY.current;
        if (diff > 5 && latest > 100) {
            setHidden(true);
        } else if (diff < -5) {
            setHidden(false);
        }
        setScrolled(latest > 50);
        lastScrollY.current = latest;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setHidden(false);
            setReady(true);
        }, 4200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{
                y: hidden ? -100 : 0,
                opacity: hidden ? 0 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 transition-colors duration-500 ${scrolled
                    ? "bg-black/80 backdrop-blur-xl shadow-[0_1px_0_rgba(77,188,27,0.1)]"
                    : "bg-black/30 backdrop-blur-md"
                }`}
        >
            <Link href="/" className="text-lg font-bold tracking-tight">
                <span className="text-[#4DBC1B]">NEXTGEN</span>{" "}
                <span className="text-white">SuperComputing</span>
            </Link>

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

            <Link
                href="/contact"
                className="px-5 py-2 text-sm font-medium text-[#4DBC1B] border border-[#4DBC1B]/60 rounded-full hover:bg-[#4DBC1B]/10 hover:border-[#4DBC1B] hover:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300"
            >
                Contact Us
            </Link>
        </motion.nav>
    );
}
