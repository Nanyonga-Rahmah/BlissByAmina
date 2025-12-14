import { useState } from "react";
import { Button } from "./ui/button";

function PaymentStatus() {
  const [paymentStatus] = useState<
    "pending" | "successful" | "failed"
  >("failed");
  return (
    <div>
      {paymentStatus === "pending" && <p>Your payment is being processed...</p>}
      {paymentStatus === "successful" && (
        <div className=" ">
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src="/images/confirmed.png" alt="Confirmed" />
            </div>
            <p className="mt-2 text-[#22C55E]">Booking Confirmed</p>
            <span className="text-[#18181B] mt-2 font-bold text-xl">
              2100 SEK
            </span>
          </div>

          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7]"></div>

          <div className="flex flex-col gap-3">
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
              <span className="text-[#71717A] text-[15px]">Amount</span>
              <div className="flex flex-col">
                <span className="font-bold">1,800 SEK</span>
                <span className="text-[#A1A1AA]">incl. 25% VAT</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Status</span>
              <span className="text-[#22C55E] text-[15px]">Paid</span>
            </div>

            <div className="border h-px border-[#E4E4E7]"></div>

            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Service date</span>
              <span className="text-[#18181B] text-[15px]">
                12 Nov, 2026 | 03:00am
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Booking date</span>
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
          </div>
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="rounded-full bg-[#F4F4F5]  border-none text-base"
            >
              Close
            </Button>

            <Button className="rounded-full px-10 py-6 font-bold">
              Download Receipt
            </Button>
          </div>
        </div>
      )}

      {paymentStatus === "failed" && (
        <div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src="/images/failed.svg" alt="Confirmed" />
            </div>
            <p className="mt-2 text-[#EF4444]">Booking Failed</p>
            <span className="text-[#18181B] mt-2 font-bold text-xl">
              2100 SEK
            </span>
          </div>
          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7] "></div>

          <p className="text-[#3F3F46] ">
            Your payment of 2,100 SEK for Boxbraids / Twists didn’t go through.
            Please try again or use a different payment method. If the issue
            persists, contact support for help
          </p>

             <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="rounded-full bg-[#F4F4F5]  border-none text-base"
            >
              Close
            </Button>

            <Button className="rounded-full px-10 py-6 font-bold">
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentStatus;
