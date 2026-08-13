import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import GenGuardInstrument from './components/GenGuardInstrument.jsx'
import LangfuseInstrument from './components/LangfuseInstrument.jsx'
import HardeningInstrument from './components/HardeningInstrument.jsx'
import Experiments from './components/Experiments.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import { siteContent } from './data/siteContent.js'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const page = useRef()

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
      })
      gsap.utils.toArray('[data-scroll-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        })
      })
    }, page)

    return () => context.revert()
  }, [])

  return (
    <main ref={page}>
      <Navigation content={siteContent} />
      <Hero content={siteContent} />
      <GenGuardInstrument />
      <LangfuseInstrument />
      <HardeningInstrument />
      <Experiments items={siteContent.experiments} />
      <About content={siteContent} />
      <Footer content={siteContent} />
    </main>
  )
}

export default App
