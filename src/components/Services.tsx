import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // Butter-smooth physics for text tracking matching the Hero
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Stage 1: Intro Text fades in and up
    const y1 = useTransform(smoothProgress, [0, 0.2, 0.3, 0.4], [150, 0, 0, -150])
    const opacity1 = useTransform(smoothProgress, [0, 0.2, 0.3, 0.4], [0, 1, 1, 0])

    // Stage 2: Services Grid reveals
    const y2 = useTransform(smoothProgress, [0.3, 0.5, 0.7, 0.8], [150, 0, 0, -150])
    const opacity2 = useTransform(smoothProgress, [0.3, 0.5, 0.7, 0.8], [0, 1, 1, 0])

    // Stage 3: Closing Statement
    const y3 = useTransform(smoothProgress, [0.7, 0.85, 1], [150, 0, 0])
    const opacity3 = useTransform(smoothProgress, [0.7, 0.85, 1], [0, 1, 1])

    return (
        // 300vh provides exactly 3 screens worth of scroll depth to explore the 3 stages
        // Pure [050505] void to seamlessly bleed out from the Hero Canvas mask
        <section ref={containerRef} className="h-[300vh] relative bg-[#050505]" id="studio">
            <div className="h-screen sticky top-0 overflow-hidden flex flex-col items-center justify-center px-6 md:px-12 w-full">

                {/* Stage 1 */}
                <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center max-w-4xl mx-auto w-full px-4">
                    <h2 className="font-signature text-6xl md:text-8xl lg:text-[8rem] text-white/90 mb-4 md:mb-6 drop-shadow-lg">Our Capabilities</h2>
                    <p className="text-lg md:text-3xl font-light tracking-wide text-white/60 leading-relaxed italic">
                        "We lock in on raw automation and high-fidelity interfaces. Doing less, but doing it with absolute supremacy."
                    </p>
                </motion.div>

                {/* Stage 2 */}
                <motion.div style={{ y: y2, opacity: opacity2 }} className="absolute w-full max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-12">
                    {[
                        { title: "UI/UX Engineering", desc: "Awwwards-grade digital interfaces designed with physical presence and brutalist elegance." },
                        { title: "AI Automation", desc: "Deploying intelligent agents to strip manual labor out of your high-leverage workflows." },
                        { title: "Scrollytelling", desc: "Crafting linear, scroll-driven narratives that completely hijack user attention and convert." }
                    ].map((service, i) => (
                        <div key={i} className="flex flex-col items-start p-8 md:p-12 border border-white/5 bg-[#0a0a0a] group hover:bg-[#0c0c0c] hover:border-white/10 transition-colors shadow-2xl relative overflow-hidden">
                            {/* Massive background number */}
                            <span className="font-signature text-[8rem] md:text-[12rem] text-white/5 absolute -right-4 -bottom-10 md:-bottom-16 pointer-events-none group-hover:scale-110 transition-transform duration-700">0{i + 1}</span>

                            <span className="font-signature text-3xl md:text-5xl text-[#3b82f6] mb-4 md:mb-6 z-10 relative drop-shadow-md">0{i + 1}.</span>
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-white/90 mb-4 md:mb-6 z-10 relative">{service.title}</h3>
                            <p className="text-xs md:text-sm tracking-[0.1em] text-white/60 leading-loose font-light z-10 relative">{service.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Stage 3 */}
                <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute text-center w-full px-4">
                    {/* Mobile scaled typography, massive on desktop */}
                    <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)] leading-[0.9]">
                        We Don't Follow<br />
                        <span className="text-white/90 [-webkit-text-stroke:0px] drop-shadow-2xl">Trends.</span>
                    </h2>
                </motion.div>

            </div>
        </section>
    )
}
