"use client";

import { motion } from "framer-motion";
import InfiniteCarousel from "./InfiniteCarousel";

const events = [
    {
        title: "AI Summit 2024",
        subtitle: "Annual Conference",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600",
        desc: "Join industry leaders and researchers for a deep dive into the latest advancements in Artificial Intelligence."
    },
    {
        title: "HPC Workshop",
        subtitle: "Hands-on Training",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
        desc: "Master the art of High Performance Computing with our intensive weekend workshop."
    },
    {
        title: "Hackathon",
        subtitle: "48-Hour Build",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?auto=format&fit=crop&q=80&w=600",
        desc: "Collaborate, innovate, and build amazing projects in our annual 48-hour coding marathon."
    },
    {
        title: "Research Symposium",
        subtitle: "Paper Presentations",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
        desc: "Students and faculty present groundbreaking research papers on cutting-edge topics."
    },
    {
        title: "GPU Programming",
        subtitle: "CUDA Workshop",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
        desc: "Learn to harness the power of GPUs for massive parallel processing tasks."
    },
    {
        title: "Cloud Summit",
        subtitle: "Infrastructure Talk",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
        desc: "Explore the future of cloud infrastructure and scalable solutions."
    },
];

export default function EventsSection() {
    return (
        <section className="relative bg-black py-16 md:py-24 px-4 md:px-8 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    <span className="text-white">LATEST EVENTS </span>
                    <span className="text-[#4DBC1B] text-glow">CONDUCTED</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Exploring the frontiers of technology through workshops, hackathons, and seminars.
                </p>
            </motion.div>

            <div className="max-w-7xl mx-auto">
                <InfiniteCarousel items={events} />
            </div>

            {/* Background elements */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#4DBC1B]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#4DBC1B]/5 rounded-full blur-[80px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
        </section>
    );
}
