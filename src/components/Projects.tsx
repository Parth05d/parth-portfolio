"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Project {
    title: string;
    description: string;
    tags: string[];
    color: string;
    link: string;
}

const projects: Project[] = [
    {
        title: "ISL Connect",
        description:
            "An AI-powered Indian Sign Language recognition system using LSTM neural networks and MediaPipe hand tracking for real-time gesture-to-text translation.",
        tags: ["Python", "TensorFlow", "MediaPipe", "React", "Flask"],
        color: "#a78bfa",
        link: "https://isl-deployment.vercel.app/",
    },
    {
        title: "Casely",
        description:
            "A sleek product showcase platform with rich visual presentation, designed for browsing and discovering curated case designs and accessories.",
        tags: ["React", "Bootstrap", "JavaScript", "Vercel"],
        color: "#f472b6",
        link: "https://caselybyparth.vercel.app/",
    },
    {
        title: "GlobeGo",
        description:
            "An interactive world explorer that lets users discover countries, flags, and fascinating facts from every corner of the globe with beautiful UI.",
        tags: ["React", "Vite", "REST API", "CSS"],
        color: "#34d399",
        link: "https://globego.vercel.app/",
    },
    {
        title: "Noted",
        description:
            "A minimal yet powerful personal task manager with an intuitive interface for organizing thoughts, managing tasks, and boosting productivity.",
        tags: ["React", "Vite", "TypeScript", "Tailwind CSS"],
        color: "#fbbf24",
        link: "https://noted-byparth.vercel.app/",
    },
    {
        title: "Gradient Generator",
        description:
            "A beautiful CSS gradient generator tool for designers and developers — preview, customize, and copy gradient code with a live visual editor.",
        tags: ["JavaScript", "CSS", "HTML", "Vercel"],
        color: "#38bdf8",
        link: "https://vercel.com/parths-projects-fa1e49ef/gradient-generator",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
        },
    },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.03, boxShadow: "0 25px 50px -12px rgba(167, 139, 250, 0.25)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group glass glass-hover rounded-2xl p-6 md:p-8 cursor-pointer block relative overflow-hidden"
        >
            {/* Glow accent */}
            <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                style={{ background: project.color }}
            />

            {/* Project number */}
            <span
                className="text-6xl md:text-7xl font-black opacity-5 absolute top-4 right-6 select-none"
                style={{ color: project.color }}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Colored accent line */}
            <div
                className="w-10 h-1 rounded-full mb-6 transition-all duration-300 group-hover:w-16"
                style={{ background: project.color }}
            />

            <h3 className="text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-white">
                {project.title}
            </h3>

            <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:border-white/20"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Arrow */}
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-neutral-400"
                >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </div>
        </motion.a>
    );
}

export default function Projects() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-16 md:mb-20"
            >
                <p className="text-accent text-xs md:text-sm font-mono tracking-[0.2em] uppercase mb-4 font-bold drop-shadow-md">
                    Case Studies
                </p>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Autonomous <span className="text-gradient text-glow">Systems.</span>
                </h2>
                <p className="mt-4 text-neutral-300 text-lg md:text-xl max-w-xl font-light leading-relaxed">
                    A curated selection of platforms demonstrating the intersection of scalable MERN architecture, AI capabilities, and seamless user experiences.
                </p>
            </motion.div>

            {/* Project grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl"
            >
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </motion.div>
        </section>
    );
}
