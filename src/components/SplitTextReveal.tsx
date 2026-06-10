import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export default function SplitTextReveal({ text, className = "", delayOffset = 0 }: { text: string, className?: string, delayOffset?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  const chars = text.split("")

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {chars.map((char, index) => (
        <span key={index} className="inline-block overflow-hidden relative align-bottom">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.33, 1, 0.68, 1], 
              delay: delayOffset + (index * 0.02) 
            }}
            className="inline-block"
            style={{ display: char === " " ? "inline" : "inline-block", willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
