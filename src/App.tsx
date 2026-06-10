import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import SmoothScroller from './components/SmoothScroller'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import { AnimatePresence } from 'motion/react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <main className="bg-[#050505] min-h-screen text-white/90 selection:bg-white/20 selection:text-white font-sans transition-colors duration-500">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <CustomCursor />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<CaseStudy />} />
        </Routes>
      </AnimatePresence>
    </main>
  )
}

export default function App() {
  return (
    <SmoothScroller>
      <AppContent />
    </SmoothScroller>
  )
}
