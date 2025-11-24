import { Button } from "../ui/button";

function Accessories() {
  const services = [
    {
      name: "Red Bonnet",
      description: "Braided Bliss bonnet, Small size, no adjustable string",
      url: "/images/redbonnet.png",
      price: 169,
    },
    {
      name: "Green Bonnet",
      description: "Braided Bliss bonnet, Small size, no adjustable string",
      url: "/images/greenbonnet.png",
      price: 169,
    },
    {
      name: "Blue Bonnet",
      description: "Braided Bliss bonnet, Small size, no adjustable string",
      url: "/images/bluebonnet.png",
      price: 169,
    },
    {
      name: "Pink Bonnet",
      description: "Braided Bliss bonnet, Small size, no adjustable string",
      url: "/images/pinkbonnet.png",
      price: 189,
    },
  ];
  return (
    <div className="flex mx-16 flex-col my-10 gap-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-3xl">Hair Accessories</h3>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {services.map((service, index) => (
          <div className="relative">
            <div
  className="
    absolute -top-4 left-1/2 -translate-x-1/2
    w-4/5 bg-[#3F3F46] text-white
    flex items-center justify-between
    py-2 px-6"
 
>
  <div className="h-2 w-2 bg-white rounded-full"></div>
  {service.name}
  <div className="h-2 w-2 bg-white rounded-full"></div>
</div>

            <div
              className="rounded-[20px]  border border-[#E4E4E7] overflow-hidden  bg-[#FAFAFA] "
              key={index}
            >
              <div className="h-[263px]  w-full  overflow-hidden">
                <img
                  src={service.url}
                  alt={service.name}
                  className="w-full h-full object-fit "
                />
              </div>{" "}
              <div className="flex justify-between items-center px-4">
                <p className="text-[#71717A] font-normal text-lg mt-2">
                  {service.description}
                </p>
                <p className="font-bold text-[#18181B] ">{service.price} SEK</p>
              </div>
              <Button
                className="rounded-4xl mt-3 w-[95%] m-4 border-[#18181B]"
                variant={"outline"}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accessories;
