import { Button } from "./ui/button";

function Services() {
  const services = [
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boxbraids / Twists",
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
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
              className="h-[263px] bg-cover rounded-md"
              style={{ backgroundImage: `url(${service.url})` }}
            ></div>{" "}
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
