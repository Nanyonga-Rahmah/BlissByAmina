import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type {  IOrder } from "@/lib/interfaces/interface";



interface OrdersTable {
    orders: IOrder[];
}

export function OrdersTable({ orders }: OrdersTable) {

    const getStatus = (status: string) => {
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
                    <TableHead className="text-[#52525B] uppercase">Product</TableHead>
                    <TableHead className="text-[#52525B] uppercase">Total Cost</TableHead>
                    <TableHead className="text-[#52525B] uppercase">Payment</TableHead>

                    <TableHead className="text-[#52525B]">STATUS</TableHead>
                    <TableHead className="text-[#52525B] uppercase">Order date</TableHead>

                    <TableHead className="text-[#52525B]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">
                            <div className="flex flex-col gap-1">
                                <span>{order.shippingFee}</span>


                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-col gap-1">
                                <span>{order.paymentStatus}</span>


                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-col gap-1">
                                <span>{order.status}</span>


                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <span>{String(order.orderDate)}</span>

                            </div>
                        </TableCell>
                        <TableCell>{order.city}</TableCell>
                        <TableCell className={`capitalize `}>{getStatus(order.status)}</TableCell>
                        <TableCell className="">{order.amount}</TableCell>
                        {/* <TableCell className="flex items-center gap-3">
              <ViewBookingDialog />
              {order.status === "upcoming" && <CancelBookingDialog booking={order}/>}
            </TableCell> */}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
