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

    // Stage 1: Intro Text fades in and up (Complete by 0.25, exit natively by 0.3)
    const y1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [150, 0, 0, -150])
    const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.25, 0.3], [0, 1, 1, 0])

    // Stage 2: Staggered Glassmorphic Cards (Start natively at 0.32, exit strictly at 0.7)
    const opacityCard1 = useTransform(smoothProgress, [0.32, 0.4, 0.65, 0.7], [0, 1, 1, 0])
    const xCard1 = useTransform(smoothProgress, [0.32, 0.4, 0.65, 0.7], [-150, 0, 0, 0])
    const yCard1 = useTransform(smoothProgress, [0.32, 0.4, 0.65, 0.7], [0, 0, 0, -150])

    const opacityCard2 = useTransform(smoothProgress, [0.38, 0.46, 0.65, 0.7], [0, 1, 1, 0])
    const yCard2 = useTransform(smoothProgress, [0.38, 0.46, 0.65, 0.7], [150, 0, 0, -150])

    const opacityCard3 = useTransform(smoothProgress, [0.44, 0.52, 0.65, 0.7], [0, 1, 1, 0])
    const xCard3 = useTransform(smoothProgress, [0.44, 0.52, 0.65, 0.7], [150, 0, 0, 0])
    const yCard3 = useTransform(smoothProgress, [0.44, 0.52, 0.65, 0.7], [0, 0, 0, -150])

    // Stage 3: Closing Statement (Start 0.75 exclusively)
    const y3 = useTransform(smoothProgress, [0.75, 0.85, 1], [150, 0, 0])
    const opacity3 = useTransform(smoothProgress, [0.75, 0.85, 1], [0, 1, 1])

    const services = [
        {
            title: "UI/UX Engineering",
            desc: "Awwwards-grade digital interfaces designed with physical presence and brutalist elegance.",
            style: { opacity: opacityCard1, x: xCard1, y: yCard1 },
            gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
            borderHover: "group-hover:border-blue-400/30",
            accent: "text-blue-400",
            glow: "bg-blue-500/30"
        },
        {
            title: "AI Automation",
            desc: "Deploying intelligent agents to strip manual labor out of your high-leverage workflows.",
            style: { opacity: opacityCard2, y: yCard2 },
            gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
            borderHover: "group-hover:border-emerald-400/30",
            accent: "text-emerald-400",
            glow: "bg-emerald-500/30"
        },
        {
            title: "Scrollytelling",
            desc: "Crafting linear, scroll-driven narratives that completely hijack user attention and convert.",
            style: { opacity: opacityCard3, x: xCard3, y: yCard3 },
            gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
            borderHover: "group-hover:border-rose-400/30",
            accent: "text-rose-400",
            glow: "bg-rose-500/30"
        }
    ]

    return (
        // Boosted slightly to 400vh to give the complex staggers enough tracking timeline padding
        <section ref={containerRef} className="h-[400vh] relative bg-[#050505]" id="studio">
            <div className="h-screen sticky top-0 flex flex-col items-center justify-center px-6 md:px-12 w-full overflow-hidden">

                {/* Stage 1 */}
                <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center max-w-4xl mx-auto w-full px-4">
                    <h2 className="font-signature text-6xl md:text-8xl lg:text-[8rem] text-white/90 mb-4 md:mb-6 drop-shadow-lg">Our Capabilities</h2>
                    <p className="text-lg md:text-3xl font-light tracking-wide text-white/60 leading-relaxed italic">
                        "We lock in on raw automation and high-fidelity interfaces. Doing less, but doing it with absolute supremacy."
                    </p>
                </motion.div>

                {/* Stage 2 */}
                <div className="absolute w-full max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-12 pointer-events-none">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            style={service.style}
                            className={`flex flex-col items-start p-8 md:p-12 border-t border-l border-white/10 bg-gradient-to-br ${service.gradient} backdrop-blur-3xl group hover:bg-white/[0.02] ${service.borderHover} transition-colors shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] relative overflow-hidden pointer-events-auto rounded-3xl`}
                        >
                            {/* Ambient Glowing Light Orb (Simulates Glass Refraction) */}
                            <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full ${service.glow} blur-[80px] opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                            {/* Massive background number */}
                            <span className={`font-signature text-[8rem] md:text-[12rem] ${service.accent} opacity-5 absolute -right-4 -bottom-10 md:-bottom-16 pointer-events-none group-hover:scale-110 transition-transform duration-700`}>0{i + 1}</span>

                            <span className={`font-signature text-3xl md:text-5xl ${service.accent} mb-4 md:mb-6 z-10 relative drop-shadow-md`}>0{i + 1}.</span>
                            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-white/90 mb-4 md:mb-6 z-10 relative group-hover:text-white transition-colors duration-500">{service.title}</h3>
                            <p className="text-xs md:text-sm tracking-[0.1em] text-white/50 leading-loose font-light z-10 relative group-hover:text-white/70 transition-colors duration-500">{service.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stage 3 */}
                <motion.div style={{ y: y3, opacity: opacity3 }} className="absolute text-center w-full px-4 pointer-events-none">
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
