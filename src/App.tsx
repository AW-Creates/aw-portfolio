import Hero from './components/Hero'
import Navigation from './components/Navigation'
import Services from './components/Services'

function App() {
  return (
    <main className="bg-white dark:bg-[#050505] transition-colors duration-500">
      <Navigation />
      <Hero />
      <Services />
    </main>
  )
}

export default App
