import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Fake loading progress
    const duration = 1500 // 1.5 seconds
    const interval = 16 // ~60fps
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      // Custom easing function for loading (easeOutExpo)
      const easeOutExpo = currentStep === steps ? 1 : 1 - Math.pow(2, -10 * currentStep / steps)
      const currentProgress = Math.min(Math.round(easeOutExpo * 100), 100)
      
      setProgress(currentProgress)

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(onComplete, 300) // slight delay at 100%
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-white"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      <div className="overflow-hidden">
        <motion.h1 
          className="text-7xl md:text-9xl font-signature font-light tracking-tighter"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {progress}%
        </motion.h1>
      </div>
      <motion.div 
        className="absolute bottom-12 uppercase tracking-[0.3em] text-[10px] text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Initializing Experience
      </motion.div>
    </motion.div>
  )
}
