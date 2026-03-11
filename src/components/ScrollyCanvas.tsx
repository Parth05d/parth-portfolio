"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";

const FRAME_COUNT = 144;

// 1. Same Hook as before
function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    return isMobile;
}

// 2. Same Path logic as before
function getFramePath(index: number, isMobile: boolean): string {
    const padded = String(index).padStart(3, "0");
    const basePath = isMobile ? "/mobile sequence" : "/sequence";
    return `${basePath}/frame_${padded}_delay-0.042s.webp`;
}

export default function ScrollyImage() {
    const containerRef = useRef<HTMLDivElement>(null);
    // Use a Ref for the image element instead of canvas
    const imgRef = useRef<HTMLImageElement>(null);
    const currentFrameRef = useRef(0);

    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 25,
        restDelta: 0.001
    });

    const frameIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, FRAME_COUNT - 1]
    );

    // Simplified render function: just update the src
    const renderFrame = (index: number) => {
        if (!imgRef.current || isMobile === null) return;
        imgRef.current.src = getFramePath(index, isMobile);
    };

    // Preload images so they are cached by the browser, but prioritize the first frame
    useEffect(() => {
        if (isMobile === null) return;

        let isMounted = true;

        const preloadImages = async () => {
            // 1. Instantly load the first frame so the user sees something immediately
            const firstImg = new Image();
            firstImg.src = getFramePath(0, isMobile);
            
            await new Promise((resolve) => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve; // Continue even if it fails
            });

            if (!isMounted) return;
            renderFrame(0);

            // 2. Sequentially load the rest of the images in the background
            //    This prevents the browser from making 144 requests at the exact same time,
            //    which would block other important assets (like fonts or CSS) from loading.
            for (let i = 1; i < FRAME_COUNT; i++) {
                if (!isMounted) break;
                
                await new Promise((resolve) => {
                    const img = new Image();
                    img.src = getFramePath(i, isMobile);
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };

    }, [isMobile]);

    // Update on scroll change
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.round(latest);
        if (index === currentFrameRef.current) return;
        currentFrameRef.current = index;
        // We don't even need requestAnimationFrame here, the browser handles img src changes efficiently
        renderFrame(index);
    });

    if (isMobile === null) return null; // Avoid flickering wrong image on load

    return (
        <div ref={containerRef} className="relative h-[800vh] md:h-[1000vh]">
            <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
                {/* THE MAGIC FIX: 
                   Just use a standard img tag with CSS object-cover.
                   Browser handles the math.
                */}
                <img
                    ref={imgRef}
                    // Set initial src to avoid empty image flash
                    src={getFramePath(0, isMobile)}
                    alt="Scrolling sequence"
                    // w-full h-full object-cover does exactly what the complex canvas math was trying to do
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}