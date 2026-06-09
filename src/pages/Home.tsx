import Hero from '../components/Hero'
import Services from '../components/Services'
import SelectedWork from '../components/SelectedWork'
import About from '../components/About'
import FooterOutro from '../components/FooterOutro'

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <SelectedWork />
            <About />
            <FooterOutro />
        </>
    )
}
