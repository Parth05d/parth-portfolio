"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="about"
            className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <p className="text-accent text-xs md:text-sm font-mono tracking-[0.2em] uppercase mb-4 font-bold drop-shadow-md">
                        The Architect
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold">
                        About <span className="text-gradient text-glow">Me.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="glass p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)]"
                    >
                        <p className="text-neutral-200 text-lg md:text-xl leading-relaxed mb-6 font-light">
                            I&apos;m <span className="text-white font-medium">Parth Darji</span>,
                            an AI Automation Engineer and MERN Stack Developer finishing my B.Tech in Computer Engineering. I&apos;m passionate about building digital products that actively solve complex problems.
                        </p>
                        <p className="text-neutral-300 text-base md:text-lg leading-relaxed mb-6 font-light">
                            I specialize in <span className="text-white font-medium">full-stack infrastructure</span> using MongoDB, Express, React, and Node.js. My core focus, however, is integrating <span className="text-accent-glow font-medium">intelligent agentic workflows</span>—leveraging LLMs, custom AI models, and automation—to move beyond static applications.
                        </p>
                        <p className="text-neutral-300 text-base md:text-lg leading-relaxed font-light">
                            Whether it&apos;s architecting autonomous platforms or designing predictive systems, my goal is to push the boundaries of what software can achieve without human intervention.
                        </p>
                    </motion.div>

                    {/* Skills & Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        {/* Tech Stack */}
                        <div>
                            <p className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-4">
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "React",
                                    "Next.js",
                                    "Node.js",
                                    "TypeScript",
                                    "Python",
                                    "TensorFlow",
                                    "MongoDB",
                                    "Express",
                                    "Tailwind CSS",
                                    "Framer Motion",
                                    "MediaPipe",
                                    "Flask",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-sm px-4 py-2 rounded-full glass text-neutral-300 hover:text-white hover:border-accent/30 transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <p className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-4">
                                Find Me
                            </p>
                            <div className="flex flex-col gap-3">
                                <motion.a
                                    href="https://github.com/Parth05d"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 rounded-xl glass glass-hover transition-colors duration-300 relative overflow-hidden"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <span className="text-neutral-300 group-hover:text-white transition-colors relative z-10">
                                        GitHub
                                    </span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-neutral-500 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/in/parth05d/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-4 rounded-xl glass glass-hover transition-colors duration-300 relative overflow-hidden"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <span className="text-neutral-300 group-hover:text-white transition-colors relative z-10">
                                        LinkedIn
                                    </span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-neutral-500 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </motion.a>
                                <motion.a
                                    href="mailto:parthdarji.0504@gmail.com"
                                    className="group flex items-center justify-between p-4 rounded-xl glass glass-hover transition-colors duration-300 relative overflow-hidden"
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                >
                                    <span className="text-neutral-300 group-hover:text-white transition-colors relative z-10">
                                        parthdarji.0504@gmail.com
                                    </span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="text-neutral-500 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10"
                                    >
                                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
