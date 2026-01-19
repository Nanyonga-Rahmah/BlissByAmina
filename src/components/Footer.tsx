function Footer() {
  return (
    <footer className="flex  flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between bg-[#F4F4F5D9] px-10 md:px-16 py-4">
      <div className="flex md:flex-row flex-col md:items-center gap-2">
        <img src="/logos/logo.svg" alt="Logo" width={70} height={70} />
        <span>&copy; Braided Bliss by Amina.All rights reserved</span>
      </div>

      <div className="flex  flex-col md:flex-row md:items-center gap-2">
        <span className="font-bold">Policies :</span>
        <a href="/terms">Terms Of Use</a>
        <a href="/booking">Booking</a>
        <span>Privacy</span>
      </div>

      <div className="flex items-center gap-4">
        <span>X</span>
        <span>Instagram</span>
        <span>Facebook</span>
      </div>
    </footer>
  );
}

export default Footer;
