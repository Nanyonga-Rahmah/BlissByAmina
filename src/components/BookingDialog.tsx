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
import { useState } from "react";

import {  ChevronDown } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { UserDetailsForm } from "@/forms/UserDetailsForm";
import { ScrollArea } from "./ui/scroll-area";
import { CardDetailsForm } from "@/forms/CardDetailsForm";
import PaymentStatus from "./PaymentStatus";

const cities = [
  {
    value: "Uppsala",
    label: "Uppsala",
    charge: 100,
  },
  {
    value: "Södertälje",
    label: "Södertälje",
    charge: 300,
  },
  {
    value: "Västerås",
    label: "Västerås",
    charge: 400,
  },
  {
    value: "Norrköping",
    label: "Norrköping",
    charge: 500,
  },
  {
    value: "Örebro",
    label: "Örebro",
    charge: 600,
  },
];

const availableTimes = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "13:00 PM",
  "14:00 PM",
];
export function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    console.log("Next step");
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  setTimeout(() => {
    setCurrentStep(6);
  }, 4000);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="uppercase text-white rounded-full w-full text-[20px] py-7 cursor-pointer">
            Continue to Book
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[500px]">
          <DialogHeader>
            {currentStep <= 4 && <DialogTitle>Book an Appointment</DialogTitle>}{" "}
            {currentStep <= 2 && (
              <DialogDescription>
                <div className="flex place-items-center gap-2 bg-[#F4F4F5] rounded-[12px] p-3">
                  <div className="rounded-full bg-[#3B82F6] flex items-center justify-center p-1">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      size={15}
                      color="#ffffff"
                    />
                  </div>
                  <span>
                    Please note that customers are responsible for travel costs,
                    and hair extensions are not included in the listed service
                    price.
                  </span>
                </div>
              </DialogDescription>
            )}
          </DialogHeader>
          <ScrollArea className="max-h-[700px] ">
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
                      {value
                        ? cities.find((framework) => framework.value === value)
                            ?.label
                        : "Choose your city..."}
                      <ChevronDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[460px] h-[200px] overflow-y-auto p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search city..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {cities.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                                setOpen(false);
                              }}
                            >
                              <div className="flex items-center justify-between  w-full">
                                {framework.label}

                                {framework.charge && (
                                  <span className="text-sm text-gray-500">
                                    {framework.charge} SEK
                                  </span>
                                )}
                              </div>
                              {/* <Check
                            className={cn(
                              "ml-auto",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          /> */}
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

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md w-full"
                    captionLayout="dropdown"
                  />
                </div>

                <div className="rounded-[10px] border border-[#E4E4E7] p-3">
                  <p className="border-b mt-2 pb-3 border-[#E4E4E7] text-[#71717A] font-medium">
                    Select time (Times are in UTC)
                  </p>

                  <div className="mt-3 flex flex-wrap">
                    {availableTimes.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTime(time)}
                        className={`border px-4 py-2 m-2 bg-[#FAFAFA] cursor-pointer rounded-full 
            ${selectedTime === time ? "font-bold border-black" : "font-normal"}
          `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="grid gap-4">
                <UserDetailsForm />
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid gap-4 ">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Service</span>
                  <span className="text-[#18181B] text-[15px]">
                    Boxbraids / Twists
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Size</span>
                  <span className="text-[#18181B] text-[15px]">S-Medium</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Length</span>
                  <span className="text-[#18181B] text-[15px]">Thigh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">City</span>
                  <span className="text-[#18181B] text-[15px]">Uppsala</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Address</span>
                  <span className="text-[#18181B] text-[15px]">
                    Plot 36, Uppsala strt
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">
                    Service date
                  </span>
                  <span className="text-[#18181B] text-[15px]">
                    12 Nov, 2026 | 03:00am
                  </span>
                </div>

                <div className="border h-px border-[#E4E4E7]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">
                    Service fee
                  </span>
                  <div className="flex flex-col">
                    <span className="font-bold">1,800 SEK</span>
                    <span className="text-[#A1A1AA]">incl. 25% VAT</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">
                    Travel Costs
                  </span>
                  <span className="text-[#18181B] text-[15px] font-bold">
                    300 SEK{" "}
                  </span>
                </div>

                <div className="border h-px border-[#E4E4E7]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#18181B] font-bold text-[15px]">
                    Total
                  </span>
                  <span className="text-[#18181B] text-[15px] font-bold">
                    2100 SEK
                  </span>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <CardDetailsForm />
              </div>
            )}

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
            )}

            {currentStep === 6 && <PaymentStatus />}
            <DialogFooter className=" flex justify-between items-center my-5">
              {currentStep === 1 && (
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="rounded-full bg-[#F4F4F5]  border-none text-base"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              )}
              {currentStep > 1 && currentStep <= 4 && (
                <Button
                  variant="outline"
                  className="rounded-full bg-[#F4F4F5]  border-none text-base"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              {currentStep <= 4 && (
                <Button
                  type="button"
                  className="rounded-full px-10 py-6 font-bold"
                  onClick={handleNext}
                >
                  {currentStep === 1 && "Continue"}
                  {currentStep === 2 && "Review Booking Summary"}
                  {currentStep === 3 && "Proceed to Payment"}
                  {currentStep === 4 && "Pay Now"}
                </Button>
              )}
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </form>
    </Dialog>
  );
}
