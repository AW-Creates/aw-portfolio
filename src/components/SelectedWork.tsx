import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const projects = [
    {
        id: '01',
        title: 'Aura Sync',
        category: 'AI Automation / UI Design',
        color: 'from-blue-500/10 to-indigo-500/10',
        glow: 'bg-blue-500/30'
    },
    {
        id: '02',
        title: 'Nexus Architecture',
        category: 'Web3 Platform',
        color: 'from-emerald-500/10 to-teal-500/10',
        glow: 'bg-emerald-500/30'
    },
    {
        id: '03',
        title: 'Quantum Dashboard',
        category: 'Fintech Interface',
        color: 'from-orange-500/10 to-red-500/10',
        glow: 'bg-orange-500/30'
    },
    {
        id: '04',
        title: 'Echelon',
        category: 'E-Commerce Scrollytelling',
        color: 'from-pink-500/10 to-rose-500/10',
        glow: 'bg-pink-500/30'
    }
]

export default function SelectedWork() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'] // Track while section is anywhere in viewport
    })

    // Deep Parallax: Right column scrolls significantly faster than the left column
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -300])
    const yLeft = useTransform(scrollYProgress, [0, 1], [0, 100])

    return (
        // Maintain the #050505 void for cinematic blending
        <section ref={containerRef} className="py-24 md:py-48 relative bg-[#050505] overflow-hidden" id="work">

            {/* Title block */}
            <div className="px-6 md:px-12 w-full max-w-[100rem] mx-auto mb-20 md:mb-32">
                <h2 className="flex flex-col items-start -space-y-4 md:-space-y-12 w-full">
                    <span className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.4em] uppercase text-white/70 leading-relaxed block z-10 drop-shadow-md">
                        Selected
                    </span>
                    <span className="font-signature text-[6rem] md:text-[11rem] lg:text-[15rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] tracking-normal block pt-2 pb-6 md:pb-12">
                        Work.
                    </span>
                </h2>
            </div>

            <div className="max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative z-10">

                {/* Left Column (Evens) - Moves gently downwards */}
                <motion.div style={{ y: yLeft }} className="flex flex-col gap-12 md:gap-32">
                    {projects.filter((_, i) => i % 2 === 0).map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </motion.div>

                {/* Right Column (Odds) - Starts lower for masonry look, moves aggressively upwards */}
                <motion.div style={{ y: yRight }} className="flex flex-col gap-12 md:gap-32 mt-0 md:mt-[200px]">
                    {projects.filter((_, i) => i % 2 !== 0).map((project) => (
                        <ProjectCard key={project.id} {...project} />
                    ))}
                </motion.div>

            </div>
        </section>
    )
}

function ProjectCard({ id, title, category, color, glow }: { id: string, title: string, category: string, color: string, glow: string }) {
    return (
        <div className="group cursor-pointer w-full">
            {/* Aspect ratio container completely rewritten to Awwwards True-Glassmorphism rules */}
            <div className={`w-full aspect-[4/5] bg-gradient-to-br ${color} mb-6 md:mb-8 overflow-hidden relative border-t border-l border-white/10 bg-white/[0.01] backdrop-blur-3xl group-hover:bg-white/[0.03] group-hover:border-white/20 transition-all duration-700 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-[2rem]`}>

                {/* Ambient Glowing Light Orb (Simulates Massive Glass LED Refraction) */}
                {/* It starts dim, but surges to massive brightness on hover, causing the glass filter to heavily interact */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full ${glow} blur-[120px] opacity-10 group-hover:opacity-100 transition-opacity duration-[1.5s] ease-[0.22,1,0.36,1] pointer-events-none`} />

                {/* Placeholder for actual future case study imagery */}
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1]"></div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mix-blend-overlay">
                    {/* Huge signature backdrop numbers. Mix-blend forces them to bleed directly into the sub-glass neon color! */}
                    <span className="font-signature text-white/50 text-[15rem] md:text-[25rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-[1.3] transition-transform duration-[4s] ease-[0.22,1,0.36,1] drop-shadow-2xl">{id}</span>
                </div>
            </div>

            {/* Meta data Block (Now reacts smoothly to parent glass interactions) */}
            <div className="flex justify-between items-start border-t border-white/10 pt-6 px-1 md:px-2">
                <div className="flex flex-col">
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-widest text-white/90 mb-1 group-hover:text-[#3b82f6] transition-colors duration-500">{title}</h3>
                    <p className="text-[10px] md:text-xs tracking-[0.2em] font-light text-white/30 uppercase group-hover:text-white/60 transition-colors duration-500">{category}</p>
                </div>
                <span className="font-signature text-2xl md:text-3xl text-white/30 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white/90">Details &rarr;</span>
            </div>
        </div>
    )
}
