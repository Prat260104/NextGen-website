"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, User } from "lucide-react";
import Image from "next/image";

interface TeamMemberProps {
    name: string;
    role: string;
    image?: string;
    bio: string;
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
    };
    delay?: number;
}

export default function TeamMemberCard({ name, role, image, bio, socials, delay = 0 }: TeamMemberProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-3 md:p-6 overflow-hidden hover:border-[#4DBC1B]/50 transition-colors duration-300"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#4DBC1B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Image Container */}
                <div className="relative w-20 h-20 md:w-32 md:h-32 mb-3 md:mb-6 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#4DBC1B] transition-colors duration-300 bg-gray-900">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-700 group-hover:text-[#4DBC1B] transition-colors">
                            <User className="w-12 h-12 md:w-16 md:h-16" />
                        </div>
                    )}
                </div>

                <h3 className="text-sm md:text-xl font-bold text-white mb-1 group-hover:text-[#4DBC1B] transition-colors leading-tight">
                    {name}
                </h3>
                <p className="text-xs md:text-sm text-[#4DBC1B] mb-3 md:mb-4 font-medium tracking-wide uppercase">
                    {role}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed mb-3 md:mb-6 line-clamp-3 md:line-clamp-none">
                    {bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-2 md:gap-4">
                    {socials?.github && (
                        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <Github className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    )}
                    {socials?.linkedin && (
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0077b5] transition-colors">
                            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    )}
                    {socials?.twitter && (
                        <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1DA1F2] transition-colors">
                            <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
