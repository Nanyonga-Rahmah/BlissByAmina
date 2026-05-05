import Navigation from "@/components/header";
import { AppointmentTable } from "@/components/tables/appointmentTable";
import { Button } from "@/components/ui/button";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserBookings } from "@/lib/hooks/user-userBookings";

function OrderHistory() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"services" | "products">(
    "services",
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const { bookings } = useUserBookings();


  const filteredServices =
    statusFilter === "all"
      ? bookings
      : bookings.filter((service) => service.status === statusFilter);

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
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-lg font-semibold">No Appointments Found</h2>
            <p className="text-gray-500">
              You have no appointments scheduled at this time.
            </p>
          </div>
        ):(
          <>
          
          
        <div className="flex gap-3 mb-6">
          {[
            { label: `All (${bookings.length})`, value: "all" },
            {
              label: `Upcoming (${bookings.filter((b) => b.status === "upcoming").length})`,
              value: "upcoming",
            },
            {
              label: `Completed (${bookings.filter((b) => b.status === "completed").length})`,
              value: "completed",
            },
            {
              label: `Cancelled (${bookings.filter((b) => b.status === "cancelled").length})`,
              value: "cancelled",
            },
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
        </div></>
        )}


      </div>
    </div>
  );
}

export default OrderHistory;
