"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionProps {
    children: React.ReactNode;
    scrollRange: [number, number];
    className?: string;
    containerRef: React.RefObject<HTMLElement | null>;
}

function FadeSection({
    children,
    scrollRange,
    className = "",
    containerRef,
}: SectionProps) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [start, end] = scrollRange;
    // Adjusting triggers for smoother entry/exit
    const midStart = start + (end - start) * 0.2;
    const midEnd = end - (end - start) * 0.2;

    const opacity = useTransform(
        scrollYProgress,
        [start, midStart, midEnd, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollYProgress,
        [start, midStart, midEnd, end],
        [50, 0, 0, -50]
    );

    // Adding a subtle scale effect for more dynamism
    const scale = useTransform(
        scrollYProgress,
        [start, midStart, midEnd, end],
        [0.95, 1, 1, 0.95]
    );

    return (
        <motion.div style={{ opacity, y, scale }} className={className}>
            {children}
        </motion.div>
    );
}

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="absolute inset-0 h-[800vh] md:h-[1000vh] pointer-events-none">

            {/* Global dark gradient overlay to ensure text contrast over the sequence */}
            <div className="sticky top-0 h-screen w-full bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-[5] pointer-events-none" />

            {/* --- Section 1: Hero --- */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center z-10">
                <FadeSection
                    scrollRange={[0, 0.15]}
                    className="text-center px-6 md:px-12 py-10 rounded-3xl glass max-w-5xl mx-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    containerRef={containerRef}
                >
                    <motion.p
                        className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-accent mb-6 font-semibold shadow-black drop-shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Full Stack · Power Platform · AI/ML
                    </motion.p>
                    <motion.h1
                        className="text-5xl md:text-8xl lg:text-9xl font-extrabold leading-tight tracking-tight drop-shadow-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <span className="block text-white">Parth</span>
                        <span className="block text-gradient text-glow">Darji.</span>
                    </motion.h1>
                    <motion.p
                        className="mt-6 md:mt-8 text-base md:text-xl text-neutral-200 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        Building intelligent, scalable applications that solve real business problems. I leverage the MERN stack and Microsoft Power Platform to engineer enterprise-grade solutions.
                    </motion.p>
                </FadeSection>
            </div>

            {/* --- Section 2: The Core Skills --- */}
            <div className="sticky top-0 h-screen w-full flex items-center z-10">
                <FadeSection
                    scrollRange={[0.25, 0.45]}
                    className="px-6 md:px-16 lg:px-24 mx-4 md:mx-12 lg:mx-24 max-w-4xl py-12 rounded-3xl glass shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                    containerRef={containerRef}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="h-[1px] w-12 bg-accent drop-shadow-md"></span>
                        <p className="text-accent text-xs md:text-sm font-mono tracking-[0.2em] uppercase font-bold drop-shadow-md">
                            The Stack & Strategy
                        </p>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-xl">
                        Moving beyond <br className="hidden md:block" />
                        static software with <br className="md:hidden" />
                        <span className="text-gradient">intelligent agents.</span>
                    </h2>
                    <p className="mt-8 text-neutral-200 text-lg md:text-xl leading-relaxed max-w-2xl font-light drop-shadow-md">
                        I use the <strong className="text-white font-medium">MERN stack</strong> and <strong className="text-white font-medium">Microsoft Power Platform</strong> as the foundation to build robust enterprise systems. Then, I integrate <strong className="text-accent-glow font-medium">AI/ML models</strong> and <strong className="text-accent-glow font-medium">n8n Automation</strong> to turn standard operations into intelligent, self-managing platforms.
                    </p>
                </FadeSection>
            </div>

            {/* --- Section 3: The Value Proposition --- */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-end z-10">
                <FadeSection
                    scrollRange={[0.6, 0.9]}
                    className="px-6 md:px-16 lg:px-24 mx-4 md:mx-12 lg:mx-24 text-right max-w-4xl py-12 rounded-3xl glass shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                    containerRef={containerRef}
                >
                    <div className="flex items-center gap-4 mb-6 justify-end">
                        <p className="text-accent text-xs md:text-sm font-mono tracking-[0.2em] uppercase font-bold drop-shadow-md">
                            The Philosophy
                        </p>
                        <span className="h-[1px] w-12 bg-accent drop-shadow-md"></span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-xl">
                        Don&apos;t just build a tool. <br className="hidden md:block" />
                        Build a <br className="md:hidden" />
                        <span className="text-gradient">digital workforce.</span>
                    </h2>
                    <p className="mt-8 text-neutral-200 text-lg md:text-xl leading-relaxed ml-auto max-w-2xl font-light drop-shadow-md">
                        The future isn&apos;t about better UIs; it&apos;s about smarter operations. I leverage full-stack engineering to create scalable infrastructure, and automation pipelines to handle complex business workflows seamlessly.
                    </p>

                    <motion.button
                        className="mt-12 px-6 py-3 md:px-8 md:py-4 bg-transparent border border-accent text-accent font-mono uppercase tracking-widest text-xs md:text-sm transition-colors duration-300 cursor-pointer pointer-events-auto bg-black/30 backdrop-blur-sm relative overflow-hidden group rounded-md"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 20px rgba(167, 139, 250, 0.4)",
                            borderColor: "rgba(196, 181, 253, 1)",
                            color: "#fff"
                        }}
                        whileTap={{ scale: 0.95 }}
                        // Add your actual scroll logic here
                        onClick={() => {
                            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">See Automation in Action ↓</span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                    </motion.button>
                </FadeSection>
            </div>

            {/* Scroll indicator */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20">
                <ScrollIndicator containerRef={containerRef} />
            </div>
        </div>
    );
}

function ScrollIndicator({
    containerRef,
}: {
    containerRef: React.RefObject<HTMLElement | null>;
}) {
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Fade out quicker
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <motion.div
            className="flex flex-col items-center gap-3"
            style={{ opacity }}
        >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
                Scroll to explore
            </span>
            <div className="h-12 w-[1px] bg-neutral-800 relative overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-accent to-transparent"
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    );
}