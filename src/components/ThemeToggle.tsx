import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        }
    }, [theme])

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="fixed top-6 right-6 md:top-12 md:right-12 z-50 p-3 rounded-none bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition-all"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-zinc-900" />}
        </button>
    )
}
