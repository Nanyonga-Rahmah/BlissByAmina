import { BookingDialog } from "@/components/BookingDialog";
import Navigation from "@/components/header";
import Services from "@/components/LandingPage/Services";
import { getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { useService } from "@/lib/hooks/use-service";
import { useVariants } from "@/lib/hooks/use-variants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewService() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = getUserToken();

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);
  const { id } = useParams();

  const serviceId = Number(id);
  const { service } = useService({ serviceId });
  const { variants } = useVariants({ serviceId });

  const filteredVariants = variants.filter(
    (variant) => variant.status === "active",
  );

  const selectedVariant = filteredVariants.find(
    (variant) =>
      variant.name === selectedSize && variant.length === selectedLength,
  );

  const sizes = [...new Set(filteredVariants.map((v) => v.name))];
  const lengths = [
    ...new Set(filteredVariants.map((v) => v.length).filter(Boolean)),
  ];

  const canContinueToBook = Boolean(
    selectedSize && selectedLength && selectedVariant,
  );

  return (
    <section>
      <Navigation />
      <div className="grid px-10 md:grid-cols-2 md:gap-16 md:px-16 my-10">
        <div className=" md:h-[500px]  rounded-md overflow-hidden">
          <img
            src={service?.image}
            alt={service?.name}
            style={{ objectPosition: "center 40%" }}
            className="w-full h-full object-cover object-center "
          />
        </div>{" "}
        <div>
          <div className="flex  flex-col ">
            <h3 className="text-[#18181B] font-bold text-[42px]">
              {service?.name}
            </h3>
            <p className="text-[#3F3F46] text-base">{service?.description}</p>
          </div>

          <div className="border h-px border-[#E4E4E7]"></div>

          <div className="my-5">
            <h4>Size options</h4>
            {sizes.map((sizeOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(sizeOption)}
                className={`border px-4 py-2 m-2 capitalize cursor-pointer rounded-full 
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
            {lengths.map((lengthOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedLength(lengthOption ?? "")}
                className={`border px-8 py-2 m-2 capitalize  cursor-pointer rounded-full 
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
              {selectedVariant
                ? `${selectedVariant.price.toLocaleString()} SEK`
                : "--"}
            </span>
          </div>

          <BookingDialog
            disabled={!canContinueToBook}
            selectedVariant={selectedVariant}
            service={service}
          />

          {!isLoggedIn && (
            <p className="text-base text-muted-foreground mt-3 text-center">
              You must be logged in to book this service
            </p>
          )}

          <p className="text-center my-3">
            By continuing to book, I accept Braided Bliss' Booking Policy.
          </p>
        </div>
      </div>

      <div>
        <Services />
      </div>
    </section>
  );
}

export default ViewService;
