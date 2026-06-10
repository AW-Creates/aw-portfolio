import Hero from '../components/Hero'
import Services from '../components/Services'
import SelectedWork from '../components/SelectedWork'
import About from '../components/About'
import FooterOutro from '../components/FooterOutro'
import PageTransition from '../components/PageTransition'

export default function Home() {
    return (
        <PageTransition>
            <Hero />
            <Services />
            <SelectedWork />
            <About />
            <FooterOutro />
        </PageTransition>
    )
}
