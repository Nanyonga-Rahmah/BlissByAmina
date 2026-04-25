import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useServices } from "@/lib/hooks/use-services";

function Services() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { services, loading } = useServices();

  const HandleClick = (id: number) => {
    navigate(`/service/${id}`);
  };
  return (
    <div className="flex md:mx-16 mx-5 flex-col my-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <h3 className="font-bold text-3xl">
          {pathname === "/" ? "Service Collection" : "Other Services"}
        </h3>
        <p className="font-normal text-lg text-[#71717A]">
          Hair extensions are not included in the prices
        </p>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-3 gap-5 ">
        {services.length === 0 && (
          <p className="text-center font-bold  col-span-3 py-8 ">
            No services provided at the moment
          </p>
        )}

        {loading && (
          <p className="text-center col-span-3 py-8">Loading services...</p>
        )}
        {!loading &&
          services.map((service, index) => (
            <div
              onClick={() => HandleClick(service?.id ?? 0)}
              className="rounded-[20px] border cursor-pointer border-[#E4E4E7] bg-[#FAFAFA] p-3"
              key={index}
            >
              <div className="md:h-[263px] w-full rounded-md overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  style={{ objectPosition: "center 30%" }}
                  className="w-full h-full object-cover object-top-left"
                />
              </div>
              <p className="font-bold text-[#18181B] mt-4">{service.name}</p>
              <p className="text-[#71717A] font-normal text-lg">
                {service.description}
              </p>
              <Button
                className="rounded-4xl mt-3 cursor-pointer"
                onClick={() => HandleClick(service.id ?? 0)}
              >
                BOOK NOW
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Services;
