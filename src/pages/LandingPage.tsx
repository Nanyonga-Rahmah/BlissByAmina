import HeroBanner from "@/components/Banner"
import Navigation from "@/components/header"
import HeroSection from "@/components/hero"
import Services from "@/components/Services"

function LandingPage() {
  return (
    <div>
        <Navigation/>
        <HeroSection/>
        <HeroBanner/>
        <Services/>
      
    </div>
  )
}

export default LandingPage
