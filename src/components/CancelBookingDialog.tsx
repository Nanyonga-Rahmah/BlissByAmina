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

import { useState } from "react";



import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { ScrollArea } from "./ui/scroll-area";

import { Textarea } from "./ui/textarea";
import CancellationStatus from "./CancellationStatus";
import type { IBooking } from "@/lib/interfaces/interface";

interface CancelBookingDialogProps {
  booking:IBooking;}


export function CancelBookingDialog({booking}:CancelBookingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    console.log("Next step");
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

//   const handleBack = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };
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
            icon={Cancel01Icon}
            color="#A1A1AA"
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="w-[500px] left-[50%]">
          <DialogHeader>
            {currentStep <= 1 && <DialogTitle>Cancel Booking</DialogTitle>}{" "}
            {currentStep <= 1 && (
              <DialogDescription>
                <div className="flex place-items-center gap-2 bg-[#F4F4F5] rounded-[12px] p-3">
                  <div className="rounded-full bg-[#DC2626] flex items-center justify-center p-1">
                    <HugeiconsIcon
                      icon={InformationCircleIcon}
                      size={15}
                      color="#ffffff"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#DC2626] font-medium">
                      Cancellation fees applies
                    </span>
                    <span>
                      Less than 24 hours before service. View{" "}
                      <a
                        href="/booking"
                        className="underline font-medium text-black cursor-pointer"
                      >
                        Booking Policy
                      </a>
                    </span>
                  </div>
                </div>
              </DialogDescription>
            )}
          </DialogHeader>
          <ScrollArea className="max-h-[700px] ">
            {currentStep === 1 && (
              <div className="grid gap-4">
                <h3 className="border-b border-[#E4E4E7] pb-2">
                  Booking details
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717A] text-[15px]">Service</span>
                    <span className="text-[#18181B] text-[15px]">
                      {booking.serviceName} / {booking.size} / {booking.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717A] text-[15px]">Date</span>
                    <span className="text-[#18181B] text-[15px]">
                      {booking.bookingDay} | {booking.bookingTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#71717A] text-[15px]">City</span>
                    <span className="text-[#18181B] text-[15px]">{booking.city}</span>
                  </div>

                  <div className="border flex flex-col gap-2 border-[#E4E4E7] rounded-[12px] p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#71717A] text-[15px]">
                        Original amount
                      </span>
                      {Number(booking.amount).toLocaleString()} SEK
                    </div>
                    <div className="flex items-center justify-between text-[#DC2626]">
                      <span className="text-[15px]">Cancellation fee</span>
                      <span className=" text-[15px] font-medium">-150 SEK</span>
                    </div>
                    <div className="border h-px border-[#E4E4E7]"></div>

                    <div className="flex items-center font-bold text-[#18181B] justify-between">
                      <span className=" text-[15px]">Refund amount</span>
                      <span className=" text-[15px]">2,250 SEK</span>
                    </div>
                  </div>

                  <p className="text-[#71717A] text-[15px]">
                    Are you sure you want to cancel this booking? This action
                    cannot be undone.
                  </p>

                  <div>
                    <label htmlFor="notes " className="block mb-2 font-medium">
                      Reason for cancellation(Optional)
                    </label>
                    <Textarea
                      id="notes"
                      placeholder="Let us know why you're cancelling..."
                    />

                    <div className="flex items-center justify-between text-[#71717B] text-xs">
                      <span>Help us improve our service</span>
                      <span>0/250</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="grid gap-4">
                <CancellationStatus />
              </div>
            )}

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
              
              {currentStep <= 1 && (
                <Button
                  type="button"
                  className="rounded-full bg-[#DC2626] px-10 py-6 font-bold"
                  onClick={handleNext}
                >
                  {currentStep === 1 && "Confirm Cancellation"}
                
                </Button>
              )}
            </DialogFooter>
          </ScrollArea>
        </DialogContent>
      </form>
    </Dialog>
  );
}
