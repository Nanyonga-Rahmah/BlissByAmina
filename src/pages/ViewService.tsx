import { BookingDialog } from "@/components/BookingDialog";
import Navigation from "@/components/header";
import Services from "@/components/LandingPage/Services";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { useService } from "@/lib/hooks/use-service";
import { useServices } from "@/lib/hooks/use-services";
import { useVariants } from "@/lib/hooks/use-variants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewService() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [selectedRemovalSize, setSelectedRemovalSize] = useState<string | null>(
    null,
  );
  const [selectedRemovalLength, setSelectedRemovalLength] = useState<
    string | null
  >(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [checked, setIsChecked] = useState<boolean>(false);

  const { id } = useParams();

  const token = getUserToken();
  const serviceId = Number(id);

  const { services, loading } = useServices();
  const filteredServices = services?.filter(
    (service) => service.id !== serviceId,
  ) ?? [];

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);

  const { service } = useService({ serviceId });
  const { variants } = useVariants({ serviceId });

  const removalService = services?.find((service) =>
    service.name.toLowerCase().includes("removal"),
  );

  const removalId = removalService?.id;

  const { variants: removalvariants } = useVariants({
    serviceId: removalId ?? 0,
  });

  const filteredVariants = variants.filter(
    (variant) => variant.status === "active",
  );

  const filteredRemovalVariants = removalvariants.filter(
    (variant) => variant.status === "active",
  );
  const selectedVariant = filteredVariants.find(
    (variant) =>
      variant.name === selectedSize && variant.length === selectedLength,
  );

  const selectedRemovalVariant = filteredRemovalVariants.find(
    (variant) =>
      variant.name === selectedRemovalSize &&
      variant.length === selectedRemovalLength,
  );

  const sizes = [...new Set(filteredVariants.map((v) => v.name))];

  const Removalsizes = [...new Set(filteredRemovalVariants.map((v) => v.name))];

  const lengths = [
    ...new Set(
      filteredVariants
        .filter((v) => v.name === selectedSize) // only lengths for selected size
        .map((v) => v.length)
        .filter(Boolean),
    ),
  ];

  const removalLengths = [
    ...new Set(
      filteredRemovalVariants
        .filter((v) => v.name === selectedRemovalSize)
        .map((v) => v.length)
        .filter(Boolean),
    ),
  ];

  const serviceImages =
    service?.images && service.images.length > 0
      ? service.images
      : service?.image
        ? [service.image]
        : [];

  const activeImage = selectedImage ?? serviceImages[0];
  // const isChecked = Boolean(
  //   checked &&
  //   selectedRemovalSize &&
  //   selectedRemovalLength &&
  //   selectedSize &&
  //   selectedLength &&
  //   selectedVariant,
  // );
  const canContinueToBook = Boolean(
    selectedSize && selectedLength && selectedVariant,
  );

  useEffect(() => {
    setSelectedImage(null);
  }, [serviceId]);

  return (
    <section>
      <Navigation />
      <div className="grid px-10 md:grid-cols-2 md:gap-16 md:px-16 my-10">
        <div>
          <div className="w-full max-w-[600px] aspect-[4/3] rounded-md overflow-hidden">
            {activeImage && (
              <img
                src={activeImage}
                alt={service?.name}
                className="w-full h-full object-contain object-left"
              />
            )}
          </div>

          {serviceImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3 mt-3">
              {serviceImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`h-24 rounded-md overflow-hidden border cursor-pointer ${activeImage === image
                      ? "border-black border-2"
                      : "border-[#E4E4E7]"
                    }`}
                >
                  <img
                    src={image}
                    alt={`${service?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex  flex-col ">
            <div className="flex items-center justify-between">
              <h3 className="text-[#18181B] font-bold text-[42px]">
                {service?.name}
              </h3>
            </div>
            <p className="text-[#3F3F46] text-base">{service?.description}</p>
          </div>

          <div className="border h-px border-[#E4E4E7]"></div>

          <div className="my-5">
            <h4 className="font-bold">Size options</h4>
            {sizes.map((sizeOption, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(sizeOption)}
                className={`border px-4 py-2 m-2 capitalize cursor-pointer rounded-full 
            ${selectedSize === sizeOption
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
            <h4 className="font-bold">Length options</h4>
            {selectedSize ? (
              lengths.map((lengthOption, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLength(lengthOption ?? "")}
                  className={`border px-8 py-2 m-2 capitalize  cursor-pointer rounded-full 
            ${selectedLength === lengthOption
                      ? "font-bold border-black"
                      : "font-normal"
                    }
          `}
                >
                  {lengthOption}
                </button>
              ))
            ) : (
              <p className="my-4">Choose size to view length Options</p>
            )}
          </div>

          <div className="border h-px border-[#E4E4E7]"></div>

          {!service?.name.includes("removal") && (
            <div>
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-lg">
                  Include Hair removal as an add on
                </h3>
                <Checkbox
                  checked={checked}
                  onCheckedChange={(value) => setIsChecked(!!value)}
                />
              </div>

              {checked && (
                <div className="h-40 overflow-y-scroll">
                  <div className="my-5">
                    <h4 className="font-bold">Size options</h4>
                    {Removalsizes.map((sizeOption, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRemovalSize(sizeOption)}
                        className={`border px-4 py-2 m-2 capitalize cursor-pointer rounded-full 
            ${selectedRemovalSize === sizeOption
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
                    <h4 className="font-bold">Length options</h4>
                    {selectedRemovalSize ? (
                      removalLengths.map((lengthOption, index) => (
                        <button
                          key={index}
                          onClick={() =>
                            setSelectedRemovalLength(lengthOption ?? "")
                          }
                          className={`border px-8 py-2 m-2 capitalize  cursor-pointer rounded-full 
            ${selectedRemovalLength === lengthOption
                              ? "font-bold border-black"
                              : "font-normal"
                            }
          `}
                        >
                          {lengthOption}
                        </button>
                      ))
                    ) : (
                      <p className="my-4">Choose size to view length Options</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between my-5">
            <span className="text-[#18181B] font-medium text-xl">Amount</span>

            <span className="font-bold text-xl">
              {selectedVariant
                ? `${(selectedVariant.price + (selectedRemovalVariant?.price ?? 0)).toLocaleString()} SEK`
                : "--"}
            </span>
          </div>

          <BookingDialog
            disabled={!canContinueToBook}
            selectedVariant={selectedVariant}
            service={service}
            hasRemovalAddOn={checked}
            removalDetailsLength={selectedRemovalLength ?? ""}
            removalDetailsSize={selectedRemovalSize ?? ""}
            removalDetailsPrice={selectedRemovalVariant?.price}
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
        {Services && (
          <Services Services={filteredServices} loading={loading} />
        )}{" "}
      </div>
    </section>
  );
}

export default ViewService;
