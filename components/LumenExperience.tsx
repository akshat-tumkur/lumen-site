"use client";

import { motion } from "framer-motion";

// Slow, deliberate fade component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }} // Custom bezier for "luxurious" feel
        className={className}
    >
        {children}
    </motion.div>
);

export default function LumenExperience() {
    return (
        <div className="bg-[#050505] text-white w-full relative z-10 pb-40">

            {/* SECTION 1 — BRAND STATEMENT */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-40">
                <div className="max-w-6xl mx-auto space-y-16">
                    <FadeIn>
                        <h2 className="text-[10vw] md:text-[8rem] font-bold tracking-tighter leading-[0.85] text-white">
                            Designed for<br />Those Who See<br />Differently.
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/40 to-transparent mx-auto mb-10" />
                        <p className="text-2xl md:text-4xl text-white/50 font-light max-w-3xl mx-auto leading-normal">
                            LUMEN is built for photographers who value intention, craft, and clarity over noise.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 2 — PRODUCT PHILOSOPHY */}
            <section className="py-40 md:py-80 px-6 md:px-24">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center space-y-24">
                    <FadeIn>
                        <h2 className="text-6xl md:text-9xl font-semibold tracking-tighter leading-none text-white/90">
                            Precision<br />Without<br />Distraction.
                        </h2>
                    </FadeIn>
                    <FadeIn delay={0.2} className="flex flex-col items-center space-y-12 max-w-4xl">
                        <p className="text-3xl md:text-5xl text-white/70 leading-tight font-light">
                            Every detail is refined to remove friction between the photographer and the moment.
                        </p>
                        <div className="w-24 h-px bg-white/20" />
                        <p className="text-xl md:text-2xl text-white/40 max-w-xl">
                            We removed the unessential to reveal the pure instrument beneath.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SECTION 3 — VISUAL INTERLUDE */}
            <section className="h-[80vh] w-full bg-[#050505] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-white/5 to-[#050505] opacity-30" />
                <FadeIn>
                    <div className="text-[25vw] text-white font-cursive select-none leading-none opacity-80 mix-blend-screen">
                        Lumen
                    </div>
                </FadeIn>
            </section>

            {/* SECTION 4 — SPECIFICATIONS REDEFINED */}
            <section className="py-40 px-6">
                <div className="max-w-4xl mx-auto flex flex-col items-center space-y-[15vh]">
                    {[
                        { label: "Resolution", value: "62.5 MP", sub: "35mm Full-Frame CMOS" },
                        { label: "Material", value: "Titanium", sub: "Grade 5 Aerospace Alloy" },
                        { label: "Optical", value: "0.80x", sub: "5.76M-Dot OLED Viewfinder" },
                        { label: "Motion", value: "8K RAW", sub: "Internal 12-Bit Recording" },
                    ].map((spec, i) => (
                        <FadeIn key={i} className="flex flex-col items-center text-center space-y-24">
                            <span className="text-white/40 font-mono text-base tracking-[0.4em] uppercase">{spec.label}</span>
                            <span className="text-white font-medium text-[6rem] md:text-[12rem] tracking-tighter leading-none">{spec.value}</span>
                            <span className="text-white/60 font-light text-2xl tracking-wide">{spec.sub}</span>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* SECTION 5 — FINAL CTA */}
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <FadeIn>
                    <h2 className="text-[15vw] font-bold tracking-tighter mb-12 text-white leading-none">See Beyond</h2>

                    <button className="group relative px-12 py-5 bg-white text-black rounded-full overflow-hidden transition-transform hover:scale-105 duration-300">
                        <span className="relative z-10 text-lg font-bold tracking-widest uppercase">Pre-order Now</span>
                    </button>

                    <p className="mt-16 text-white/30 text-sm tracking-[0.2em] uppercase">Limited First Edition Batch</p>
                </FadeIn>
            </section>

        </div>
    );
}
