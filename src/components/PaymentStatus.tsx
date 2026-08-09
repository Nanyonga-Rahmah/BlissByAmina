import type { IService, IVariant } from "@/lib/interfaces/interface";
import type { CityOption } from "./BookingDialog";
import { Button } from "./ui/button";
import { format } from "date-fns";

interface PaymentStatusProps {
  success?: boolean;
  failure?: boolean;
  selectedVariant?: IVariant | null;
  selectedCity?: CityOption | null;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  service?: IService | null;
  totalFee?: number;
  address?: string;
}
function PaymentStatus({
  success,
  totalFee,
  selectedCity,
  selectedVariant,
  service,
  selectedDate,
  selectedTime,
  address,
}: PaymentStatusProps) {
  // const [paymentStatus] = useState<
  //   "pending" | "successful" | "failed"
  // >("failed");
  return (
    <div>
      {success ? (
        <div className=" ">
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src="/images/confirmed.png" alt="Confirmed" />
            </div>
            <p className="mt-2 text-[#22C55E]">Booking Confirmed</p>
            <span className="text-[#18181B] mt-2 font-bold text-xl">
              {totalFee} SEK
            </span>
          </div>

          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7]"></div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Service</span>
              <span className="text-[#18181B] text-[15px]">
                {service?.name}{" "}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Size</span>
              <span className="text-[#18181B] text-[15px]">
                {selectedVariant?.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Length</span>
              <span className="text-[#18181B] text-[15px]">
                {selectedVariant?.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Amount</span>
              <div className="flex flex-col">
                <span className="font-bold">
                  {totalFee?.toLocaleString()} SEK
                </span>
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
                {selectedDate ? format(selectedDate, "dd MMM, yyyy") : ""} |{" "}
                {selectedTime ?? ""}{" "}
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
              <span className="text-[#18181B] text-[15px]">
                {selectedCity?.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#71717A] text-[15px]">Address</span>
              <span className="text-[#18181B] text-[15px]">{address}</span>
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
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src="/images/failed.svg" alt="Confirmed" />
            </div>
            <p className="mt-2 text-[#EF4444]">Booking Failed</p>
            <span className="text-[#18181B] mt-2 font-bold text-xl">
              {totalFee} SEK
            </span>
          </div>
          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7] "></div>

          <p className="text-[#3F3F46] ">
            Your payment of {totalFee} SEK for {service?.name} didn’t go
            through. Please try again or use a different payment method. If the
            issue persists, contact support for help
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
