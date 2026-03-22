import { useEffect, useRef, useState } from 'react'
import { useMotionValueEvent, MotionValue } from 'motion/react'

interface Props {
    scrollProgress: MotionValue<number>
}

export default function BackgroundVideo({ scrollProgress }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if (videoRef.current) {
            if (videoRef.current.readyState >= 1) {
                setDuration(videoRef.current.duration)
            } else {
                const handleLoadedMetadata = () => setDuration(videoRef.current!.duration)
                videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)
                return () => videoRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata)
            }
        }
    }, [])

    useMotionValueEvent(scrollProgress, "change", (latest) => {
        if (videoRef.current && duration > 0) {
            const startTime = 0;
            const scrubRange = duration > startTime ? duration - startTime : 0;
            const targetTime = startTime + (latest * scrubRange);

            requestAnimationFrame(() => {
                if (videoRef.current) videoRef.current.currentTime = targetTime
            })
        }
    })

    // We play the video slightly initially so it buffers the first frames if needed
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current?.play().then(() => {
                videoRef.current?.pause()
            }).catch(() => { })
        }
    }, [])

    return (
        <div className="w-full h-full bg-zinc-900 pointer-events-none relative">
            <video
                ref={videoRef}
                src="/Hero Video smirk.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
            />
            {/* Light mode tint */}
            <div className="absolute inset-0 bg-white/10 opacity-0 relative:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay" />
        </div>
    )
}
