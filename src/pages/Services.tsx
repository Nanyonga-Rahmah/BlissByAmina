import { BookingDialog } from "@/components/BookingDialog";
import Navigation from "@/components/header";
import { Checkbox } from "@/components/ui/checkbox";
import { getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { useServices } from "@/lib/hooks/use-services";
import { useVariants } from "@/lib/hooks/use-variants";
import { useEffect, useState } from "react";

// --- Single Service Detail Row ---
function ServiceCard({
  service,
  removalServiceId,
  isLoggedIn,
}: {
  service: any;
  removalServiceId?: number;
  isLoggedIn: boolean;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [checked, setIsChecked] = useState<boolean>(false);
  const [selectedRemovalSize, setSelectedRemovalSize] = useState<string | null>(null);
  const [selectedRemovalLength, setSelectedRemovalLength] = useState<string | null>(null);

  // Fetch Variants for Main Service
  const { variants } = useVariants({ serviceId: service.id });

  // Fetch Variants for Removal Add-on Service
  const { variants: removalVariants } = useVariants({
    serviceId: removalServiceId ?? 0,
  });

  // Filter Active Variants
  const filteredVariants = variants.filter((v) => v.status === "active");
  const filteredRemovalVariants = removalVariants.filter((v) => v.status === "active");

  // Matched Selected Variants
  const selectedVariant = filteredVariants.find(
    (v) => v.name === selectedSize && v.length === selectedLength
  );

  const selectedRemovalVariant = filteredRemovalVariants.find(
    (v) => v.name === selectedRemovalSize && v.length === selectedRemovalLength
  );

  // Derive Available Options
  const sizes = [...new Set(filteredVariants.map((v) => v.name))];
  const removalSizes = [...new Set(filteredRemovalVariants.map((v) => v.name))];

  const lengths = [
    ...new Set(
      filteredVariants
        .filter((v) => v.name === selectedSize)
        .map((v) => v.length)
        .filter(Boolean)
    ),
  ];

  const removalLengths = [
    ...new Set(
      filteredRemovalVariants
        .filter((v) => v.name === selectedRemovalSize)
        .map((v) => v.length)
        .filter(Boolean)
    ),
  ];

  // Images setup
  const serviceImages =
    service?.images && service.images.length > 0
      ? service.images
      : service?.image
      ? [service.image]
      : [];

  const activeImage = selectedImage ?? serviceImages[0];

  const canContinueToBook = Boolean(
    selectedSize &&
      selectedLength &&
      selectedVariant &&
      (!checked || (selectedRemovalSize && selectedRemovalLength && selectedRemovalVariant))
  );

  return (
    <div className="grid px-6 md:px-16 md:grid-cols-2 md:gap-16 my-12 pb-12 border-b border-[#E4E4E7] last:border-b-0">
      {/* Left Column: Image Gallery */}
      <div>
        <div className="w-full max-w-[600px] aspect-[4/3] rounded-md overflow-hidden ">
          {activeImage ? (
            <img
              src={activeImage}
              alt={service?.name}
              className="w-full h-full object-contain object-left"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        {serviceImages.length > 1 && (
          <div className="grid grid-cols-4 gap-3 mt-3 max-w-[600px]">
            {serviceImages.map((image: string, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-24 rounded-md overflow-hidden border cursor-pointer transition-all ${
                  activeImage === image ? "border-black border-2" : "border-[#E4E4E7]"
                }`}
              >
                <img
                  src={image}
                  alt={`${service?.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Details & Configuration */}
      <div>
        <div className="flex flex-col">
          <h3 className="text-[#18181B] font-bold text-3xl md:text-[42px]">
            {service?.name}
          </h3>
          <p className="text-[#3F3F46] text-base mt-2">{service?.description}</p>
        </div>

        <div className="border h-px border-[#E4E4E7] my-6"></div>

        {/* Size Options */}
        <div className="my-5">
          <h4 className="font-bold mb-2">Size options</h4>
          {sizes.length > 0 ? (
            sizes.map((sizeOption, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedSize(sizeOption);
                  setSelectedLength(null);
                }}
                className={`border px-4 py-2 mr-2 mb-2 capitalize cursor-pointer rounded-full transition-all ${
                  selectedSize === sizeOption
                    ? "font-bold border-black bg-black text-white"
                    : "font-normal hover:border-gray-400"
                }`}
              >
                {sizeOption}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">No size options available</p>
          )}
        </div>

        {/* Length Options */}
        <div className="my-5">
          <h4 className="font-bold mb-2">Length options</h4>
          {selectedSize ? (
            lengths.map((lengthOption, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedLength(lengthOption ?? "")}
                className={`border px-8 py-2 mr-2 mb-2 capitalize cursor-pointer rounded-full transition-all ${
                  selectedLength === lengthOption
                    ? "font-bold border-black bg-black text-white"
                    : "font-normal hover:border-gray-400"
                }`}
              >
                {lengthOption}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">Select a size to view length options</p>
          )}
        </div>

        <div className="border h-px border-[#E4E4E7] my-6"></div>

        {/* Hair Removal Add-on Section */}
        {service?.name && !service.name.toLowerCase().includes("removal") && (
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-lg">Include Hair removal as an add-on</h3>
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => setIsChecked(!!value)}
              />
            </div>

            {checked && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-h-60 overflow-y-auto">
                <div className="mb-4">
                  <h4 className="font-bold mb-2 text-sm">Removal Size options</h4>
                  {removalSizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setSelectedRemovalSize(sizeOption);
                        setSelectedRemovalLength(null);
                      }}
                      className={`border px-4 py-1.5 mr-2 mb-2 text-sm capitalize cursor-pointer rounded-full ${
                        selectedRemovalSize === sizeOption
                          ? "font-bold border-black bg-black text-white"
                          : "bg-white font-normal"
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-sm">Removal Length options</h4>
                  {selectedRemovalSize ? (
                    removalLengths.map((lengthOption, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedRemovalLength(lengthOption ?? "")}
                        className={`border px-6 py-1.5 mr-2 mb-2 text-sm capitalize cursor-pointer rounded-full ${
                          selectedRemovalLength === lengthOption
                            ? "font-bold border-black bg-black text-white"
                            : "bg-white font-normal"
                        }`}
                      >
                        {lengthOption}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Choose removal size first</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Pricing Summary */}
        <div className="flex items-center justify-between my-6">
          <span className="text-[#18181B] font-medium text-xl">Amount</span>
          <span className="font-bold text-2xl">
            {selectedVariant
              ? `${(
                  selectedVariant.price + (selectedRemovalVariant?.price ?? 0)
                ).toLocaleString()} SEK`
              : "--"}
          </span>
        </div>

        {/* Booking Modal Action */}
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
          <p className="text-sm text-red-500 mt-3 text-center">
            You must be logged in to book this service.
          </p>
        )}

        <p className="text-xs text-center text-gray-500 my-4">
          By continuing to book, I accept Braided Bliss' Booking Policy.
        </p>
      </div>
    </div>
  );
}

// --- Main Page Component ---
function ServicesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = getUserToken();

  const { services, loading } = useServices();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, [token]);

  // Find Removal service ID globally once
  const removalService = services?.find((s) =>
    s.name.toLowerCase().includes("removal")
  );

  if (loading) {
    return (
      <section>
        <Navigation />
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500 font-medium">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navigation />
      <div className="py-6">
        {services?.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            removalServiceId={removalService?.id}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>
    </section>
  );
}

export default ServicesPage;