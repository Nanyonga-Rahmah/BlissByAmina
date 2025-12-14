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
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-[#FAFAFA] h-16">
          <TableHead className="text-[#52525B]">SERVICE</TableHead>
          <TableHead className="text-[#52525B]">DATE & TIME</TableHead>
          <TableHead className="text-[#52525B]">CITY</TableHead>
          <TableHead className="text-[#52525B]">STATUS</TableHead>
          <TableHead className="text-[#52525B]">PRICE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex flex-col gap-1">
                <span>{service.name}</span>

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
            <TableCell className="capitalize">{service.status}</TableCell>
            <TableCell className="">{service.bookingFee}</TableCell>
            <TableCell className="flex items-center gap-3">
              <ViewBookingDialog />
              {service.status === "upcoming" && <CancelBookingDialog />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
