import Footer from "@/components/Footer";
import Navigation from "@/components/header";

function TermsOfService() {
  return (
    <section>
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col border-b bprder-[#E4E4E7] mb-6 items-center gap-2 pb-10">
          <h4 className="text-[#71717B]">BRAIDED BLISS BY AMINA</h4>
          <h1 className="text-4xl font-bold ">Terms Of Service</h1>
          <span className="text-[#52525C]">
            Last updated: 16 November, 2025
          </span>
        </div>
        <div className="space-y-3 text-lg leading-relaxed">
          <p className="text-[#3F3F46] text-lg">
            These Terms of Service (“Terms”) govern your use of the Braided
            Bliss by Amina website and services. By accessing the website or
            booking an appointment, you agree to be bound by these Terms.
          </p>
          <h2 className="text-xl text-[#18181B] font-bold ">1.Services</h2>
          <ul className=" text-[#3F3F46] text-lg">
            <li>
              Braided Bliss by Amina provides professional hair braiding
              services and related hair care services. All services are subject
              to availability, location, and confirmation.
            </li>
            <li>
              Service descriptions, prices, and availability may be updated from
              time to time.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-4">
            2. Bookings & Appointments
          </h2>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>
              All bookings must be made through the website or approved booking
              channels.
            </li>
            <li>
              You are responsible for providing accurate booking information,
              including service selection, address, and contact details.
            </li>
            <li>Only one booking per time slot is allowed.</li>
          </ul>
          <p>By confirming a booking, you agree to the Booking Policy, including cancellation fees and preparation requirements.</p>
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
          <h2 className="text-xl font-bold ">4. Contact Information </h2>
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
          <h2 className="text-xl font-bold ">Quick Reference Summary</h2>
          <div className="border border-[#E4E4E7] rounded-[10px]  bg-[#FAFAFA] ">
            <table className="w-full p-4 ">
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

export default TermsOfService;
