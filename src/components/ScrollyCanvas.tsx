"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentFrameRef = useRef(0);
    // Keep images in memory!
    const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
    
    // Cache the literal CSS dimensions so we don't calculate on every single scroll tick
    const dimensionsRef = useRef({ w: 0, h: 0 });

    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80, // slightly tighter spring for faster response
        damping: 30, // less bouncy
        restDelta: 0.001
    });

    const frameIndex = useTransform(
        smoothProgress,
        [0, 1],
        [0, FRAME_COUNT - 1]
    );

    const renderFrame = useCallback((index: number) => {
        if (isMobile === null) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        let img = imagesRef.current[index];
        
        // Fallback to closest loaded frame if not loaded yet
        if (!img || !img.complete) {
            for (let i = index; i >= 0; i--) {
                if (imagesRef.current[i]?.complete) {
                    img = imagesRef.current[i];
                    break;
                }
            }
        }

        if (img && img.complete) {
            // Get cached CSS dimensions
            const canvasW = dimensionsRef.current.w;
            const canvasH = dimensionsRef.current.h;
            
            if (canvasW === 0 || canvasH === 0) return;

            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = canvasW / canvasH;

            let drawW: number, drawH: number, offsetX: number, offsetY: number;

            // object-fit: contain logic -> Do not cut the image, scale to fit entirely inside container
            if (canvasRatio > imgRatio) {
                // canvas is wider than image. Fit to height, center horizontally
                drawH = canvasH;
                drawW = canvasH * imgRatio;
                offsetX = (canvasW - drawW) / 2;
                offsetY = 0;
            } else {
                // canvas is taller than image. Fit to width, center vertically
                drawW = canvasW;
                drawH = canvasW / imgRatio;
                offsetX = 0;
                offsetY = (canvasH - drawH) / 2;
            }
            
            // Clear and draw! Very high performance since we skip rect computing
            ctx.clearRect(0, 0, canvasW, canvasH);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        }
    }, [isMobile]);

    // Handle canvas resize with responsiveness and High DPI support
    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // CRITICAL FIX FOR MOBILE LAG:
        // iPhones have a dpr of 3. Drawing an uncompressed 1170x2532 canvas 60 times a second crushes the WebKit GPU.
        // We clamp the DPR to 1.5. It's still retina-sharp but requires exponentially less rendering power.
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        
        // Use the parent wrapper container to calculate the full screen size
        const parent = canvas.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        
        // cache for renderFrame
        dimensionsRef.current = { w: rect.width, h: rect.height };

        // Ensure responsive width taking into account device pixel ratio
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.scale(dpr, dpr);
        }

        // Re-render current frame on resize
        // Use requestAnimationFrame to ensure we don't block the main thread during resize
        requestAnimationFrame(() => {
            if (imagesRef.current[currentFrameRef.current]?.complete) {
                renderFrame(currentFrameRef.current);
            }
        });
    }, [renderFrame]); 

    // Listen for window resize
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    // Preload images so they are cached by the browser, but prioritize the first frame
    useEffect(() => {
        if (isMobile === null) return;

        let isMounted = true;
        // Wipe cache when mobile/desktop changes
        imagesRef.current = new Array(FRAME_COUNT).fill(null);

        const preloadImages = async () => {
            // 1. Instantly load the first frame so LCP is fast
            const firstImg = new Image();
            firstImg.src = getFramePath(0, isMobile);
            await new Promise((resolve) => {
                firstImg.onload = resolve;
                firstImg.onerror = resolve; // Continue even if it fails
            });

            if (!isMounted) return;
            imagesRef.current[0] = firstImg;
            handleResize(); // ensure we have correct dimensions before first draw
            renderFrame(0);

            // 2. Parallel load the rest - fixes "takes too much time" issue
            for (let i = 1; i < FRAME_COUNT; i++) {
                if (!isMounted) break;
                
                const img = new Image();
                img.src = getFramePath(i, isMobile);
                img.onload = () => {
                    if (isMounted) {
                        imagesRef.current[i] = img;
                        // If user scrolled to this frame while it was loading, render it now
                        if (currentFrameRef.current === i) {
                            renderFrame(i);
                        }
                    }
                };
                // Fire and forget; browser network queuing automatically handles concurrency
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };

    }, [isMobile, handleResize, renderFrame]);

    // Update on scroll change
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.round(latest);
        if (index === currentFrameRef.current) return;
        currentFrameRef.current = index;
        
        // Use requestAnimationFrame for smooth canvas painting
        requestAnimationFrame(() => {
            renderFrame(index);
        });
    });

    if (isMobile === null) return null; // Avoid flickering wrong image on load

    return (
        <div ref={containerRef} className="relative h-[800vh] md:h-[1000vh]">
            <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>
        </div>
    );
}