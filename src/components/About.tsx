import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Track scroll exclusively while the About section spans across the viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    })

    // Sticky Left-Title mechanics (Fades in early, fades out very late)
    const titleOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 0.95], [0, 1, 1, 0])
    const titleY = useTransform(scrollYProgress, [0.1, 0.25], [100, 0])

    // Bio text scroll wipe physics (Left-to-Right gradient reading algorithms)
    const paragraphReveal1 = useTransform(scrollYProgress, [0.25, 0.50], ["100%", "0%"])
    const paragraphReveal2 = useTransform(scrollYProgress, [0.45, 0.70], ["100%", "0%"])

    // Stats grid parallax array (ascends as the user completes the bio text)
    const statsY = useTransform(scrollYProgress, [0.65, 0.75], [150, 0])
    const statsOpacity = useTransform(scrollYProgress, [0.65, 0.75], [0, 1])

    return (
        <section ref={containerRef} className="py-24 md:py-64 relative bg-[#050505] overflow-hidden" id="about">
            {/* 200vh height drives the necessary scroll runway for the sticky header / reading transitions */}
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10 w-full min-h-[200vh]">

                {/* Left Column: Sticky Identity Header */}
                <div className="lg:col-span-5 relative h-full">
                    <motion.div
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="sticky top-[20vh] md:top-[30vh] flex flex-col items-start -space-y-2 md:-space-y-6"
                    >
                        <span className="text-xl md:text-3xl font-light tracking-[0.5em] uppercase text-white/70 block drop-shadow-md pb-4 pt-12 md:pt-0">
                            The Architect
                        </span>
                        <span className="font-signature text-[6rem] md:text-[8rem] lg:text-[11rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] capitalize tracking-normal block pb-4">
                            Aaron.
                        </span>
                        <p className="text-xs md:text-sm font-light tracking-[0.2em] text-white/40 uppercase mt-4 max-w-sm leading-[2.5]">
                            Deploying autonomous intelligence and hyper-responsive architecture from the shadows.
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Scroll-Swept Biography & Metric Grid */}
                <div className="lg:col-span-7 flex flex-col justify-center pt-12 lg:pt-[45vh] pb-[20vh]">

                    {/* Primary Bio Blocks (Wiping Left to Right on independent scroll breakpoints) */}
                    <motion.p
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 40%, rgba(255,255,255,0.05) 60%)",
                            backgroundSize: "200% 100%",
                            backgroundPositionX: paragraphReveal1,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                        className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.3] mb-12 drop-shadow-xl"
                    >
                        I engineer digital experiences that refuse to be ignored. Bridging the mechanical gap between raw computational automation and breathtaking human interaction.
                    </motion.p>

                    <motion.p
                        style={{
                            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.05) 60%)",
                            backgroundSize: "200% 100%",
                            backgroundPositionX: paragraphReveal2,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                        className="text-xl md:text-3xl font-light tracking-wide text-white/80 leading-relaxed italic mb-24 drop-shadow-md lg:ml-12 border-l border-white/20 pl-6 md:pl-10"
                    >
                        "The systems I construct are designed to operate autonomously—executing profound logic at scale while preserving a frontend aesthetic that feels entirely handcrafted."
                    </motion.p>

                    {/* Data Metric Grid Block */}
                    <motion.div style={{ y: statsY, opacity: statsOpacity }} className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-16 md:pt-24 mt-auto">
                        {[
                            { label: "Core Focus", value: "Systems Arch" },
                            { label: "Experience", value: "05+ Years" },
                            { label: "Location", value: "East Coast" },
                            { label: "Role", value: "Lead Engineer" },
                            { label: "Automation", value: "Agents & LLMs" },
                            { label: "Availability", value: "Select Clients" }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col group cursor-default">
                                <span className="font-signature text-2xl md:text-4xl text-[#3b82f6] leading-none mb-2 md:mb-4 group-hover:text-white transition-colors duration-500 drop-shadow-md">{stat.value}</span>
                                <span className="text-[9px] md:text-[11px] font-light uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors duration-500">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}
