import Footer from "@/components/Footer";
import Navigation from "@/components/header";
import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <section>
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col border-b bprder-[#E4E4E7] mb-6 items-center gap-2 pb-10">
          <h4 className="text-[#71717B]">BRAIDED BLISS BY AMINA</h4>
          <h1 className="text-4xl font-bold ">Privacy Policy</h1>
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
              services. All services are subject
              to availability, location, and confirmation.
            </li>
            <li>
              Service descriptions, prices, and availability may be updated from
              time to time.
            </li>
          </ul>

          <h2 className="text-xl font-bold mt-4">
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
          <p>
            By confirming a booking, you agree to the{" "}
            <Link to="/booking" className="underline font-bold cursor-pointer">
              Booking Policy
            </Link>
            , including cancellation fees and preparation requirements.
          </p>

          <h2 className="text-xl font-bold mt-4">3. Payments</h2>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>Accepted Payment Method:Swish</li>
            <li>Prices are displayed in SEK (Swedish krona)</li>
            <li>
              Full payment is required to confirm a booking unless stated
              otherwise.
            </li>
          </ul>

          <h3 className="text-[#18181B] text-xl font-bold">
            4. Cancellation & Refunds
          </h3>
          <p className="text-[#3F3F46]">
            Cancellations are governed by the{" "}
            <Link to="/booking" className="underline font-bold cursor-pointer">
              Booking Policy
            </Link>
            , which forms part of these Terms.
          </p>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>
              Customer cancellations may incur a cancellation fee depending on
              timing.
            </li>
            <li>
              Refunds are processed to the original payment method within the
              stated timeframe.
            </li>
            <li>Service provider cancellations result in a full refund.</li>
          </ul>

          <h3 className="text-[#18181B] text-xl font-bold">
            5. Client Responsibilities
          </h3>
          <p className="text-[#3F3F46]">You agree to</p>
          <ul className="list-disc list-inside text-[#3F3F46]">
            <li>Prepare your hair as instructed before your appointment.</li>
            <li>
              Inform the service provider in advance about pets at your
              location.
            </li>
            <li>
              SProvide a safe, respectful, and suitable environment for the
              service.
            </li>
            <li>Treat the service provider with respect at all times.</li>
          </ul>
          <p>
            We reserve the right to refuse service if conditions are unsafe or
            requirements are not met.
          </p>

          <h3 className="text-[#18181B] text-xl font-bold">
            6. Changes to Services or Terms
          </h3>
          <p className="text-[#3F3F46]">
            We may update services, pricing, or these Terms at any time. Updates
            will be posted on the website, and continued use of the service
            means you accept the revised Terms.
          </p>

          <h2 className="text-xl font-bold mt-4">
            7. Limitation of Liability{" "}
          </h2>
          <p className="text-[#3F3F46] ">
            We are not responsible for:
          </p>
          <ul className=" text-[#3F3F46] text-lg">
            <li>
              Allergic reactions or sensitivities unless disclosed in advance.
            </li>
            <li>Delays caused by factors outside reasonable control.</li>
            <li>
              Loss or damage resulting from failure to follow aftercare
              instructions.
            </li>
          </ul>
          <p>
            Services are provided “as is” and to the best professional standard.
          </p>
          <h3 className="text-[#18181B] text-xl font-bold">8. Governing Law</h3>
          <p className="text-[#3F3F46]">
            These Terms are governed by and interpreted in accordance with the
            laws of Sweden.
          </p>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default PrivacyPolicy;
