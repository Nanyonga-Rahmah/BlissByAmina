export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-white  text-black flex items-center justify-center">
      {/* Left Image */}
      <div
        className="absolute top-0 left-0 h-full w-1/2 bg-cover bg-center"
        style={{
          clipPath: "polygon(0 0, 30% 0, 80% 100%, 0 100%)",
          backgroundImage: "url('/images/hero-left.webp')",
        }}
      ></div>

      {/* Right Image */}
      <div
        className="absolute top-0 right-0 h-full w-1/2 bg-cover bg-center"
        style={{
          clipPath: "polygon(70% 0, 100% 0, 100% 100%, 20% 100%)",
          backgroundImage: "url('/images/hero-right.webp')",
        }}
      ></div>

      {/* Center Content */}
      <div className="relative z-20 text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold italic mb-4 font-fair">TravelHair Stylist</h1>
        <p className="mb-8 text-lg opacity-90  max-w-[400px]">
          Providing expert hair braiding services tailored to your unique style
          and preferences, all in the comfort of your home.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button className="px-6 py-3 rounded-full bg-black text-white font-semibold shadow">
            BOOK NOW
          </button>

          <button className="px-6 py-3 rounded-full text-black bg-[#F4F4F5] border border-white font-semibold">
            BUY ACCESSORIES
          </button>
        </div>
      </div>

      {/* Dark overlay to blend images */}
      {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}
    </section>
  );
}
