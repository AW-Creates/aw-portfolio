import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import CanvasSequence from './CanvasSequence'

export default function FooterOutro() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Use localized scroll strictly for the typography and form transitions
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end end']
    })

    // Stage 1: The Massive "Let's Talk" CTA (Fades in early, holds, then fades out as it slides up)
    const ctaOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.55], [0, 1, 1, 0])
    const ctaY = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.55], [50, 0, 0, -100])
    const ctaScale = useTransform(scrollYProgress, [0.1, 0.2, 0.45, 0.55], [0.95, 1, 1, 0.95])

    // Stage 2: The Brutalist Contact Form (Slides up gracefully taking the CTA's place)
    const formOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
    const formY = useTransform(scrollYProgress, [0.5, 0.7], [100, 0])

    // Stage 3: Copyright Anchor (Reveals at the absolute final tick)
    const copyOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

    return (
        // 300vh grants enough physical document height to trigger the global 0.85 -> 1.0 reverse canvas sweep algorithm
        <section ref={containerRef} className="h-[300vh] relative bg-[#050505]" id="contact">
            <div className="h-screen sticky top-0 flex flex-col items-center justify-center w-full overflow-hidden">

                {/* Absolute Background Canvas (Wired strictly to Reverse global progress) */}
                <div className="absolute inset-0 w-full h-full z-0 opacity-60 pointer-events-none">
                    <CanvasSequence isReverse={true} />
                    {/* Deep void gradients fade out the top and bottom bounds natively into pure #050505 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] z-10" />
                </div>

                {/* Foreground Stage 1: CTA Matrix */}
                <motion.div
                    style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY }}
                    className="absolute inset-0 flex flex-col items-center justify-center w-full px-6 z-20 pointer-events-none"
                >
                    <span className="text-sm md:text-xl font-light tracking-[0.5em] uppercase text-white/50 mb-8 md:mb-12">
                        End of Sequence
                    </span>
                    <h2 className="flex flex-col items-center justify-center -space-y-4 md:-space-y-12 w-full">
                        <span className="text-4xl md:text-8xl lg:text-[10rem] font-light tracking-[0.2em] uppercase text-white/90 leading-none drop-shadow-2xl z-10">
                            Let's
                        </span>
                        <span className="font-signature text-[7rem] md:text-[14rem] lg:text-[20rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_40px_rgba(99,102,241,0.6)] capitalize tracking-normal block pt-2 pb-12">
                            Talk.
                        </span>
                    </h2>
                </motion.div>

                {/* Foreground Stage 2: Brutalist Contact Form */}
                <motion.div
                    style={{ opacity: formOpacity, y: formY }}
                    className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 z-30 pointer-events-auto"
                >
                    <div className="w-full mb-12 md:mb-16 text-center">
                        <h3 className="font-signature text-5xl md:text-7xl text-[#3b82f6] drop-shadow-md mb-2 md:mb-4">Initiate</h3>
                        <p className="text-[10px] md:text-xs tracking-[0.4em] font-light text-white/50 uppercase">Secure Connection</p>
                    </div>

                    <form className="w-full space-y-8 md:space-y-12">
                        <div className="relative group">
                            <input type="text" placeholder="Identity" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors" />
                        </div>

                        <div className="relative group">
                            <input type="email" placeholder="Transmission Address" className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors" />
                        </div>

                        <div className="relative group pt-4">
                            <textarea placeholder="Project Parameters" rows={3} className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors resize-none"></textarea>
                        </div>

                        <div className="w-full flex justify-center pt-8">
                            <button type="button" className="px-16 py-5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white/90 uppercase tracking-[0.2em] text-sm hover:bg-white/10 hover:border-[#3b82f6] transition-all duration-500 hover:text-[#3b82f6] shadow-2xl hover:scale-105 group">
                                Transmit
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Foreground Stage 3: Copyright Anchor */}
                <motion.div
                    style={{ opacity: copyOpacity }}
                    className="absolute bottom-4 md:bottom-8 w-full flex justify-between items-center px-6 md:px-12 text-[8px] md:text-[10px] uppercase tracking-widest text-white/30 border-t border-white/10 pt-4 md:pt-8 pointer-events-none z-40"
                >
                    <span>© {new Date().getFullYear()} Aaron Wilcher</span>
                    <span>All Systems Operational</span>
                </motion.div>

            </div>
        </section>
    )
}
