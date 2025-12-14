function Footer() {
  return (
    <footer className="flex items-center justify-between bg-[#F4F4F5D9] px-16 py-4">
      <div className="flex items-center gap-2">
        <img src="/logos/logo.svg" alt="Logo" width={70} height={70} />
        <span>&copy Braided Bliss by Amina.All rights reserved</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-bold">Policies :</span>
        <span>Terms Of Use</span>
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
