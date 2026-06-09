import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

function App() {
  const location = useLocation()

  return (
    <main className="bg-[#050505] min-h-screen text-white/90 selection:bg-white/20 selection:text-white font-sans transition-colors duration-500">
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

export default App
