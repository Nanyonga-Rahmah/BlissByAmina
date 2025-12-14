import Navigation from "@/components/header";
import { AppointmentTable } from "@/components/tables/appointmentTable";
import { Button } from "@/components/ui/button";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function OrderHistory() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"services" | "products">(
    "services"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

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

  const filteredServices =
    statusFilter === "all"
      ? services
      : services.filter((service) => service.status === statusFilter);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className=" mx-auto px-6 py-12">
        {/* Services / Products Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex rounded-full bg-[#F4F4F5] p-1">
            {["services", "products"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-white shadow text-[#18181B]"
                    : "text-[#52525B]"
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-[38px] font-bold text-[#18181B]">
              My Appointments
            </h1>
            <p className="text-[#3F3F46]">
              Track and manage your braiding appointments
            </p>
          </div>

          <Button
            onClick={() => navigate("/services")}
            className="rounded-full px-6 py-3 bg-[#18181B] text-white"
          >
            <HugeiconsIcon icon={PlusSignIcon} className="mr-2" />
            New Booking
          </Button>
        </div>

        {/* Status Filters */}
        <div className="flex gap-3 mb-6">
          {[
            { label: "All (1)", value: "all" },
            { label: "Upcoming (1)", value: "upcoming" },
            { label: "Completed (1)", value: "completed" },
            { label: "Cancelled (2)", value: "cancelled" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value as any)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                statusFilter === filter.value
                  ? "bg-[#18181B] text-white"
                  : "bg-[#F4F4F5] text-[#3F3F46]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="border rounded-2xl overflow-hidden">
          <AppointmentTable services={filteredServices} />
        </div>
      </div>

    </div>
  );
}

export default OrderHistory;
