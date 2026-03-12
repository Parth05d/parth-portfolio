"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 400 });

    useEffect(() => {
        // Only mount and show cursor on devices with a fine pointer (like a mouse)
        // This prevents sticky/broken custom cursors on mobile phones and tablets
        const mediaQuery = window.matchMedia("(pointer: fine)");
        if (!mediaQuery.matches) return;

        setIsMounted(true);

        const handleMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMove);

        // Detect hoverable elements
        const handleOverInteractive = () => setIsHovering(true);
        const handleOutInteractive = () => setIsHovering(false);

        const attachListeners = () => {
            document
                .querySelectorAll("a, button, [role='button'], input, textarea, select")
                .forEach((el) => {
                    // Remove first to avoid duplicates, then add
                    el.removeEventListener("mouseenter", handleOverInteractive);
                    el.removeEventListener("mouseleave", handleOutInteractive);
                    el.addEventListener("mouseenter", handleOverInteractive);
                    el.addEventListener("mouseleave", handleOutInteractive);
                });
        };

        const observer = new MutationObserver(() => {
            attachListeners();
        });

        observer.observe(document.body, { childList: true, subtree: true });
        attachListeners();

        return () => {
            window.removeEventListener("mousemove", handleMove);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    // Don't render until mounted to avoid hydration mismatch
    if (!isMounted) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed z-[9999] pointer-events-none top-0 left-0"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent"
                    animate={{
                        width: isHovering ? 56 : 32,
                        height: isHovering ? 56 : 32,
                        opacity: isHovering ? 0.8 : 0.4,
                        backgroundColor: isHovering ? "rgba(167, 139, 250, 0.1)" : "transparent",
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                />
            </motion.div>

            {/* Inner dot */}
            <motion.div
                className="fixed z-[9999] pointer-events-none top-0 left-0"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                    animate={{
                        width: isHovering ? 8 : 6,
                        height: isHovering ? 8 : 6,
                        opacity: isHovering ? 0 : 1, // Hide dot when hovering
                    }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </>
    );
}
