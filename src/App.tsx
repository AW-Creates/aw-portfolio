import Hero from './components/Hero'
import Navigation from './components/Navigation'

function App() {
  return (
    <main className="bg-white dark:bg-[#050505] transition-colors duration-500">
      <Navigation />
      <Hero />
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center transition-colors duration-500">
        <h2 className="text-4xl font-light text-black/20 dark:text-white/20 uppercase tracking-[0.2em]">Next Section Concept</h2>
      </div>
    </main>
  )
}

export default App
