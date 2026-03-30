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

    // Stage 1: Intro Text (0 - 0.25)
    const y1 = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [150, 0, 0, -150])
    const opacity1 = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0])

    // Stage 2: Cards (0.28 - 0.6)
    const opacityCard1 = useTransform(smoothProgress, [0.28, 0.35, 0.55, 0.6], [0, 1, 1, 0])
    const xCard1 = useTransform(smoothProgress, [0.28, 0.35, 0.55, 0.6], [-150, 0, 0, 0])
    const yCard1 = useTransform(smoothProgress, [0.28, 0.35, 0.55, 0.6], [0, 0, 0, -150])

    const opacityCard2 = useTransform(smoothProgress, [0.33, 0.40, 0.55, 0.6], [0, 1, 1, 0])
    const yCard2 = useTransform(smoothProgress, [0.33, 0.40, 0.55, 0.6], [150, 0, 0, -150])

    const opacityCard3 = useTransform(smoothProgress, [0.38, 0.45, 0.55, 0.6], [0, 1, 1, 0])
    const xCard3 = useTransform(smoothProgress, [0.38, 0.45, 0.55, 0.6], [150, 0, 0, 0])
    const yCard3 = useTransform(smoothProgress, [0.38, 0.45, 0.55, 0.6], [0, 0, 0, -150])


    // Stage 3: Outro Sequence (Fades in completely staggered)

    // "I Don't Follow" fades in at 0.65
    const opacity3 = useTransform(smoothProgress, [0.65, 0.7, 1], [0, 1, 1])

    // "Trends." drops explicitly later at 0.77
    const opacityTrends = useTransform(smoothProgress, [0.77, 0.83, 1], [0, 1, 1])

    // Paragraph Sweep drastically delayed to 0.88, locking at 0.94.
    // This leaves 0.94 to 1.0 (6% of 500vh) as a pure scrolling "hold" loop for reading!
    const paragraphReveal = useTransform(smoothProgress, [0.88, 0.94, 1], ["100%", "0%", "0%"])

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
        // Expanded array duration to 500vh to map massive deadzones around the final text resolution!
        <section ref={containerRef} className="h-[500vh] relative bg-[#050505]" id="studio">
            <div className="h-screen sticky top-0 flex flex-col items-center justify-center px-6 md:px-12 w-full overflow-hidden">

                {/* Stage 1 */}
                <motion.div style={{ y: y1, opacity: opacity1 }} className="absolute text-center max-w-4xl mx-auto w-full px-4">
                    <h2 className="font-signature text-6xl md:text-8xl lg:text-[8rem] text-white/90 mb-4 md:mb-6 drop-shadow-lg">My Capabilities</h2>
                    <p className="text-lg md:text-3xl font-light tracking-wide text-white/60 leading-relaxed italic">
                        "I lock in on raw automation and high-fidelity interfaces. Doing less, but doing it with absolute supremacy."
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
                <motion.div style={{ opacity: opacity3 }} className="absolute text-center w-full px-4 pointer-events-none flex flex-col items-center justify-center">

                    <h2 className="text-center flex flex-col items-center justify-center -space-y-4 md:-space-y-12 w-full">
                        <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.4em] uppercase text-white/70 leading-relaxed block z-10 drop-shadow-md">
                            I Don't Follow
                        </span>
                        {/* Delayed Entrance strictly at 0.77 */}
                        <motion.span
                            style={{ opacity: opacityTrends }}
                            animate={{ scale: [1, 1.02, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="font-signature text-[6rem] md:text-[11rem] lg:text-[15rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] tracking-normal block pt-2 pb-6 md:pb-12"
                        >
                            Trends.
                        </motion.span>
                    </h2>

                    <motion.p
                        style={{
                            opacity: opacityTrends,
                            backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 40%, rgba(255,255,255,0.05) 60%)",
                            backgroundSize: "200% 100%",
                            backgroundPositionX: paragraphReveal,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent"
                        }}
                        className="text-base md:text-3xl font-light tracking-wide leading-relaxed italic -mt-6 md:-mt-10 max-w-4xl mx-auto drop-shadow-lg"
                    >
                        "I dictate the aesthetic baseline. Built to scale, engineered to convert, and entirely immune to visual decay."
                    </motion.p>

                </motion.div>

            </div>
        </section>
    )
}
