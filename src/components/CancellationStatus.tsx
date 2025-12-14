import { useState } from "react";
import { Button } from "./ui/button";

function CancellationStatus() {
  const [paymentStatus] = useState<"pending" | "successful" | "failed">(
    "failed"
  );
  return (
    <div>
      {paymentStatus === "pending" && <p>Your payment is being processed...</p>}
      {paymentStatus === "successful" && (
        <div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <img src="/images/confirmed.png" alt="Confirmed" />
            </div>
            <p className="mt-2 text-[#22C55E]">Booking Cancelled</p>
          </div>
          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7] "></div>

    <div className="text-center space-y-4">
          <p className="text-[#3F3F46] ">
            Your booking has been cancelled successfully. Your refund has been
            processed, and the amount will be returned to your payment method
            shortly.
          </p>
          <p>We hope to style you again soon.</p>

    </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="rounded-full bg-[#F4F4F5]  border-none text-base"
            >
              Close
            </Button>

            <Button className="rounded-full px-10 py-6 font-bold">
              Book Again
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
            <p className="mt-2 text-[#EF4444]">Cancellation Failed</p>
           
          </div>
          <div className=" my-3 border-t  border-2 border-dashed w-full border-[#E4E4E7] "></div>

       <div className="flex text-center">
           <p className="text-[#3F3F46] ">
           We couldn’t complete your cancellation due to a temporary issue. Please try again or contact support if the problem continues.
          </p>
       </div>

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

export default CancellationStatus;
