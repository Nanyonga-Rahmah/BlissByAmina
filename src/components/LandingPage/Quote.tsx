import { QuoteUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Quote() {
  return (
    <div className="bg-[url(/images/quotebg.png)] bg-center bg-cover rounded-[40px] flex-col bg-[#18181B] md:h-max py-10 mx-4 flex md:mx-16 px-10">
      <HugeiconsIcon icon={QuoteUpIcon} className="text-[#9b9b9b]" />
      <br />
      <div className="flex flex-col font-medium mt-6 md:text-xl gap-5 text-white">
        <p className="">
          Hello! My name is Amina Ndagire, I am a 20-year-old who is passionate
          about hair styling and have been braiding hair since 2017. As a
          self-taught hairstylist, I offer my services as a traveling
          hairstylist, traveling to up to 18 cities in Sweden to braid hair.
        </p>
        <p>
          {" "}
          It’s important to note that customers pay for the braiding service and
          travel costs, while hair extensions are not included in the price. I
          always strive to provide my clients with a fantastic experience and
          beautiful results.
        </p>

        <br />

        <p>
          {" "}
          If you have any questions or inquiries, feel free to contact me via
          Instagram, email, or TikTok. I look forward to hearing from you!
        </p>

        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center h-20 w-20  overflow-hidden">
            <img src="/images/amina.jpeg" alt="NA" className="object-center rounded-full w-full h-full object-cover" />
          </div>
          <div className="flex flex-col font-medium text-lg">
            <span>Ndagire Mariam</span>
            <span>CEO & Founder of Braided Bliss</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
