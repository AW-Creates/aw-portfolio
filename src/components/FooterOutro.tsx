import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import CanvasSequence from './CanvasSequence'

export default function FooterOutro() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isFormActive, setIsFormActive] = useState(false)
    
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
        if (!accessKey) {
            setFormStatus('error')
            setErrorMessage('Web3Forms Access Key is missing in .env')
            return
        }

        setFormStatus('loading')

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            })

            const result = await response.json()
            if (result.success) {
                setFormStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setFormStatus('error')
                setErrorMessage(result.message || 'Transmission failed')
            }
        } catch (error) {
            setFormStatus('error')
            setErrorMessage('Network error during transmission')
        }
    }

    // Track scroll with offset 'start end' meaning progress begins when the top of the footer hits the bottom of the viewport
    // The progress hits 0.33 when the container finally locks into its sticky top-0 position!
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end end']
    })

    // Stage 1: The Massive "Let's Talk" CTA
    // Clamped strictly to start fading in at 0.1, locking at 0.3, and vanishing before 0.6.
    const ctaOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.50, 0.60, 1], [0, 0, 1, 1, 0, 0])
    const ctaY = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.50, 0.60, 1], [50, 50, 0, 0, -100, -100])
    const ctaScale = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.50, 0.60, 1], [0.95, 0.95, 1, 1, 0.95, 0.95])

    // Stage 2: The Brutalist Contact Form
    // Explicitly stays ZERO from 0.0 to 0.60, ensuring it NEVER appears early. Fades in natively hitting 1.0 at 0.80 and locking.
    const formOpacity = useTransform(scrollYProgress, [0, 0.60, 0.80, 1], [0, 0, 1, 1])
    const formY = useTransform(scrollYProgress, [0, 0.60, 0.80, 1], [100, 100, 0, 0])

    // Stage 3: Copyright Anchor
    const copyOpacity = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, 1])

    // Dynamically strip pointer events out of overlapping absolute elements to ensure interaction safety
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest >= 0.60 && !isFormActive) setIsFormActive(true)
        else if (latest < 0.60 && isFormActive) setIsFormActive(false)
    })

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
                    initial={{ opacity: 0 }}
                    style={{ opacity: ctaOpacity, scale: ctaScale, y: ctaY }}
                    className={`absolute inset-0 flex flex-col items-center justify-center w-full px-6 z-20 ${!isFormActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                    <span className="text-sm md:text-xl font-light tracking-[0.5em] uppercase text-white/50 mb-8 md:mb-12">
                        End of Sequence
                    </span>
                    <h2 className="flex flex-col items-center justify-center -space-y-4 md:-space-y-12 w-full group cursor-pointer">
                        <span className="text-4xl md:text-8xl lg:text-[10rem] font-light tracking-[0.2em] uppercase text-white/90 leading-none drop-shadow-2xl transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-105 z-10">
                            Let's
                        </span>
                        <span className="font-signature text-[7rem] md:text-[14rem] lg:text-[20rem] leading-none text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-[0_0_40px_rgba(99,102,241,0.6)] capitalize tracking-normal block pt-2 transition-transform duration-[1.5s] ease-[0.22,1,0.36,1] group-hover:scale-[1.1] pb-12">
                            Talk.
                        </span>
                    </h2>

                    <a href="mailto:hello@aaronwilcher.com" className="mt-8 md:mt-16 px-12 py-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/80 uppercase tracking-widest text-sm hover:bg-white/10 hover:border-[#3b82f6] transition-all duration-500 hover:scale-105 shadow-2xl relative overflow-hidden group">
                        <span className="relative z-10">Initiate Contact</span>
                        <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 duration-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-0"></div>
                    </a>
                </motion.div>

                {/* Foreground Stage 2: Brutalist Contact Form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    style={{ opacity: formOpacity, y: formY }}
                    className={`absolute inset-0 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-6 z-30 ${isFormActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                    <div className="w-full mb-12 md:mb-16 text-center">
                        <h3 className="font-signature text-5xl md:text-7xl text-[#3b82f6] drop-shadow-md mb-2 md:mb-4">Initiate</h3>
                        <p className="text-[10px] md:text-xs tracking-[0.4em] font-light text-white/50 uppercase">Secure Connection</p>
                    </div>

                    <form className="w-full space-y-8 md:space-y-12" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Identity" 
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors" 
                            />
                        </div>

                        <div className="relative group">
                            <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                placeholder="Transmission Address" 
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors" 
                            />
                        </div>

                        <div className="relative group pt-4">
                            <textarea 
                                required
                                value={formData.message}
                                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                placeholder="Project Parameters" 
                                rows={3} 
                                className="w-full bg-transparent border-b border-white/20 pb-4 text-white placeholder-white/30 text-lg md:text-2xl font-light focus:outline-none focus:border-[#3b82f6] transition-colors resize-none"
                            ></textarea>
                        </div>

                        {formStatus === 'error' && (
                            <div className="text-red-400 text-sm md:text-base text-center tracking-widest uppercase font-light">
                                ERROR: {errorMessage}
                            </div>
                        )}
                        {formStatus === 'success' && (
                            <div className="text-green-400 text-sm md:text-base text-center tracking-widest uppercase font-light">
                                Transmission Successful
                            </div>
                        )}

                        <div className="w-full flex justify-center pt-8">
                            <button 
                                type="submit" 
                                disabled={formStatus === 'loading'}
                                className="px-16 py-5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white/90 uppercase tracking-[0.2em] text-sm hover:bg-white/10 hover:border-[#3b82f6] transition-all duration-500 hover:text-[#3b82f6] shadow-2xl hover:scale-105 group inline-block overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:border-white/30 disabled:hover:text-white/90"
                            >
                                <span className="relative z-10 pointer-events-none">
                                    {formStatus === 'loading' ? 'Transmitting...' : 'Transmit'}
                                </span>
                                <div className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 duration-500 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-0 pointer-events-none"></div>
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
