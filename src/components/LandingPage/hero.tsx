// interface HeroSectionProps {
//   heroImage?: string | null;
// }

export default function HeroSection() {
  // const image = heroImage || "/images/hero-left.webp";

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-[#f5f5f5] flex items-center justify-center">
      {/* Hero Image */}
       {/* <img
    src={image || "/images/hero-left.webp"}
    alt="TravelHair Stylist"
    className="absolute inset-0 w-full h-full object-cover"
  /> */}
      {/* Optional background behind the image */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-2xl px-6 py-16">
        <h1 className="md:text-5xl text-3xl font-bold italic mb-4 font-fair">
          TravelHair Stylist
        </h1>

        <p className="mb-8 md:text-lg opacity-90 max-w-[400px] mx-auto">
          Providing expert hair braiding services tailored to your unique style
          and preferences, all in the comfort of your home.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-6 py-3 w-full md:w-auto min-w-[180px] cursor-pointer rounded-full bg-black text-white font-semibold shadow">
            BOOK NOW
          </button>

          <button className="px-6 py-3 w-full md:w-auto min-w-[180px] cursor-pointer rounded-full text-black bg-[#F4F4F5] border border-white font-semibold">
            BUY ACCESSORIES
          </button>
        </div>
      </div>
    </section>
  );
}