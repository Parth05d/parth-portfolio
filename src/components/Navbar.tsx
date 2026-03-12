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

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return unsubscribe;
    }, [scrollY]);

    // Close mobile menu when screen resizes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Next.js smooth scroll handler
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        // Only intercept hash links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.replace('#', '');
            const elem = document.getElementById(targetId);
            
            // Close mobile menu first
            setIsOpen(false);
            
            if (elem) {
                // Wait for the mobile menu animation to finish and unblock the DOM
                // before asking the browser to scroll the window.
                setTimeout(() => {
                    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <motion.div
                className="flex items-center justify-between h-16 md:h-20 border-b transition-colors duration-300 relative"
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
                <a href="#" className="relative z-10 group" onClick={(e) => handleScroll(e, '#')}>
                    <span className="text-lg font-bold tracking-tight">
                        P
                        <span className="text-accent group-hover:text-accent-glow transition-colors duration-300">
                            .
                        </span>
                        D
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 tracking-wide cursor-pointer pointer-events-auto"
                        >
                            {link.label}
                        </a>
                    ))}
                    <motion.a
                        href="mailto:parthdarji.0504@gmail.com"
                        className="text-sm px-5 py-2 rounded-full border border-white/10 text-neutral-300 hover:border-accent/50 hover:text-white transition-colors duration-300 pointer-events-auto"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(167, 139, 250, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        Let&apos;s Talk
                    </motion.a>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden relative z-50 p-2 text-neutral-400 hover:text-white transition-colors pointer-events-auto"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        {isOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </motion.div>

            {/* Mobile Dropdown Menu */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, height: "auto", pointerEvents: "auto", display: "block" },
                    closed: { opacity: 0, height: 0, pointerEvents: "none", transitionEnd: { display: "none" } }
                }}
                className="md:hidden relative border-t border-white/5 bg-[#121212]/95 backdrop-blur-xl overflow-hidden"
            >
                <div className="flex flex-col items-center py-8 gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-lg text-neutral-300 hover:text-white hover:text-accent transition-colors duration-300 tracking-wide cursor-pointer pointer-events-auto"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="mailto:parthdarji.0504@gmail.com"
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-sm px-6 py-3 rounded-full border border-white/10 text-neutral-300 hover:border-accent/50 hover:text-white transition-colors duration-300 pointer-events-auto"
                    >
                        Let&apos;s Talk
                    </a>
                </div>
            </motion.div>
        </motion.nav>
    );
}
