"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navLinks = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return unsubscribe;
    }, [scrollY]);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <motion.div
                className="flex items-center justify-between h-16 md:h-20 border-b transition-colors duration-300"
                style={{
                    borderColor: isScrolled
                        ? "rgba(255,255,255,0.06)"
                        : "transparent",
                }}
            >
                {/* Background blur layer */}
                <motion.div
                    className="absolute inset-0 -z-10 backdrop-blur-lg"
                    style={{
                        backgroundColor: `rgba(18, 18, 18, ${bgOpacity})`,
                    }}
                />

                {/* Logo */}
                <a href="#" className="relative z-10 group">
                    <span className="text-lg font-bold tracking-tight">
                        P
                        <span className="text-accent group-hover:text-accent-glow transition-colors duration-300">
                            .
                        </span>
                        D
                    </span>
                </a>

                {/* Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                    <motion.a
                        href="mailto:parthdarji.0504@gmail.com"
                        className="text-sm px-5 py-2 rounded-full border border-white/10 text-neutral-300 hover:border-accent/50 hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(167, 139, 250, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        Let&apos;s Talk
                    </motion.a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden relative z-10 p-2 text-neutral-400 hover:text-white transition-colors"
                    aria-label="Menu"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path d="M3 6h14M3 10h14M3 14h14" />
                    </svg>
                </button>
            </motion.div>
        </motion.nav>
    );
}
