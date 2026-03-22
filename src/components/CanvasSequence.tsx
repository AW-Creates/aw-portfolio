import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

interface Props {
    onLoadComplete?: () => void;
}

export default function CanvasSequence({ onLoadComplete }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [loaded, setLoaded] = useState(0)
    const frameCount = 232

    const { scrollYProgress } = useScroll()
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

    // Finish the sequence earlier (at 85% progress) so the last frame holds while scrolling out
    const frameIndex = useTransform(smoothProgress, [0, 0.85], [0, frameCount - 1])

    useEffect(() => {
        const loadedImages: HTMLImageElement[] = []
        let loadedCount = 0

        const loadSequence = async () => {
            for (let i = 1; i <= frameCount; i++) {
                const img = new Image()
                const paddedNum = i.toString().padStart(3, '0')
                img.src = `/sequence/ezgif-frame-${paddedNum}.jpg`
                img.onload = () => {
                    loadedCount++
                    loadedImages[i - 1] = img
                    setLoaded(Math.floor((loadedCount / frameCount) * 100))
                    if (loadedCount === frameCount) {
                        setImages(loadedImages)
                        if (onLoadComplete) onLoadComplete() // Trigger text fade-in
                    }
                }
            }
        }
        loadSequence()
    }, [])

    const drawImageCentered = (ctx: CanvasRenderingContext2D, logicalWidth: number, logicalHeight: number, img: HTMLImageElement) => {
        if (!img) return
        const hRatio = logicalWidth / img.width
        const vRatio = logicalHeight / img.height
        // Fill bounding box (cover)
        const ratio = Math.max(hRatio, vRatio)
        const centerShift_x = (logicalWidth - img.width * ratio) / 2
        const centerShift_y = (logicalHeight - img.height * ratio) / 2

        ctx.clearRect(0, 0, logicalWidth, logicalHeight)
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
    }

    useEffect(() => {
        if (images.length !== frameCount) return

        const unsubscribe = frameIndex.on("change", (latest) => {
            const idx = Math.floor(latest)
            if (images[idx] && canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d')
                if (ctx) drawImageCentered(ctx, window.innerWidth, window.innerHeight, images[idx])
            }
        })

        const handleResize = () => {
            if (canvasRef.current && window.innerWidth > 0) {
                const dpr = window.devicePixelRatio || 1;
                const logicalWidth = window.innerWidth;
                const logicalHeight = window.innerHeight;

                // Retina crisp canvas dimensions
                canvasRef.current.width = logicalWidth * dpr;
                canvasRef.current.height = logicalHeight * dpr;
                canvasRef.current.style.width = `${logicalWidth}px`;
                canvasRef.current.style.height = `${logicalHeight}px`;

                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.scale(dpr, dpr);
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';

                    const idx = Math.floor(frameIndex.get());
                    if (images[idx]) {
                        drawImageCentered(ctx, logicalWidth, logicalHeight, images[idx]);
                    }
                }
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            unsubscribe()
            window.removeEventListener('resize', handleResize)
        }
    }, [images, frameIndex])

    return (
        <div className="relative w-full h-full bg-white dark:bg-[#050505]">
            {/* Luxury Loading State */}
            <div
                className={`absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#050505] z-50 transition-all duration-1000 ease-in-out pointer-events-none ${loaded === 100 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            >
                <div className="relative mb-12">
                    {/* Slowly spinning A-W Icons on X-axis (Theme swapped) */}
                    <motion.img
                        src="/icon-white.png"
                        className="w-20 h-20 object-contain drop-shadow-xl hidden dark:block"
                        alt="AWC Logo"
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.img
                        src="/icon-dark.png"
                        className="w-20 h-20 object-contain drop-shadow-xl block dark:hidden"
                        alt="AWC Logo"
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="text-black/60 dark:text-white/60 tracking-[0.5em] text-[10px] uppercase mb-6 font-medium">Initializing Protocol</div>
                <div className="w-64 h-[2px] bg-black/5 dark:bg-white/5 overflow-hidden">
                    <div className="h-full bg-black dark:bg-white transition-all ease-out duration-300" style={{ width: `${loaded}%` }} />
                </div>
                <div className="text-black/30 dark:text-white/30 tracking-widest text-[9px] mt-4 font-mono">{loaded}% READY</div>
            </div>

            <canvas
                ref={canvasRef}
                className="block"
            />

            {/* Heavy frosted tint for Light mode, Dark contrast overlay for Dark mode */}
            <div className="absolute inset-0 bg-white/70 dark:bg-black/55 pointer-events-none transition-colors duration-500" />
        </div>
    )
}
