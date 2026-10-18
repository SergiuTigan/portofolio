import Hero from '../components/Hero.jsx'
import Products from '../components/Products.jsx'
import Clients from '../components/Clients.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'

export default function Home({ onOpen, onJump }) {
  return (
    <main id="main">
      <Hero onJump={onJump} />
      <Products onOpen={onOpen} />
      <Clients onOpen={onOpen} />
      <About />
      <Contact />
    </main>
  )
}
