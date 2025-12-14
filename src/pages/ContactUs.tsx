import Footer from "@/components/Footer";
import Navigation from "@/components/header";
import { Call02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function ContactUs() {
  return (
    <div>
      <Navigation />

      <section className="relative w-full h-[60vh] overflow-hidden bg-white  text-black flex items-center justify-center">
        {/* Left Image */}
        <div
          className="absolute top-0 left-0 h-full w-1/2 bg-cover bg-center"
          style={{
            clipPath: "polygon(0 0, 40% 0, 90% 100%, 0 100%)",
            backgroundImage: "url('/images/contact-left.webp')",
          }}
        ></div>

        {/* Right Image */}
        <div
          className="absolute top-0 right-0 h-full w-1/2 bg-cover bg-center"
          style={{
            clipPath: "polygon(60% 0, 100% 0, 100% 100%, 10% 100%)",
            backgroundImage: "url('/images/contact-right.webp')",
          }}
        ></div>

        {/* Center Content */}
        <div className="relative z-20 text-center max-w-2xl px-6">
          <h1 className="text-5xl font-bold italic mb-4 font-fair">
            Get in Touch
          </h1>

          <div className="flex items-center justify-center gap-4"></div>
        </div>

        {/* Dark overlay to blend images */}
        {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}
      </section>

      <div className="bg-[#F4F4F5D9] flex items-center justify-center py-20 my-10 px-4 flex-col">
        <h3 className="font-bold text-[#18181B] text-[46px] max-w-3xl text-center mb-10">
          For general and partnership enquiries
        </h3>

        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full p-2 bg-[#18181B]">
              <HugeiconsIcon icon={Call02Icon} color="#ffffff" />
            </div>
            <span className="text-[#52525B]">+46728874011</span>
          </div>

          <div className="border border-[#A1A1AA] h-[34px]"></div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full p-2 bg-[#18181B]">
              <HugeiconsIcon icon={Mail01Icon} color="#ffffff" />
            </div>
            <span className="text-[#52525B]">Boxbraidsamina4@gmail.com</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
