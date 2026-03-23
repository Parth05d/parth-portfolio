import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            {/* ── Hero: Scroll-Linked Canvas + Text Overlay ──────── */}
            <section className="relative">
                <ScrollyCanvas />
                <Overlay />
            </section>

            {/* ── Experience ──────────────────────── */}
            <Experience />

            {/* ── Projects Grid ──────────────────────── */}
            <section id="work">
                <Projects />
            </section>

            {/* ── About ──────────────────────── */}
            <About />

            {/* ── Footer ──────────────────────── */}
            <Footer />
        </main>
    );
}
