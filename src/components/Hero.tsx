import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import CanvasSequence from './CanvasSequence'
import ThemeToggle from './ThemeToggle'

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isSequenceLoaded, setIsSequenceLoaded] = useState(false)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    // Butter-smooth physics for text tracking
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // ------------------------------------------------------------------------
    // SCROLLYTELLING BEATS MAPPING
    // ------------------------------------------------------------------------

    const opacityA = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0])
    const yA = useTransform(smoothProgress, [0, 0.2], [0, -50])

    const opacityB = useTransform(smoothProgress, [0.15, 0.25, 0.4, 0.45], [0, 1, 1, 0])
    const yB = useTransform(smoothProgress, [0.15, 0.25, 0.4, 0.45], [20, 0, 0, -20])

    const opacityC = useTransform(smoothProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0])
    const yC = useTransform(smoothProgress, [0.35, 0.45, 0.65, 0.7], [20, 0, 0, -20])

    const opacityD = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1])
    const yD = useTransform(smoothProgress, [0.65, 0.75], [20, 0])

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#050505] selection:bg-white/20">
            <ThemeToggle />

            <div className="h-screen sticky top-0 overflow-hidden flex w-full">

                {/* Absolute Bottom Canvas Layer (with pure alpha mask for flawless integration) */}
                <div className="absolute inset-0 z-0 bg-[#050505] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                    <CanvasSequence onLoadComplete={() => setIsSequenceLoaded(true)} />
                </div>

                {/* Floating Typography Layout */}
                <div className={`relative z-10 flex w-full h-full pointer-events-none px-6 md:px-12 lg:px-24 transition-opacity duration-1000 delay-[800ms] ${isSequenceLoaded ? 'opacity-100' : 'opacity-0'}`}>

                    {/* BEAT A */}
                    <motion.div style={{ opacity: opacityA, y: yA }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <img
                            src="/signature-logo.png"
                            alt="Aaron Wilcher Signature"
                            className="w-[85vw] max-w-[800px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        />
                        <p className="mt-8 md:mt-12 text-sm md:text-lg text-white/60 tracking-[0.3em] font-light uppercase drop-shadow-lg">Premium AI Automation</p>
                    </motion.div>

                    {/* BEAT B */}
                    <motion.div style={{ opacity: opacityB, y: yB }} className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start max-w-[280px] md:max-w-md">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 leading-[0.9]">
                            <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] block text-5xl md:text-8xl w-full">THE</span>
                            FIRST<br />AUTOMATION
                        </h2>
                        <p className="mt-8 text-sm md:text-lg text-white/60 leading-relaxed font-light">
                            Building the intelligent systems and integrations that power your first major breakthrough. We strip back the complex.
                        </p>
                    </motion.div>

                    {/* BEAT C */}
                    <motion.div style={{ opacity: opacityC, y: yC }} className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right justify-center max-w-[280px] md:max-w-md">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/90 leading-[0.9]">
                            PREMIUM<br />
                            <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] block text-5xl md:text-8xl">ENGINEERING</span>
                        </h2>
                        <p className="mt-8 text-sm md:text-lg text-white/60 leading-relaxed font-light">
                            We design digital experiences that feel distinctly physical. Interfaces that refuse to be ignored and automations that save countless hours.
                        </p>
                    </motion.div>

                    {/* BEAT D */}
                    <motion.div style={{ opacity: opacityD, y: yD }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)] uppercase drop-shadow-2xl">
                            READY?
                        </h2>
                        <p className="mt-6 md:mt-8 text-sm md:text-xl text-white/60 tracking-[0.3em] font-light uppercase">Let's construct the future.</p>
                        <button className="mt-12 px-10 py-5 bg-white text-[#050505] font-bold tracking-widest uppercase text-xs hover:scale-105 active:scale-95 transition-transform pointer-events-auto rounded-none">
                            Explore The Work
                        </button>
                    </motion.div>

                </div>

            </div>
        </div>
    )
}
