import Footer from "@/components/Footer";
import Navigation from "@/components/header";

function BookingPolicyPage() {
  return (
    <section>
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col border-b bprder-[#E4E4E7] mb-6 items-center gap-2 pb-10">
          <h4 className="text-[#71717B]">BRAIDED BLISS BY AMINA</h4>
          <h1 className="text-4xl font-bold ">Booking Policy</h1>
          <span className="text-[#52525C]">
            Last updated: 16 November, 2025
          </span>
        </div>
        <div className="space-y-3 text-lg leading-relaxed">
          <p className="text-[#3F3F46] text-lg">
            This Booking Policy outlines the terms and conditions for making,
            preparing for, and canceling appointments with Braided Bliss by
            Amina. By booking a service, you agree to follow the guidelines
            below. These policies are designed to ensure a smooth experience for
            both you and the service provider.
          </p>
          <h2 className="text-xl tetx-[#18181B] font-bold ">
            1.Booking Requirements
          </h2>
          <h3 className="text-[#18181B] font-bold">1.1 Hair Extensions</h3>
          <ul className="list-disc list-inside text-[#3F3F46] text-lg">
            <li>Hair extensions are not included in the service price.</li>
            <li>
              If you need help getting extensions, please inform me in advance
              so I can assist you.
            </li>
          </ul>
          <h3 className="text-[#18181B] font-bold">1.2 Payment Method</h3>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>I only accept Swish payments.</li>
          </ul>
          <h3 className="text-[#18181B] font-bold">1.3 Pets at home</h3>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>
              If you have pets at home and the appointment is at your location,
              please let me know beforehand.
            </li>
          </ul>
          <h3 className="text-[#18181B] font-bold">1.4 Hair Preparation</h3>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>
              Please ensure your hair is washed, clean, and blow-dried before
              your appointment.
            </li>
            <li>
              Arriving with unprepared hair may lead to delays or additional
              charges.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold mt-4">
            2. Customer Cancellations
          </h2>
          <h3 className="text-[#18181B] font-bold">2.1 Cancellation Fees</h3>
          <p className="text-[#3F3F46]">
            Customers who cancel their bookings will be subject to the following
            cancellation fees, which will be deducted from the total payment
            amount:
          </p>
          <div className="border-l flex flex-col border-[#D4D4D8] pl-4 space-y-2 mx-4">
            <span className="font-bold">
              (a) Cancellations More Than 24 Hours Before Service
            </span>
            <span className="text-[#3F3F46]">
              A cancellation fee of 100 SEK will be charged for bookings
              canceled more than 24 hours before the scheduled service date and
              time.
            </span>
          </div>
          <div className="border-l flex flex-col border-[#D4D4D8] pl-4 mt-2 space-y-2 mx-4">
            <span className="font-bold">
              (b) Cancellations Less Than 24 Hours Before Service
            </span>
            <span className="text-[#3F3F46]">
              A cancellation fee of 150 SEK will be charged for bookings
              canceled less than 24 hours before the scheduled service date and
              time.
            </span>
          </div>
          <h3 className="text-[#18181B] font-bold">2.2 Refund Processing</h3>
          <p className="text-[#3F3F46]">
            Upon cancellation, the refund amount (total payment minus applicable
            cancellation fee) will be processed within 5-7 business days to the
            original payment method used during booking.
          </p>
          <h3 className="text-[#18181B] font-bold">2.3 Rationale</h3>
          <p className="text-[#3F3F46]">
            These cancellation fees protect against potential losses incurred
            from last-minute cancellations, particularly when travel
            arrangements have been made and time has been allocated for the
            service. The fees help compensate for the opportunity cost of
            blocked time slots that could have been offered to other customers.
          </p>
          <h2 className="text-2xl font-semibold mt-4">
            3. Service Provider Cancellations{" "}
          </h2>
          <h3 className="text-[#18181B] font-bold">3.1 Full Refund Policy</h3>
          <ul className=" text-[#3F3F46] text-lg">
            <li>
              If the service provider must cancel an appointment for any reason,
              regardless of the timing (whether more or less than 24 hours
              before the scheduled service), customers will receive a 100% full
              refund of their payment.
            </li>
            <li>
              No cancellation fees will be applied to customers in the event of
              a service provider cancellation.
            </li>
          </ul>
          <h3 className="text-[#18181B] font-bold">3.2 Notification</h3>
          <p className="text-[#3F3F46]">
            In the event of a service provider cancellation, customers will be
            notified as soon as possible via email and/or phone to the contact
            information provided during booking.
          </p>
          <h3 className="text-[#18181B] font-bold">3.3 Refund Processing</h3>
          <p className="text-[#3F3F46]">
            Full refunds for service provider cancellations will be processed
            within 3-5 business days to the original payment method used during
            booking.
          </p>
          <h2 className="text-xl font-bold ">
            4. Contact Information{" "}
          </h2>
          <p className="text-[#3F3F46]">
            For questions, concerns, or requests regarding this Cancellation
            Policy, please contact us at:
          </p>
          <div className="border border-[#E4E4E7] flex flex-col space-y-2 rounded-[10px] bg-[#FAFAFA] p-4">
            <span className="text-[#18181B] font-bold">
              BraidedBliss Customer Support
            </span>
            <div className="text-[#3F3F46]">
              <span>Email:</span>
              <span>Boxbraidsamina4@gmail.com</span>
            </div>
            <div className="text-[#3F3F46]">
              <span>Phone:</span>
              <span>+46728874011</span>
            </div>
          </div>
          <h2 className="text-xl font-bold ">
            Quick Reference Summary
          </h2>
          <div className="border border-[#E4E4E7] rounded-[10px]  bg-[#FAFAFA] ">
            <table className="w-full p-4 " >
              <thead className="border-b bg-[#F4F4F5]  h-14">
                <tr className="">
                  <th className="text-left px-4">Cancellation Type</th>
                  <th className="text-left">Timing</th>
                  <th className="text-left">Fee / Refund</th>
                </tr>
              </thead>
              <tbody className="text-[#3F3F46] ">
                <tr className="border-b h-14 ">
                  <td className="px-4">Customer Cancellation</td>
                  <td> {">"} 24 hours before service</td>
                  <td className="font-bold text-black">100 SEK fee</td>
                </tr>
                <tr className="border-b h-14">
                  <td className="px-4">Customer Cancellation</td>
                  <td> {"<"} 24 hours before service</td>
                  <td className="font-bold text-black">150 SEK fee</td>
                </tr>
                <tr className="border-b h-14">
                  <td className="px-4">Service Provider Cancellation</td>
                  <td>Anytime</td>
                  <td className="font-bold text-black">100% refund</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default BookingPolicyPage;
