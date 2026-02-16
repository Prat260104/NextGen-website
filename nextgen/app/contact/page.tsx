"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hoveredLetterIndex, setHoveredLetterIndex] = useState<number | null>(null);

    const ref = useRef<HTMLDivElement>(null);
    const watermarkRef = useRef<HTMLDivElement>(null);
    const letterRefs = useRef<(HTMLDivElement | null)[]>([]);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const watermarkText = "CONTACT";

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setSubmitted(false), 5000);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let hoveredIndex: number | null = null;

            letterRefs.current.forEach((letterRef, index) => {
                if (letterRef) {
                    const rect = letterRef.getBoundingClientRect();
                    if (
                        e.clientX >= rect.left &&
                        e.clientX <= rect.right &&
                        e.clientY >= rect.top &&
                        e.clientY <= rect.bottom
                    ) {
                        hoveredIndex = index;
                    }
                }
            });

            setHoveredLetterIndex(hoveredIndex);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const contactMethods = [
        {
            icon: Mail,
            label: "Email",
            value: "contact@nextgensupercomputing.org",
            href: "mailto:contact@nextgensupercomputing.org",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Your School/University",
            href: "#",
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            value: "NextGen SuperComputing",
            href: "https://linkedin.com",
        },
        {
            icon: Github,
            label: "GitHub",
            value: "nextgen-supercomputing",
            href: "https://github.com",
        },
    ];

    return (
        <>
            <Navbar ready={true} />
            <main className="bg-black text-white">
                {/* Hero Section */}
                <section className="relative pt-32 px-4 md:px-8 overflow-hidden">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute top-20 left-10 w-96 h-96 bg-[#4DBC1B]/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#4DBC1B]/5 rounded-full blur-3xl" />
                    </div>

                    {/* Background Text Watermark */}
                    <div
                        ref={watermarkRef}
                        className="relative flex items-center justify-center mb-12 md:mb-16"
                    >
                        <div className="flex text-[14rem] md:text-[20rem] lg:text-[21rem] font-black leading-none tracking-tighter select-none whitespace-nowrap">
                            {watermarkText.split("").map((letter, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        letterRefs.current[index] = el;
                                    }}
                                    className={`relative transition-all duration-200 ${
                                        hoveredLetterIndex === index
                                            ? "text-[#4DBC1B]/60 drop-shadow-[0_0_20px_rgba(77,188,27,0.4)] scale-125"
                                            : "text-[#4DBC1B]/8 scale-100"
                                    }`}
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Get In Touch Section */}
                    <div ref={ref} className="max-w-4xl mx-auto text-center pb-16 md:pb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
                                <span className="text-white">Get In </span>
                                <span className="text-[#4DBC1B] text-glow">Touch</span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                                Have a question or want to collaborate? We&apos;d love to hear from you.
                                Reach out to our team and let&apos;s build the future together.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Content */}
                <section className="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                    <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20 relative z-20">
                        {/* Contact Methods */}
                        <div className="md:col-span-1 space-y-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                                <span className="text-[#4DBC1B]">Contact</span> Methods
                            </h2>

                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={index}
                                    href={method.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group flex items-start gap-4 p-4 rounded-lg hover:bg-[#4DBC1B]/5 transition-colors duration-300"
                                >
                                    <div className="p-3 rounded-lg bg-[#4DBC1B]/10 group-hover:bg-[#4DBC1B]/20 transition-colors">
                                        <method.icon className="w-6 h-6 text-[#4DBC1B]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{method.label}</p>
                                        <p className="text-base font-medium text-white group-hover:text-[#4DBC1B] transition-colors">
                                            {method.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="md:col-span-2 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="bg-linear-to-br from-[#4DBC1B]/5 to-transparent border border-[#4DBC1B]/20 rounded-2xl p-8 md:p-12"
                            >
                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4DBC1B]/20 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-[#4DBC1B] flex items-center justify-center">
                                                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                        <p className="text-gray-300">
                                            Thank you for reaching out. We&apos;ll get back to you soon.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg bg-black border border-[#4DBC1B]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DBC1B] focus:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg bg-black border border-[#4DBC1B]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DBC1B] focus:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-black border border-[#4DBC1B]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DBC1B] focus:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300"
                                                placeholder="How can we help?"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="w-full px-4 py-3 rounded-lg bg-black border border-[#4DBC1B]/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#4DBC1B] focus:shadow-[0_0_20px_rgba(77,188,27,0.3)] transition-all duration-300 resize-none"
                                                placeholder="Tell us more..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full px-6 py-3 bg-[#4DBC1B] text-black font-semibold rounded-lg hover:bg-[#5AC626] hover:shadow-[0_0_30px_rgba(77,188,27,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            {loading ? "Sending..." : "Send Message"}
                                        </button>
                                    </form>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Additional Info Section */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-linear-to-r from-[#4DBC1B]/10 to-transparent border border-[#4DBC1B]/20 rounded-2xl p-8 md:p-12 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            Join Our <span className="text-[#4DBC1B]">Community</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Whether you&apos;re interested in supercomputing, AI, or just curious about what we do,
                            there&apos;s a place for you in NextGen SuperComputing.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-[#4DBC1B] text-black font-semibold rounded-full hover:shadow-[0_0_30px_rgba(77,188,27,0.4)] transition-all duration-300"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </section>

                <Footer />
            </main>
        </>
    );
}
