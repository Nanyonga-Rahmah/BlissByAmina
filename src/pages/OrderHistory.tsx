import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/header";
import { AppointmentTable } from "@/components/tables/appointmentTable";
import { OrdersTable } from "@/components/tables/ordersTable";
import { Button } from "@/components/ui/button";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useUserBookings } from "@/lib/hooks/user-userBookings";
import { useUserOrders } from "@/lib/hooks/use-userOrders";

type TabType = "services" | "products";
type StatusFilterType = "all" | "upcoming" | "completed" | "cancelled";

export default function OrderHistory() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabType>("services");
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>("all");

  const { bookings = [] } = useUserBookings();
  const { orders = [] } = useUserOrders();

  // Reset filter when switching tabs
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setStatusFilter("all");
  };

  // Memoized Booking Counts & Filtered Data
  const bookingCounts = useMemo(() => {
    return {
      all: bookings.length,
      upcoming: bookings.filter((b) => b.status === "upcoming").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (statusFilter === "all") return bookings;
    return bookings.filter((b) => b.status === statusFilter);
  }, [bookings, statusFilter]);

  // Memoized Order Counts & Filtered Data
  const orderCounts = useMemo(() => {
    return {
      all: orders.length,
      upcoming: orders.filter((o) => o.status === "upcoming" || o.status === "processing").length,
      completed: orders.filter((o) => o.status === "completed" || o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    if (statusFilter === "upcoming") {
      return orders.filter((o) => o.status === "upcoming" || o.status === "processing");
    }
    if (statusFilter === "completed") {
      return orders.filter((o) => o.status === "completed" || o.status === "delivered");
    }
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  console.log(orders)
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Services / Products Tab Toggle */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex rounded-full bg-[#F4F4F5] p-1 w-full max-w-xs sm:w-auto">
            {(["services", "products"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`flex-1 sm:flex-initial px-5 sm:px-8 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 capitalize ${activeTab === tab
                    ? "bg-white shadow-sm text-[#18181B] font-semibold"
                    : "text-[#52525B] hover:text-[#18181B]"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* SERVICES / APPOINTMENTS SECTION */}
        {activeTab === "services" && (
          <section className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight">
                  My Appointments
                </h1>
                <p className="text-sm sm:text-base text-[#3F3F46] mt-1">
                  Track and manage your braiding appointments
                </p>
              </div>

              <Button
                onClick={() => navigate("/services")}
                className="w-full sm:w-auto rounded-full px-6 py-2.5 sm:py-3 bg-[#18181B] text-white hover:bg-black transition-colors"
              >
                <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-6">
                <h2 className="text-lg font-semibold text-gray-800">No Appointments Found</h2>
                <p className="text-sm text-gray-500 mt-1">
                  You have no appointments scheduled at this time.
                </p>
                <Button
                  onClick={() => navigate("/services")}
                  variant="outline"
                  className="mt-4 rounded-full"
                >
                  Book a Service
                </Button>
              </div>
            ) : (
              <>
                {/* Status Filter Pills */}
                <StatusFilterBar
                  counts={bookingCounts}
                  selected={statusFilter}
                  onChange={setStatusFilter}
                />

                {/* Table */}
                <div className="border border-gray-200 rounded-2xl overflow-x-auto bg-white shadow-sm">
                  <AppointmentTable services={filteredBookings} />
                </div>
              </>
            )}
          </section>
        )}

        {/* PRODUCTS / ORDERS SECTION */}
        {activeTab === "products" && (
          <section className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#18181B] tracking-tight">
                  My Orders
                </h1>
                <p className="text-sm sm:text-base text-[#3F3F46] mt-1">
                  Track and manage your hair accessories orders
                </p>
              </div>

              <Button
                onClick={() => navigate("/shop")}
                className="w-full sm:w-auto rounded-full px-6 py-2.5 sm:py-3 bg-[#18181B] text-white hover:bg-black transition-colors"
              >
                <HugeiconsIcon icon={PlusSignIcon} className="mr-2 h-4 w-4" />
                New Order
              </Button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-6">
                <h2 className="text-lg font-semibold text-gray-800">No Orders Found</h2>
                <p className="text-sm text-gray-500 mt-1">
                  You have no product orders placed yet.
                </p>
                <Button
                  onClick={() => navigate("/shop")}
                  variant="outline"
                  className="mt-4 rounded-full"
                >
                  Explore Shop
                </Button>
              </div>
            ) : (
              <>
                {/* Status Filter Pills */}
                <StatusFilterBar
                  counts={orderCounts}
                  selected={statusFilter}
                  onChange={setStatusFilter}
                />

                {/* Table */}
                <div className="border border-gray-200 rounded-2xl overflow-x-auto bg-white shadow-sm">
                  <OrdersTable orders={filteredOrders} />
                </div>
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

// Reusable Filter Bar Component
function StatusFilterBar({
  counts,
  selected,
  onChange,
}: {
  counts: { all: number; upcoming: number; completed: number; cancelled: number };
  selected: StatusFilterType;
  onChange: (filter: StatusFilterType) => void;
}) {
  const filters: { label: string; value: StatusFilterType; count: number }[] = [
    { label: "All", value: "all", count: counts.all },
    { label: "Upcoming", value: "upcoming", count: counts.upcoming },
    { label: "Completed", value: "completed", count: counts.completed },
    { label: "Cancelled", value: "cancelled", count: counts.cancelled },
  ];

  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      {filters.map((filter) => {
        const isActive = selected === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 ${isActive
                ? "bg-[#18181B] text-white shadow-sm"
                : "bg-[#F4F4F5] text-[#3F3F46] hover:bg-gray-200"
              }`}
          >
            {filter.label} ({filter.count})
          </button>
        );
      })}
    </div>
  );
}