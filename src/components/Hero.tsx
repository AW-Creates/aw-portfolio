import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import CanvasSequence from './CanvasSequence'

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
        <div ref={containerRef} className="h-[400vh] relative bg-white dark:bg-[#050505] selection:bg-black/20 dark:selection:bg-white/20 transition-colors duration-500">
            {/* <ThemeToggle /> */}

            <div className="h-screen sticky top-0 overflow-hidden flex w-full">

                {/* Absolute Bottom Canvas Layer (with pure alpha mask for flawless integration) */}
                <div className="absolute inset-0 z-0 bg-white dark:bg-[#050505] transition-colors duration-500 [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]">
                    <CanvasSequence onLoadComplete={() => setIsSequenceLoaded(true)} />
                </div>

                {/* Floating Typography Layout */}
                <div className={`relative z-10 flex w-full h-full pointer-events-none px-6 md:px-12 lg:px-24 transition-opacity duration-1000 delay-[800ms] ${isSequenceLoaded ? 'opacity-100' : 'opacity-0'}`}>

                    {/* BEAT A */}
                    <motion.div style={{ opacity: opacityA, y: yA }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        {/* White Signature Logo for Dark Mode */}
                        <img
                            src="/signature-logo.png"
                            alt="Aaron Wilcher"
                            className="w-[85vw] max-w-[800px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] hidden dark:block"
                        />
                        {/* Dark Signature Logo for Light Mode */}
                        <img
                            src="/signature-logo-dark.png"
                            alt="Aaron Wilcher"
                            className="w-[85vw] max-w-[800px] h-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.1)] block dark:hidden"
                        />

                        <p className="mt-8 md:mt-12 text-[11px] md:text-sm text-black/80 dark:text-white/80 tracking-[0.4em] font-medium uppercase drop-shadow-md">PREMIUM AI AUTOMATION</p>
                    </motion.div>

                    {/* BEAT B */}
                    <motion.div style={{ opacity: opacityB, y: yB }} className="absolute left-6 lg:left-24 top-1/2 -translate-y-1/2 flex flex-col items-start max-w-[280px] md:max-w-md">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase text-black/90 dark:text-white/90 leading-[1.1] relative">
                            <span className="font-signature font-normal tracking-normal normal-case text-5xl md:text-6xl lg:text-[5rem] block w-full mb-1 text-black/70 dark:text-white/70">The</span>
                            <span className="relative z-0 block">FIRST<br />AUTOMATION</span>
                        </h2>
                        <p className="mt-6 md:mt-8 text-[10px] md:text-xs text-black/50 dark:text-white/50 leading-loose font-light tracking-[0.2em] uppercase">
                            Building intelligent systems that power your first major breakthrough.
                        </p>
                    </motion.div>

                    {/* BEAT C */}
                    <motion.div style={{ opacity: opacityC, y: yC }} className="absolute right-6 lg:right-24 top-1/2 -translate-y-1/2 flex flex-col items-end text-right justify-center max-w-[280px] md:max-w-md">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-widest uppercase text-black/90 dark:text-white/90 leading-[1.1] relative">
                            <span className="relative z-0 block">PREMIUM</span>
                            <span className="font-signature font-normal tracking-normal normal-case text-5xl md:text-6xl lg:text-[5rem] block mt-1 text-black/70 dark:text-white/70">Engineering</span>
                        </h2>
                        <p className="mt-6 md:mt-8 text-[10px] md:text-xs text-black/50 dark:text-white/50 leading-loose font-light tracking-[0.2em] uppercase text-right">
                            Interfaces that refuse to be ignored and automations that save countless hours.
                        </p>
                    </motion.div>

                    {/* BEAT D (Massive Scale + Glassmorphism Pull) */}
                    <motion.div style={{ opacity: opacityD, y: yD }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <h2 className="font-signature font-normal tracking-normal capitalize text-[6.5rem] md:text-[10rem] lg:text-[12rem] text-black/90 dark:text-white/90 drop-shadow-xl dark:drop-shadow-2xl z-10 relative">
                            Ready?
                        </h2>
                        <p className="mt-[-10px] md:mt-[-20px] text-sm md:text-base text-black/80 dark:text-white/80 tracking-[0.3em] font-medium uppercase transition-colors z-0 relative drop-shadow-md">Let's construct the future.</p>

                        {/* Glassmorphism Pill */}
                        <button className="mt-10 md:mt-14 px-8 py-3 md:px-10 md:py-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-black/80 dark:text-white/90 hover:bg-black/10 dark:hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-300 font-medium tracking-[0.2em] uppercase text-[9px] md:text-[11px] pointer-events-auto rounded-full shadow-2xl">
                            Explore The Work
                        </button>
                    </motion.div>

                </div>

            </div>
        </div>
    )
}
