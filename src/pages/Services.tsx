import { BookingDialog } from "@/components/BookingDialog";
import Footer from "@/components/Footer";
import Navigation from "@/components/header"
import { useState } from "react";

function Services() {
const [selectedSize, setSelectedSize] = useState("Extra Small");

  const [selectedLength, setSelectedLength] = useState("Shoulder");
    const services =[
       {
    name: "Boxbraids / Twists",
    description:
      "Classic braids and twists in various sizes and lengths, extensions optional",
    url: "/images/boxbraids.png",
    amount: 1600,
    sizeOptions: ["Extra Small", "Small", "S-Medium", "Medium", " Large"],
    lengthOptions: ["Shoulder", "Back", "Waist", "Thigh", "Knee"],
  },
   {
    name: "Boxbraids / Twists",
    description:
      "Classic braids and twists in various sizes and lengths, extensions optional",
    url: "/images/boxbraids.png",
    amount: 1600,
    sizeOptions: ["Extra Small", "Small", "S-Medium", "Medium", " Large"],
    lengthOptions: ["Shoulder", "Back", "Waist", "Thigh", "Knee"],
  }, {
    name: "Boxbraids / Twists",
    description:
      "Classic braids and twists in various sizes and lengths, extensions optional",
    url: "/images/boxbraids.png",
    amount: 1600,
    sizeOptions: ["Extra Small", "Small", "S-Medium", "Medium", " Large"],
    lengthOptions: ["Shoulder", "Back", "Waist", "Thigh", "Knee"],
  },
   {
    name: "Boxbraids / Twists",
    description:
      "Classic braids and twists in various sizes and lengths, extensions optional",
    url: "/images/boxbraids.png",
    amount: 1600,
    sizeOptions: ["Extra Small", "Small", "S-Medium", "Medium", " Large"],
    lengthOptions: ["Shoulder", "Back", "Waist", "Thigh", "Knee"],
  },
   {
    name: "Boxbraids / Twists",
    description:
      "Classic braids and twists in various sizes and lengths, extensions optional",
    url: "/images/boxbraids.png",
    amount: 1600,
    sizeOptions: ["Extra Small", "Small", "S-Medium", "Medium", " Large"],
    lengthOptions: ["Shoulder", "Back", "Waist", "Thigh", "Knee"],
  }
    ];
  return (
    <section>
        <Navigation/>

        {services.map((service, index) => (

          <div className="grid grid-cols-2 gap-16 px-16 my-10" key={index}>
        <div className="   rounded-md overflow-hidden">
          <img
            src={service.url}
            alt={service.name}
            className="w-full h-full object-cover "
          />
        </div>{" "}
        <div>
          <div className="flex  flex-col my-5">
            <h3 className="text-[#18181B] font-bold text-[42px]">
              {service.name}
            </h3>
            <p className="text-[#3F3F46] text-base">{service.description}</p>
          </div>

          <div className="border h-px border-[#E4E4E7]"></div>

          <div className="my-5">
            <h4>Size options</h4>
            {service.sizeOptions.map((sizeOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(sizeOption)}
                className={`border px-4 py-2 m-2 cursor-pointer rounded-full 
            ${
              selectedSize === sizeOption
                ? "font-bold border-black"
                : "font-normal"
            }
          `}
              >
                {sizeOption}
              </button>
            ))}
          </div>

          <div className="my-5">
            <h4>Length options</h4>
            {service.lengthOptions.map((lengthOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedLength(lengthOption)}
                className={`border px-4 py-2 m-2  cursor-pointer rounded-full 
            ${
              selectedLength === lengthOption
                ? "font-bold border-black"
                : "font-normal"
            }
          `}
              >
                {lengthOption}
              </button>
            ))}
          </div>

          <div className="border h-px border-[#E4E4E7]"></div>

          <div className="flex items-center justify-between my-5">
            <span className="text-[#18181B] font-medium text-xl">Amount</span>

            <span className="font-bold text-xl">
              {service.amount.toLocaleString()} SEK
            </span>
          </div>
         < BookingDialog/>


          <p className="text-center my-3">
            By continuing to book, I accept Braided Bliss' Booking Policy.
          </p>
        </div>
      </div>
        ))}

        <Footer/>
      
    </section>
  )
}

export default Services
