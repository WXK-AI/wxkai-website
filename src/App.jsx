import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import ProjectList from './components/ProjectList.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import { siteContent } from './data/siteContent.js'

const Scene = lazy(() => import('./Scene.jsx'))

gsap.registerPlugin(ScrollTrigger)

function App() {
  const page = useRef()

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const context = gsap.context(() => {
      gsap.from('[data-hero-reveal]', {
        y: 56,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
      })
      gsap.from('.scene', {
        opacity: 0,
        scale: 0.88,
        duration: 1.5,
        delay: 0.2,
        ease: 'expo.out',
      })
      gsap.utils.toArray('[data-scroll-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })
    }, page)

    return () => context.revert()
  }, [])

  return (
    <main ref={page}>
      <Navigation content={siteContent} />
      <Hero content={siteContent}>
        <Suspense fallback={null}><Scene /></Suspense>
      </Hero>
      <ProjectList projects={siteContent.projects} />
      <About content={siteContent} />
      <Footer content={siteContent} />
    </main>
  )
}

export default App
