import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBooking } from "@/lib/interfaces/interface";

import { CancelBookingDialog } from "../CancelBookingDialog";
import { ViewBookingDialog } from "../ViewBookingDetails";

interface AppointmentTableProps {
  services: IBooking[];
}

export function AppointmentTable({ services }: AppointmentTableProps) {

  const getStatus = (status:string) => {
    switch (status) {
      case "upcoming":
        return <span className="text-green-500 bg-green-200 rounded-full p-2">Upcoming</span>;
      case "completed":
        return <span className="text-blue-500 rounded-full p-2 bg-blue-200">Completed</span>;
      case "cancelled":
        return <span className="text-red-500 rounded-full p-2 bg-red-200">Cancelled</span>;
      default:
        return <span className="text-gray-500 rounded-full p-2 bg-gray-200">Unknown</span>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#FAFAFA] h-16">
          <TableHead className="text-[#52525B]">SERVICE</TableHead>
          <TableHead className="text-[#52525B]">DATE & TIME</TableHead>
          <TableHead className="text-[#52525B]">CITY</TableHead>
          <TableHead className="text-[#52525B]">STATUS</TableHead>
          <TableHead className="text-[#52525B]">PRICE</TableHead>
          <TableHead className="text-[#52525B]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex flex-col gap-1">
                <span>{service.serviceName}</span>

                <div className="flex items-center gap-2 text-[#71717A]">
                  <span>{service.size}</span>
                  <span>{service.length}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span>{service.bookingDay}</span>

                <span>{service.bookingTime}</span>
              </div>
            </TableCell>
            <TableCell>{service.city}</TableCell>
            <TableCell className={`capitalize `}>{getStatus(service.status)}</TableCell>
            <TableCell className="">{service.amount}</TableCell>
            <TableCell className="flex items-center gap-3">
              <ViewBookingDialog />
              {service.status === "upcoming" && <CancelBookingDialog booking={service}/>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
