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

import { ChevronDown } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  InformationCircleIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { ScrollArea } from "./ui/scroll-area";

import { Textarea } from "./ui/textarea";
import CancellationStatus from "./CancellationStatus";

export function ViewBookingDialog() {
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
    if (currentStep === 5) {
      setCurrentStep(6);
    }
  }, 10000);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <HugeiconsIcon
            icon={ViewIcon}
            color="#A1A1AA"
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="w-[500px] right-[.2%]">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>

            <DialogDescription>
              <div className="flex  gap-1 flex-col bg-[#F4F4F5] rounded-[12px] p-3">
                <span className="text-[#18181B] text-[15px]">
                  Boxbraids / Twists
                </span>{" "}
                <div className="flex items-center justify-between">
                  <span>Size: S-medium • Length: Thigh</span>
                  <span className="bg-green-100 text-[#16A34A] rounded-full p-2">
                    Completed
                  </span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          {currentStep === 1 && (
            <div className="grid gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Booking ID</span>
                  <span className="text-[#18181B] text-[15px]">
                    BK-2026-001{" "}
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
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">
                    Booking date
                  </span>
                  <span className="text-[#18181B] text-[15px]">
                    12 Nov, 2026 | 03:00am
                  </span>
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

                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                  Customer Information
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Name</span>
                  <span className="text-[#18181B] text-[15px]">John Doe </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Email</span>
                  <span className="text-[#18181B] text-[15px]">
                    john@gmail.com{" "}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">Phone</span>
                  <span className="text-[#18181B] text-[15px]">
                    +46 70 123 4567{" "}
                  </span>
                </div>

                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                  Additional notes{" "}
                </h3>
                <p>Please keep time </p>

                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                  Payment Details{" "}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[#71717A] text-[15px]">
                    Payment method
                  </span>
                  <span className="text-[#18181B] text-[15px]">
                    +46 70 123 4567{" "}
                  </span>
                </div>
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
                    Travel costs
                  </span>
                  <span className="font-bold">300 SEK</span>
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
            </div>
          )}

          <DialogFooter className=" flex justify-between items-center my-5">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="rounded-full bg-[#F4F4F5]  border-none text-base"
              >
                Close{" "}
              </Button>
            </DialogClose>

            <Button
              type="button"
              className="rounded-full  px-10 py-6 font-bold"
              onClick={handleNext}
            >
              Book Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
