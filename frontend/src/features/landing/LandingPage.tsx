import { FeaturedFeatures } from './components/FeaturedFeatures'
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
      </main>
    </div>
  )
}
