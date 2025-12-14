import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function Services() {
  const navigate = useNavigate();
const location = useLocation();
  const {pathname}=location;
  const services = [
    {
      name: "Boxbraids / Twists",
      id: 1,
      description:
        "Classic braids and twists in various sizes and lengths, extensions optional",
      url: "/images/boxbraids.png",
    },
    {
      name: "Boho Boxbraids / Twists",
      id: 2,
      description:
        "Trendy, textured braids with bohemian style, custom sizes available",
      url: "/images/boho.png",
    },
    {
      name: "Cornrows",
      id: 3,
      description:
        "Neat, intricate cornrows and Fulani braids for stylish patterns",
      url: "/images/conrows.png",
    },
    {
      name: "Other Styles",
      id: 4,
      description:
        "Crochet, faux locs, and French curls for versatile, protective looks",
      url: "/images/other.png",
    },
    {
      name: "Hairstyles for Boys",
      id: 5,
      description:
        "Cornrows, twists, and retwists designed for young boys’ hair",
      url: "/images/boys.png",
    },
    {
      name: "Braids Removal Services",
      id: 6,
      description:
        "Safe and professional removal of braids, locs, and protective styles",
      url: "/images/removal.png",
    },
  ];

  const HandleClick = (id: number) => {
    navigate(`/service/${id}`);
  };
  return (
    <div className="flex mx-16 flex-col my-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-3xl">{pathname==="/"?"Service Collection":"Other Services"}</h3>
        <p className="font-normal text-lg text-[#71717A]">
          Hair extensions are not included in the prices
        </p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div
          onClick={()=>HandleClick(service.id)}
            className="rounded-[20px] border cursor-pointer border-[#E4E4E7] bg-[#FAFAFA] p-3"
            key={index}
          >
            <div className="h-[263px]  w-full rounded-md overflow-hidden">
              <img
                src={service.url}
                alt={service.name}
                className="w-full h-full object-cover "
              />
            </div>{" "}
            <p className="font-bold text-[#18181B] mt-4">{service.name}</p>
            <p className="text-[#71717A] font-normal text-lg">
              {service.description}
            </p>
            <Button className="rounded-4xl mt-3" onClick={()=>HandleClick(service.id)}>
              BOOK NOW
            </Button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Services;
