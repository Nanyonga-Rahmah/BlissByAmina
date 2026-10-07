import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { ChevronDown } from "lucide-react";

import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { UserDetailsForm } from "@/forms/UserDetailsForm";
import { CardDetailsForm } from "@/forms/CardDetailsForm";
import PaymentStatus from "./PaymentStatus";
import type { IService, IVariant } from "@/lib/interfaces/interface";
import { useCities } from "@/lib/hooks/use-cities";
import { useAvailableDays } from "@/lib/hooks/use-availabledays";
import CalendarPicker from "./CalenderPicker";
import { format } from "date-fns";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";

interface BookingDialogProps {
  selectedVariant?: IVariant | null;
  disabled?: boolean;
  service?: IService;
  hasRemovalAddOn?: boolean;

  removalDetailsSize?: string;
  removalDetailsLength?: string;
  removalDetailsPrice?: number;
}

export interface CityOption {
  id?: number;
  name: string;
  travelFee?: number;
}
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export function BookingDialog({
  selectedVariant,
  disabled,
  service,
  hasRemovalAddOn,
  removalDetailsLength,
  removalDetailsPrice,
  removalDetailsSize,
}: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityOption>();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const { cities } = useCities();
  const { availableDays } = useAvailableDays();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validAvailableDays = availableDays.filter((item) => {
    const date = new Date(item.day);
    date.setHours(0, 0, 0, 0);

    return date >= today && item.status === "available";
  });

  const filteredCities = cities.filter((city) => city.status === "active");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = getUserToken();

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<
    { start: string; end: string }[]
  >([]);
  const [dateError, setDateError] = useState<string | null>(null);
  const [isUserFormValid, setIsUserFormValid] = useState(false);

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    notes: "",
  });
  // const removeSelectedDate = () => {
  //   localStorage.removeItem("selectedDate");
  // };

  const handleDateSelect = (date: Date) => {
    const clickedDay = date.toISOString().split("T")[0];

    const dayData = validAvailableDays.find(
      (d) => new Date(d.day).toISOString().split("T")[0] === clickedDay,
    );

    if (!dayData || dayData.status !== "available") {
      setSelectedDate(null);
      setAvailableTimes([]);
      setSelectedTime(null);
      setDateError("This day is not available. Please select another date.");
      return;
    }

    // ✅ Day available
    setSelectedDate(date);
    setAvailableTimes(dayData.timeSlots);
    setSelectedTime(null);
    setDateError(null);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedDate || !selectedTime) return;
    }

    if (currentStep === 2) {
      if (!isUserFormValid) return;
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  setTimeout(() => {
    if (currentStep === 5) {
      setCurrentStep(6);
    }
  }, 10000);

  const Total = (selectedVariant?.price ?? 0) + (removalDetailsPrice ?? 0);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            disabled={disabled || !isLoggedIn}
            className={`uppercase text-white rounded-full w-full text-[20px] py-7 ${disabled || !isLoggedIn
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              } `}
          >
            Continue to Book
          </Button>
        </DialogTrigger>
        <DialogContent className="md:w-[500px] max-h-[700px] md:max-h-[900px] overflow-y-auto left-[50%]">
          <DialogHeader>
            {currentStep <= 4 && (
              <DialogTitle className="text-left my-4">
                Book an Appointment
              </DialogTitle>
            )}{" "}
            {currentStep <= 2 && (
              <DialogDescription>
                <div className="flex place-items-center gap-2 bg-[#F4F4F5] rounded-[12px] p-3">
                  <div className="hidden rounded-full bg-[#3B82F6] md:flex items-center justify-center p-1">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      size={15}
                      color="#ffffff"
                    />
                  </div>
                  <span className="text-left">
                    Please note that customers are responsible for travel costs,
                    and hair extensions are not included in the listed service
                    price.
                  </span>
                </div>
              </DialogDescription>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-sm">
                    Selected service
                  </span>
                  <span className="text-sm text-[#71717A]">Cost</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-black font-bold">
                    {service?.name}
                  </span>
                  <span className="font-bold text-black">
                    {Total.toLocaleString()} SEK
                  </span>
                </div>
                <div className="flex items-center justify-between my-4">
                  <span className="text-black font-bold text-sm">
                    Has BraidRemoval as an add on?
                  </span>
                  <span className=" text-[[#71717A]]">
                    {hasRemovalAddOn ? "Yes" : "No removal booked"}
                  </span>
                </div>
              </div>
            )}
          </DialogHeader>
          {/* <ScrollArea className="md:max-h-[700px] "> */}
          {currentStep === 1 && (
            <div className="grid gap-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between h-12"
                  >
                    {selectedCity ? (
                      <div className="flex items-center justify-between w-full">
                        <span>{selectedCity.name}</span>

                        {selectedCity.travelFee && (
                          <span className="text-sm text-gray-500">
                            {selectedCity.travelFee.toLocaleString()} SEK
                          </span>
                        )}
                      </div>
                    ) : (
                      "Choose your city..."
                    )}
                    <ChevronDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="md:w-[460px] h-[200px] overflow-y-auto p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search city..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {filteredCities.map((city) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={() => {
                              setSelectedCity(city);
                              setOpen(false);
                            }}
                          >
                            <div className="flex items-center justify-between w-full">
                              {city.name}

                              {city.travelFee && (
                                <span className="text-sm text-gray-500">
                                  {city.travelFee.toLocaleString()} SEK
                                </span>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="rounded-[10px] border border-[#E4E4E7] p-3">
                <p className="border-b mt-2 pb-3 border-[#E4E4E7] text-[#71717A] font-medium">
                  Select date
                </p>

                {validAvailableDays.length > 0 ? (
                  <div className="w-full h-full ">
                    <CalendarPicker
                      selectedDate={selectedDate}
                      availableDays={validAvailableDays}
                      onSelectDate={handleDateSelect}
                    />

                    {dateError && (
                      <p className="mt-2 text-sm text-red-500 font-medium">
                        {dateError}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-red-500 font-medium">
                    No available dates at the moment. Please check back later.
                  </p>
                )}
              </div>

              <div className="rounded-[10px] border border-[#E4E4E7] p-3">
                <p className="border-b mt-2 pb-3 border-[#E4E4E7] text-[#71717A] font-medium">
                  Select time (Times are in UTC)
                </p>

                <div className="mt-3 flex flex-wrap">
                  {selectedDate && availableTimes.length > 0 ? (
                    availableTimes.map((slot, index) => {
                      const label = `${slot.start} - ${slot.end}`;

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTime(label)}
                          className={`border px-4 py-2 m-2 bg-[#FAFAFA] rounded-full
            ${selectedTime === label
                              ? "font-bold border-black"
                              : "border-[#E4E4E7]"
                            }
          `}
                        >
                          {label}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-sm text-[#71717A]">
                      Select an available date to see time slots
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <div className="grid gap-4 ">
              <UserDetailsForm
                setUserDetails={setUserDetails}
                onValidityChange={setIsUserFormValid}
                userDetails={userDetails}
              />
            </div>
          )}


          {currentStep === 3 && (
            <div className="grid gap-4 ">
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Service</span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {service?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Size</span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {selectedVariant?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Length</span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {selectedVariant?.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">
                  Includes Hair Removal
                </span>
                <span className="text-[#18181B] capitalize font-bold text-[15px]">
                  {hasRemovalAddOn ? "Yes" : "No removal booked"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">
                  Hair to be Removed
                </span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {removalDetailsSize || "N/A"}{" "}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">
                  Removal Length
                </span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {removalDetailsLength || "N/A"}{" "}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">
                  Removal Price
                </span>
                <span className="text-[#18181B]  font-bold capitalize text-[15px]">
                  {removalDetailsPrice?.toLocaleString() || 0} SEK{" "}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">City</span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {selectedCity?.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Address</span>
                <span className="text-[#18181B] capitalize text-[15px]">
                  {userDetails?.address}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Service date</span>
                <span className="text-[#18181B] text-[15px]">
                  {selectedDate ? format(selectedDate, "dd MMM, yyyy") : ""} |{" "}
                  {selectedTime ?? ""}{" "}
                </span>
              </div>

              <div className="border h-px border-[#E4E4E7]"></div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Service fee</span>
                <div className="flex flex-col">
                  <span className="font-bold">
                    {selectedVariant?.price} SEK
                  </span>
                  <span className="text-[#A1A1AA]">incl. 25% VAT</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#71717A] text-[15px]">Travel Costs</span>
                <span className="text-[#18181B] text-[15px] font-bold">
                  {selectedCity?.travelFee} SEK{" "}
                </span>
              </div>

              <div className="border h-px border-[#E4E4E7]"></div>
              <div className="flex items-center justify-between">
                <span className="text-[#18181B] font-bold text-[15px]">
                  Total
                </span>
                <span className="text-[#18181B] text-[15px] font-bold">
                  {(
                    Number(selectedCity?.travelFee ?? 0) + Number(Total ?? 0)
                  ).toLocaleString()}{" "}
                  SEK
                </span>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <Elements stripe={stripePromise}>
              <CardDetailsForm
                setFailure={setFailure}
                setSuccess={setSuccess}
                totalFee={
                  Number(selectedCity?.travelFee ?? 0) + Number(Total ?? 0)
                }
                service={service}
                selectedVariant={selectedVariant}
                selectedCity={selectedCity}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                hasRemovalAddOn={hasRemovalAddOn ?? false}
                removalDetailsLength={removalDetailsLength ?? ""}
                removalDetailsPrice={String(removalDetailsPrice ?? "")}
                removalDetailsSize={removalDetailsSize ?? ""}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            </Elements>
          )}
          {/* 
          {currentStep === 5 && (
            <div className="flex flex-col my-8 items-center justify-center px-8">
              <div>
                <img src="/images/progress.svg" alt="Progress" />
              </div>
              <p className="text-blue-500 mt-4">Processing your payment…</p>
              <span className="text-[#18181B] mt-2 font-bold text-xl">
                2100 SEK
              </span>
              <div className=" mt-4 border-t  border-2 border-dashed w-full border-[#E4E4E7]"></div>
              <p className="text-[#3F3F46] mt-5">
                Please wait while we securely confirm your booking. This may
                take a few seconds, don’t close this window.
              </p>
            </div>
          )} */}

          {currentStep === 5 && (
            <PaymentStatus
              success={success}
              failure={failure}
              totalFee={
                Number(selectedCity?.travelFee ?? 0) + Number(Total ?? 0)
              }
              address={userDetails?.address}
              service={service}
              selectedVariant={selectedVariant}
              selectedCity={selectedCity}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          )}
          <DialogFooter className=" flex justify-between items-center my-5">
            {currentStep === 1 && (
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-full  bg-[#F4F4F5]  border-none text-base"
                >
                  Cancel
                </Button>
              </DialogClose>
            )}
            {currentStep > 1 && currentStep < 4 && (
              <Button
                variant="outline"
                className="rounded-full  bg-[#F4F4F5]  border-none text-base"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {currentStep < 4 && (
              <Button
                type="submit"
                className="rounded-full  px-10 py-6 font-bold"
                onClick={handleNext}
                disabled={
                  !selectedDate ||
                  !selectedTime ||
                  !selectedCity ||
                  (currentStep === 2 && !isUserFormValid)
                }
              >
                {currentStep === 1 && "Continue"}
                {currentStep === 2 && "Review Booking Summary"}
                {currentStep === 3 && "Proceed to Payment"}
                {currentStep === 4 && "Pay Now"}
              </Button>
            )}
          </DialogFooter>
          {/* </ScrollArea> */}
        </DialogContent>
      </form>
    </Dialog>
  );
}
