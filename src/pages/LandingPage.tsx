import HeroBanner from "@/components/LandingPage/Banner"
import Navigation from "@/components/header"
import HeroSection from "@/components/LandingPage/hero"
import Services from "@/components/LandingPage/Services"
// import Accessories from "@/components/LandingPage/HairAccesories"
// import Quote from "@/components/LandingPage/Quote"

function LandingPage() {
  return (
    <div>
        <Navigation/>
        <HeroSection/>
        <HeroBanner/>
        <Services/>
        {/* <Accessories/>
        <Quote/>
       */}
    </div>
  )
}

export default LandingPage
