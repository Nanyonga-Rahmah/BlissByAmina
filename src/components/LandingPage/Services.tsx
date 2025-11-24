import { Button } from "../ui/button";

function Services() {
  const services = [
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boho Boxbraids / Twists",
      description:"Trendy, textured braids with bohemian style, custom sizes available",
      url: "/images/boho.png",
    },
    {
      name: "Cornrows",
      description:
        "Neat, intricate cornrows and Fulani braids for stylish patterns",
      url: "/images/conrows.png",
    },
    {
      name: "Other Styles",
      description:
        "Crochet, faux locs, and French curls for versatile, protective looks",
      url: "/images/other.png",
    },
    {
      name: "Hairstyles for Boys",
      description:
        "Cornrows, twists, and retwists designed for young boys’ hair",
      url: "/images/boys.png",
    },
    {
      name: "Braids Removal Services",
      description:
        "Safe and professional removal of braids, locs, and protective styles",
      url: "/images/removal.png",
    },
  ];
  return (
    <div className="flex mx-16 flex-col my-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-3xl">Service Collection</h3>
        <p className="font-normal text-lg text-[#71717A]">Hair extensions are not included in the prices</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div
            className="rounded-[20px] border border-[#E4E4E7] bg-[#FAFAFA] p-3"
            key={index}
          >
            <div
              className="h-[263px]  w-full rounded-md overflow-hidden"
            >  
            <img
            src={service.url}
            alt={service.name}
            className="w-full h-full object-cover "
          />
          </div>{" "}
            <p className="font-bold text-[#18181B] mt-4">{service.name}</p>
            <p className="text-[#71717A] font-normal text-lg" >{service.description}</p>
            <Button className="rounded-4xl mt-3">BOOK NOW</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
