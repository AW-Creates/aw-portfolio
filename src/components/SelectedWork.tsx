import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const projects = [
    {
        id: '01',
        title: 'Aura Sync',
        category: 'AI Automation / UI Design',
        color: 'from-blue-500/10 to-purple-500/10'
    },
    {
        id: '02',
        title: 'Nexus Architecture',
        category: 'Web3 Platform',
        color: 'from-emerald-500/10 to-teal-500/10'
    },
    {
        id: '03',
        title: 'Quantum Dashboard',
        category: 'Fintech Interface',
        color: 'from-orange-500/10 to-red-500/10'
    },
    {
        id: '04',
        title: 'Echelon',
        category: 'E-Commerce Scrollytelling',
        color: 'from-pink-500/10 to-rose-500/10'
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
                <h2 className="text-6xl md:text-[8rem] lg:text-[12rem] font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] leading-[0.9]">
                    Selected<br />
                    <span className="text-white/90 [-webkit-text-stroke:0px] drop-shadow-2xl">Work.</span>
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

function ProjectCard({ id, title, category, color }: { id: string, title: string, category: string, color: string }) {
    return (
        <div className="group cursor-pointer w-full">
            {/* Aspect ratio container for massive project image */}
            <div className={`w-full aspect-[4/5] bg-gradient-to-br ${color} mb-6 md:mb-8 overflow-hidden relative border border-white/5`}>
                {/* Placeholder for future Image (Blur overlay creates a frosted structural look) */}
                <div className="absolute inset-0 bg-[#0a0a0a]/50 backdrop-blur-xl group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1]"></div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Huge structural background numbering intersecting the image logic */}
                    <span className="font-signature text-white/5 text-[15rem] md:text-[25rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-[1.3] transition-transform duration-[2s] ease-[0.22,1,0.36,1]">{id}</span>
                </div>
            </div>

            {/* Meta data */}
            <div className="flex justify-between items-start border-t border-white/10 pt-6">
                <div>
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-widest text-white/90 mb-2 group-hover:text-[#3b82f6] transition-colors">{title}</h3>
                    <p className="text-[10px] md:text-xs tracking-[0.2em] font-light text-white/40 uppercase">{category}</p>
                </div>
                <span className="font-signature text-xl md:text-2xl text-white/30 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white/90">Details &rarr;</span>
            </div>
        </div>
    )
}
