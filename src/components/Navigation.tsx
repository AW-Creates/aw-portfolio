import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2, // Wait for overlay to fade in before staggering
            },
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren",
            },
        },
    };

    const itemVariants = {
        hidden: { y: 100, opacity: 0, rotate: 2 },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: { type: "spring", stiffness: 80, damping: 20 },
        },
        exit: {
            y: -50,
            opacity: 0,
            transition: { ease: "easeInOut", duration: 0.3 },
        },
    };

    const links = ['Index', 'Work', 'Studio', 'Contact'];

    return (
        <>
            {/* Floating Magnetic Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-6 right-6 md:top-10 md:right-12 z-[90] px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md text-black dark:text-white uppercase tracking-[0.2em] text-[10px] font-medium hover:scale-105 active:scale-95 transition-all duration-500 ease-out shadow-lg flex items-center gap-3 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-black/60 dark:bg-white/60 animate-pulse" />
                Menu
            </button>

            {/* Full-Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl"
                    >
                        {/* Elegant Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 md:top-10 md:right-12 p-4 text-black dark:text-white hover:rotate-90 hover:scale-110 transition-all duration-700 ease-[0.22,1,0.36,1]"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18"></path>
                                <path d="M6 6l12 12"></path>
                            </svg>
                        </button>

                        {/* Typography Links */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col items-center gap-8 md:gap-12"
                        >
                            {links.map((link, i) => (
                                <motion.div key={i} variants={itemVariants} className="overflow-visible p-2 flex items-baseline justify-center gap-6 md:gap-10 group cursor-pointer" onClick={() => setIsOpen(false)}>
                                    <span className="font-signature text-3xl md:text-5xl text-black/30 dark:text-white/30 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors duration-500 ease-out translate-y-1">{`0${i + 1}.`}</span>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="block text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.4em] uppercase text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-700 ease-[0.22,1,0.36,1]"
                                    >
                                        {link}
                                    </a>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* High-End Meta Footer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                            className="absolute bottom-8 md:bottom-12 flex gap-8 md:gap-16 text-[9px] md:text-[10px] tracking-[0.3em] text-black/40 dark:text-white/40 uppercase font-light"
                        >
                            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">X / Twitter</a>
                            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Instagram</a>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
