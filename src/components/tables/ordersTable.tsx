import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { IOrder } from "@/lib/interfaces/interface";
import { ViewOrderDialog } from "../ViewOrderDetails";
import { CancelOrderDialog } from "../CancelOrder";



interface OrdersTable {
    orders: IOrder[];
}

  export const getStatus = (status: string) => {
        switch (status) {
            case "succeeded":
                return <span className="text-[#16A34A] bg-[#DCFCE7] rounded-full p-2">Paid</span>;
            case "pending":
                return <span className="bg-[#DBEAFE] text-[#2563EB] rounded-full p-2 text-sm">Pending</span>
case "canceled":
                return <span className="text-red-500 rounded-full p-2 bg-red-200">Canceled</span>;
                case "processing refund":
                return <span className="text-orange-500 rounded-full p-2 bg-orange-200">Processing Refund</span>;
            case "failed":
                return <span className="text-red-500 rounded-full p-2 bg-red-200">Failed</span>;
            default:
                return <span className="text-gray-500 rounded-full p-2 bg-gray-200">Unknown</span>;
        }
    };
export function OrdersTable({ orders }: OrdersTable) {

  

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
                    <TableRow key={index} className="h-14">
                        <TableCell className="font-medium">
                            <div className="flex  gap-1 ">

                                {order.products.map((product, index) => (
                                    <span key={index}>{product.product.name}</span>

                                ))}


                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="flex flex-col gap-1">
                                <span>{Number(order.amount).toLocaleString()} SEK</span>


                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div className="">
                                {getStatus(order.paymentStatus)}


                            </div>
                        </TableCell>
                        <TableCell className="font-medium">
                            <div>
                                {getStatus(order.status)}


                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex flex-col gap-1">
                                <span>
                                    {new Date(order.orderDate).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {new Date(order.orderDate).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell className="flex items-center gap-3  justify-end">
                            <ViewOrderDialog order={order} />
                            {order.status === "pending" && <CancelOrderDialog order={order} />}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
