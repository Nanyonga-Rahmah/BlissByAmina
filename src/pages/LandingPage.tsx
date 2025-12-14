import HeroBanner from "@/components/LandingPage/Banner"
import Navigation from "@/components/header"
import HeroSection from "@/components/LandingPage/hero"
import Services from "@/components/LandingPage/Services"
import Footer from "@/components/Footer"
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

       <Footer/>
    </div>
  )
}

export default LandingPage
