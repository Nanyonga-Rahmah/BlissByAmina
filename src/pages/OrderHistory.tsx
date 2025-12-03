import Navigation from "@/components/header";
import { AppointmentTable } from "@/components/tables/appointmentTable";
import { Button } from "@/components/ui/button";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
// import { useState } from "react";

function OrderHistory() {
  const services = [
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "canceled",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
    {
      name: "Boho boxbraids / Twists",
      bookingDay: "12 Nov,2026",
      bookingTime: "03:00am",
      status: "upcoming",
      city: "Upsala",
      size: "S-medium",
      length: "thigh",
      bookingFee: "2100 SEK",
    },
  ];

//   const [activeState, setCurrentState] = useState<"services" | "products">("services");
  return (
    <div>
      <Navigation />

      <div className="flex flex-col px-8">

        <div className="flex rounded-full bg-[#F4F4F5]">
            {}

        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#18181B] text-[38px]">
              My Appointments
            </h3>
            <p className="text-[#3F3F46]">
              Track and manage your braiding appointments
            </p>
          </div>

          <Button className="flex items-center gap-1 px-4 rounded-full">
            <HugeiconsIcon icon={PlusSignIcon} />
            New Booking
          </Button>
        </div>

        <div className="border rounded-2xl my-5">
          <AppointmentTable services={services} />
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
