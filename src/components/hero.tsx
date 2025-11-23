export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#F7F5F4]">
      {/* LEFT IMAGE */}
      <img
        src="/images/hero-left.png"
        alt="Braiding stylist"
        className="hidden md:block absolute left-0 top-0 h-full object-cover"
      />

      {/* RIGHT IMAGE */}
      <img
        src="/images/hero-right.png"
        alt="Styled client"
        className="hidden md:block absolute right-0 top-0 h-full object-cover"
      />

      {/* CENTER CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-[#000] leading-tight">
          Your Hair, Our Craft
        </h1>

        <p className="mt-4 text-lg md:text-xl text-[#595959]">
          Luxury braiding services tailored for you.
        </p>

        <button className="mt-6 bg-black text-white px-8 py-3 rounded-full text-base md:text-lg hover:bg-[#222] transition">
          Book Appointment
        </button>
      </div>

      {/* OVERLAY GRADIENT FOR MOBILE TO KEEP IT CLEAN */}
      <div className="absolute inset-0 md:hidden bg-gradient-to-t from-[#f7f5f4] to-transparent"></div>
    </section>
  );
}
