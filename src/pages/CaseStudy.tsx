import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useEffect } from 'react'
import { projectsData } from '../data/projects'

export default function CaseStudy() {
    const { id } = useParams()
    
    // Automatically snap viewport to the top natively on mount or route change to counter native router caching
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
    const yImage = useTransform(scrollYProgress, [0, 1], [0, 300])
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    if (!id || !projectsData[id]) {
        return <Navigate to="/" />
    }

    const project = projectsData[id]
    
    // Calculate Next Project
    const projectKeys = Object.keys(projectsData)
    const currentIndex = projectKeys.indexOf(id)
    const nextIndex = (currentIndex + 1) % projectKeys.length
    const nextProjectId = projectKeys[nextIndex]
    const nextProject = projectsData[nextProjectId]

    return (
        <PageTransition>
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-x-hidden"
                ref={containerRef}
                key={id} // Force React to fully re-mount the component when ID changes so animations reset natively
            >
                {/* Return Navigation Anchor */}
                <Link to="/" className="fixed top-8 md:top-12 left-6 md:left-12 z-50 text-white/50 hover:text-white uppercase tracking-[0.3em] text-[10px] md:text-xs font-light transition-all hover:-translate-x-2 block bg-[#050505]/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                    &larr; Index
                </Link>

                {/* Cinematic Header Block */}
                <motion.div style={{ opacity: opacityText }} className="pt-32 md:pt-40 px-6 md:px-12 max-w-[100rem] mx-auto w-full z-20 flex flex-col items-start pb-12 md:pb-20">
                    <p className="text-[#3b82f6] tracking-[0.4em] text-[10px] md:text-sm uppercase mb-4 drop-shadow-md">{project.category} / {project.id}</p>
                    <h1 className="text-5xl md:text-[8rem] lg:text-[10rem] font-signature bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40 drop-shadow-2xl leading-none">
                        {project.title.split(' ')[0]} <br className="hidden md:block" /> {project.title.split(' ').slice(1).join(' ')}
                    </h1>
                    
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 mt-16 md:mt-24 border-t border-white/10 pt-8 w-full">
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Role</p>
                            <p className="text-sm md:text-base font-light text-white/80">{project.role}</p>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Timeline</p>
                            <p className="text-sm md:text-base font-light text-white/80">{project.timeline}</p>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Tech Stack</p>
                            <p className="text-sm md:text-base font-light text-white/80">{project.techStack.join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Live Demo</p>
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm md:text-base font-light text-[#3b82f6] hover:text-white transition-colors underline underline-offset-4 decoration-white/20">View Project &nearr;</a>
                        </div>
                    </div>
                </motion.div>

                {/* Massive Parallax Hero Image */}
                <div className="relative w-full h-[50vh] md:h-[90vh] overflow-hidden">
                    <motion.div style={{ y: yImage }} className="absolute inset-0 -top-[20%] w-full h-[140%] bg-[#050505]">
                        <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
                    </motion.div>
                </div>

            {/* Primary Context Container */}
            <div className="max-w-4xl mx-auto px-6 py-20 md:py-32 z-20 relative bg-[#050505] w-full text-white/70 font-light text-lg md:text-2xl leading-loose">
                <div className="border-l border-[#3b82f6] pl-6 md:pl-12">
                    <p>{project.description}</p>
                </div>
            </div>

            {/* Process Gallery */}
            <div className="max-w-[100rem] mx-auto px-6 md:px-12 pb-32 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-20">
                {project.gallery.map((img, idx) => (
                    <div key={idx} className={`relative overflow-hidden group rounded-2xl border border-white/10 ${img.span === 'full' ? 'md:col-span-2 aspect-video' : 'aspect-square'}`}>
                        <img src={img.url} alt={`Process shot ${idx + 1}`} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2s] ease-[0.22,1,0.36,1] opacity-80 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-[#3b82f6]/0 group-hover:bg-[#3b82f6]/10 transition-colors duration-700 mix-blend-overlay pointer-events-none" />
                    </div>
                ))}
            </div>

            {/* Next Project Trap Footer */}
            <Link to={`/work/${nextProject.id}`} className="relative w-full h-[60vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden group border-t border-white/10 block">
                <div className="absolute inset-0 z-0 bg-[#050505]">
                    <img src={nextProject.heroImage} alt={nextProject.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-40 scale-100 group-hover:scale-105 transition-all duration-[2s] ease-[0.22,1,0.36,1] mix-blend-luminosity" />
                </div>
                <div className="z-10 flex flex-col items-center">
                    <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-4 group-hover:text-[#3b82f6] transition-colors duration-500">Up Next</p>
                    <h2 className="text-4xl md:text-8xl lg:text-[10rem] font-signature text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20 drop-shadow-xl group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] leading-none text-center">
                        {nextProject.title}
                    </h2>
                </div>
                <div className="absolute bottom-12 z-10 text-white/30 group-hover:text-white uppercase tracking-widest text-xs md:text-sm font-light transition-colors duration-500 flex items-center gap-4">
                    Continue Exploring <span className="text-xl">&rarr;</span>
                </div>
            </Link>

        </motion.section>
        </PageTransition>
    )
}
