import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from "./components/About.jsx";
import Skills from './components/Skills.jsx'
import Projects from './components/Project.jsx';
import Socials from './components/Socials.jsx';
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Socials />
      <Footer />
    </div>
  )
}
