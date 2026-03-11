"use client";

import { motion } from "framer-motion";

const socials = [
    { label: "GitHub", href: "https://github.com/Parth05d" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/parth05d/" },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative border-t border-white/5">
            {/* Gradient line accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {/* Left */}
                        <div>
                            <motion.h2
                                className="text-3xl md:text-5xl font-bold mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                Let&apos;s create
                                <br />
                                something{" "}
                                <span className="text-gradient">together.</span>
                            </motion.h2>
                            <motion.a
                                href="mailto:parthdarji.0504@gmail.com"
                                className="inline-block mt-6 text-lg text-accent hover:text-accent-glow transition-colors duration-300 underline-offset-4 hover:underline"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                parthdarji.0504@gmail.com
                            </motion.a>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="text-sm text-neutral-500 uppercase tracking-[0.2em] mb-4">
                                    Socials
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {socials.map((social) => (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 border border-white/10 px-4 py-2 rounded-full"
                                            whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(167, 139, 250, 0.1)", borderColor: "rgba(167, 139, 250, 0.4)" }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                            {social.label}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-neutral-600">
                            © {new Date().getFullYear()} Parth Darji. All rights reserved.
                        </p>
                        <p className="text-xs text-neutral-600">
                            Designed & developed with precision.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
