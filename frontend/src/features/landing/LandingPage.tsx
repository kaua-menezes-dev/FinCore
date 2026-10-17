import { Faq } from './components/Faq'
import { FeaturedFeatures } from './components/FeaturedFeatures'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { GettingStarted } from './components/GettingStarted'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { MeetFincore } from './components/MeetFincore'
import { Navbar } from './components/Navbar'

export function LandingPage() {
  return (
    <div className="relative min-h-svh bg-bg">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <MeetFincore />
        <FeaturedFeatures />
        <GettingStarted />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
