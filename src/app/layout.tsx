import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Parth Darji | Creative Developer",
    description:
        "Full-stack developer specializing in MERN stack and AI/ML. Building digital experiences that bridge design and engineering.",
    openGraph: {
        title: "Parth Darji | Creative Developer",
        description:
            "Full-stack developer specializing in MERN stack and AI/ML. Building digital experiences that bridge design and engineering.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <body className="font-sans">
                <CustomCursor />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
