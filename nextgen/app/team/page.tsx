"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import InteractiveDotGrid from "../components/InteractiveDotGrid";
import { motion } from "framer-motion";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const coreTeam = [
    { name: "Shreya", role: "President", bio: "Leading the vision and strategy for NextGen.", socials: { linkedin: "#" } },
    { name: "Samarth", role: "Vice President", bio: "Ensuring operational excellence and team cohesion.", socials: { linkedin: "#" } },
    { name: "Prateek", role: "Technical Head", bio: "Overseeing technical projects and innovation.", socials: { github: "#", linkedin: "#" } },
    { name: "Vinayank", role: "Technical Head", bio: "Expert in AI/ML architectures and research.", socials: { github: "#" } },
    { name: "Ronak", role: "Technical Head", bio: "Full-stack wizard and systems architect.", socials: { github: "#" } },
    { name: "Ujjawal", role: "PR Head", bio: "Managing public relations and outreach.", socials: { twitter: "#", linkedin: "#" } },
    { name: "Srashti", role: "Event Head", bio: "Organizing hackathons and tech talks.", socials: { linkedin: "#" } },
    { name: "Vidisha", role: "Event Head", bio: "Coordinating logistics and attendee experience.", socials: { linkedin: "#" } },
    { name: "Divyansh", role: "Treasurer", bio: "Managing finances and sponsorships.", socials: { linkedin: "#" } },
    { name: "Preeti", role: "Graphics Head", bio: "Designing our visual identity and assets.", socials: { twitter: "#" } },
];

// Generate Domain Data
const technicalTeam = Array.from({ length: 20 }).map((_, i) => ({
    name: `Tech Member ${i + 1}`,
    role: "Technical Team",
    bio: "Building widely scalable systems.",
    socials: { github: "#", linkedin: "#" }
}));

const eventTeam = Array.from({ length: 10 }).map((_, i) => ({
    name: `Event Member ${i + 1}`,
    role: "Event Team",
    bio: "Orchestrating memorable experiences.",
    socials: { linkedin: "#" }
}));

const prTeam = Array.from({ length: 10 }).map((_, i) => ({
    name: `PR Member ${i + 1}`,
    role: "PR Team",
    bio: "Amplifying our voice and reach.",
    socials: { twitter: "#", linkedin: "#" }
}));

const graphicsTeam = Array.from({ length: 10 }).map((_, i) => ({
    name: `Design Member ${i + 1}`,
    role: "Graphics Team",
    bio: "Crafting our visual identity.",
    socials: { twitter: "#" }
}));

const domains = [
    { id: "technical", title: "Technical Domain", members: technicalTeam, color: "from-blue-500/20 to-cyan-500/20", borderColor: "group-hover:border-cyan-500/50" },
    { id: "event", title: "Event Management", members: eventTeam, color: "from-purple-500/20 to-pink-500/20", borderColor: "group-hover:border-purple-500/50" },
    { id: "pr", title: "Public Relations", members: prTeam, color: "from-orange-500/20 to-red-500/20", borderColor: "group-hover:border-orange-500/50" },
    { id: "graphics", title: "Graphics & Design", members: graphicsTeam, color: "from-green-500/20 to-emerald-500/20", borderColor: "group-hover:border-[#4DBC1B]/50" },
];

function DomainSection({ title, members, color, borderColor }: { title: string, members: any[], color: string, borderColor: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8 w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 md:p-8 transition-all duration-300 hover:bg-white/5 ${borderColor}`}
            >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex flex-col items-start gap-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors">
                            {title}
                        </h3>
                        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                            {members.length} Members
                        </span>
                    </div>

                    <div className={`p-3 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/10" : ""}`}>
                        <ChevronDown className="w-6 h-6 text-white" />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {members.map((member, index) => (
                                <TeamMemberCard
                                    key={index}
                                    {...member}
                                    delay={index * 0.05}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function TeamPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#4DBC1B]/30 relative">
            <Navbar />

            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <InteractiveDotGrid startAnimation={true} />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-40 pb-16 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        Meet the <span className="text-[#4DBC1B] text-glow">Team</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The brilliant minds driving innovation at NextGen.
                    </p>
                </motion.div>
            </section>

            {/* Core Team Grid */}
            <section className="relative z-10 px-4 md:px-12 pb-20 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#4DBC1B]/50"></div>
                    <h2 className="text-3xl font-bold text-white tracking-widest uppercase">Core Team</h2>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#4DBC1B]/50"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                    {coreTeam.map((member, index) => (
                        <TeamMemberCard
                            key={index}
                            {...member}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </section>

            {/* Domain Sections */}
            <section className="relative z-10 px-4 md:px-12 pb-32 max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-px flex-1 bg-white/20"></div>
                    <h2 className="text-2xl font-bold text-gray-400 tracking-widest uppercase">Domains</h2>
                    <div className="h-px flex-1 bg-white/20"></div>
                </div>

                <div className="flex flex-col gap-4">
                    {domains.map((domain) => (
                        <DomainSection
                            key={domain.id}
                            title={domain.title}
                            members={domain.members}
                            color={domain.color}
                            borderColor={domain.borderColor}
                        />
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
