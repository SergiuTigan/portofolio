import Hero from '../components/Hero.jsx'
import Work from '../components/Work.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({ edition, onOpen, onJump, onGenerate, onOpenEditions }) {
  return (
    <main id="main">
      <Hero edition={edition} onJump={onJump} onGenerate={onGenerate} onOpenEditions={onOpenEditions} />
      <Work onOpen={onOpen} />
      <About />
      <Contact />
    </main>
  )
}
