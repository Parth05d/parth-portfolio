"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const experiences = [
    {
        role: "Software Developer Intern",
        company: "Futurrizon Technologies Pvt. Ltd.",
        period: "Dec 2025 – Present",
        location: "Ahmedabad, India",
        points: [
            "Architecting and developing a production-scale Business Operations & CRM Management System using Microsoft Power Platform (Canvas Power Apps, Power Automate, SharePoint Online).",
            "Designed and built 27+ screens in Canvas Power Apps with role-based access control (Admin, Manager, Department Head) leveraging Power Fx formulas and SharePoint as the data backend.",
            "Built and optimised 15+ Power Automate flows for leave management, notifications, deal pipeline tracking, and approval workflows.",
            "Executed large-scale data population of 100,000 records across 10 SharePoint lists in an Indian business context using PnP batch imports via CSV.",
            "Integrated AI/ML capabilities and automation pipelines to enhance platform intelligence."
        ]
    },
    {
        role: "Full Stack Developer Intern",
        company: "One IT Solutions",
        period: "Jul 2025 – Nov 2025",
        location: "Ahmedabad, India",
        points: [
            "Delivered frontend enhancements for client-facing React.js applications — improving layouts, responsive design, typography, and UI consistency.",
            "Collaborated with a cross-functional team to refactor and modernise existing web applications, reducing UI inconsistencies.",
            "Gained hands-on backend experience with Node.js and Express.js, contributing to REST API integration."
        ]
    }
];

export default function Experience() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} id="experience" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16 md:mb-20"
                >
                    <p className="text-accent text-xs md:text-sm font-mono tracking-[0.2em] uppercase mb-4 font-bold drop-shadow-md">
                        Career Journey
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        Professional <span className="text-gradient text-glow">Experience.</span>
                    </h2>
                </motion.div>

                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                            className="glass p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden group"
                        >
                            {/* Subtle Glow Background Line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/30 group-hover:bg-accent transition-colors duration-500" />
                            
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.role}</h3>
                                    <p className="text-xl text-neutral-300 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-accent font-mono text-sm tracking-[0.05em] bg-accent/10 px-4 py-2 rounded-full inline-block mb-2">
                                        {exp.period}
                                    </p>
                                    <p className="text-neutral-500 text-sm block md:pr-4">{exp.location}</p>
                                </div>
                            </div>
                            
                            <ul className="space-y-4">
                                {exp.points.map((point, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="text-accent mr-3 font-bold opacity-80 shadow-md">▸</span>
                                        <span className="text-neutral-300 leading-relaxed font-light">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
