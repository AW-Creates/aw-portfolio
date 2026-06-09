import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'

import { projectsData } from '../data/projects'

export default function SelectedWork() {
    const projects = Object.values(projectsData)
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
                    {projects.filter((_, i) => i % 2 === 0).map((project, i) => (
                        <ProjectCard key={project.id} {...project} index={i * 2} />
                    ))}
                </motion.div>

                {/* Right Column (Odds) - Starts lower for masonry look, moves aggressively upwards */}
                <motion.div style={{ y: yRight }} className="flex flex-col gap-12 md:gap-32 mt-0 md:mt-[200px]">
                    {projects.filter((_, i) => i % 2 !== 0).map((project, i) => (
                        <ProjectCard key={project.id} {...project} index={(i * 2) + 1} />
                    ))}
                </motion.div>

            </div>
        </section>
    )
}

function ProjectCard({ id, title, category, heroImage, index }: { id: string, title: string, category: string, heroImage: string, index: number }) {
    // Map index to a specific glassmorphic color gradient
    const gradients = [
        { color: 'from-blue-500/10 to-indigo-500/10', glow: 'bg-blue-500/30' },
        { color: 'from-emerald-500/10 to-teal-500/10', glow: 'bg-emerald-500/30' },
        { color: 'from-orange-500/10 to-red-500/10', glow: 'bg-orange-500/30' },
        { color: 'from-pink-500/10 to-rose-500/10', glow: 'bg-pink-500/30' }
    ]
    const style = gradients[index % gradients.length]
    const { color, glow } = style

    return (
        <Link to={`/work/${id}`} className="group cursor-pointer w-full block">
            {/* Aspect ratio container completely rewritten to integrate the massive image natively */}
            <div className={`w-full aspect-[4/5] bg-gradient-to-br ${color} overflow-hidden relative border-t border-l border-white/10 bg-white/[0.01] backdrop-blur-3xl group-hover:border-white/30 transition-all duration-700 shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)] rounded-[2rem]`}>

                {/* Massive Architectural Image Preview */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImage} 
                        alt={title}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    {/* Deep shadow gradient rising from bottom so text remains legible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                </div>

                {/* Ambient Glowing Light Orb (Simulates Massive Glass LED Refraction) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full ${glow} blur-[120px] opacity-10 group-hover:opacity-40 transition-opacity duration-[1.5s] ease-[0.22,1,0.36,1] pointer-events-none z-10`} />

                {/* Number Watermark */}
                <div className="absolute top-6 right-8 pointer-events-none z-20">
                    <span className="font-signature text-white/30 group-hover:text-white/80 transition-colors duration-700 text-6xl drop-shadow-lg">{id}</span>
                </div>

                {/* Details overlay snapping to bottom */}
                <div className="absolute bottom-0 left-0 w-full p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
                    <div className="flex flex-col">
                        <p className="text-[10px] md:text-xs tracking-[0.3em] font-light text-[#3b82f6] uppercase mb-2 drop-shadow-md">{category}</p>
                        <h3 className="text-2xl md:text-4xl font-light tracking-wide text-white mb-6 drop-shadow-xl">{title}</h3>
                        
                        <div className="flex items-center gap-3 overflow-hidden">
                            <span className="w-10 h-[1px] bg-white/40 group-hover:bg-white transition-colors duration-500" />
                            <span className="text-xs uppercase tracking-[0.2em] font-medium text-white/60 group-hover:text-white transition-colors duration-500">
                                View Case Study
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
