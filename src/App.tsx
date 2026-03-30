import Hero from './components/Hero'
import Navigation from './components/Navigation'
import Services from './components/Services'
import SelectedWork from './components/SelectedWork'
import About from './components/About'

function App() {
  return (
    <main className="bg-[#050505] transition-colors duration-500">
      <Navigation />
      <Hero />
      <Services />
      <SelectedWork />
      <About />
    </main>
  )
}

export default App
