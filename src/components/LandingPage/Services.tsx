import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import type { IService } from "@/lib/interfaces/interface";

interface ServiceProps {
  Services: IService[];
  loading: boolean;
}
function Services({ Services, loading }: ServiceProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

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
        {Services.length === 0 && !loading && (
          <p className="text-center font-bold  col-span-3 py-8 ">
            No services provided at the moment
          </p>
        )}

        {loading && (
          <p className="text-center col-span-3 py-8">Loading services...</p>
        )}
        {!loading &&
          Services.map((service, index) => (
            <div
              onClick={() => HandleClick(service?.id ?? 0)}
              className="rounded-[20px] border cursor-pointer border-[#E4E4E7] bg-[#FAFAFA] p-3"
              key={index}
            >
              <div className="md:h-[220px] w-full rounded-md overflow-hidden">
                <img
                  src={service.images?.[0]}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {service.images?.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {service.images.slice(1, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt=""
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}
              <p className="font-bold text-[#18181B] mt-4">{service.name}</p>
              <p className="text-[#71717A] font-normal text-lg line-clamp-2">
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
