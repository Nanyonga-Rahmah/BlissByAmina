import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";



import { HugeiconsIcon } from "@hugeicons/react";
import {

    ViewIcon,
} from "@hugeicons/core-free-icons";
import type { CancelOrderProps } from "./CancelOrder";
import { getStatus } from "./tables/ordersTable";


export function ViewOrderDialog({ order }: CancelOrderProps) {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        console.log("Next step");
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        }
    };

    //   const handleBack = () => {
    //     if (currentStep > 1) {
    //       setCurrentStep(currentStep - 1);
    //     }
    //   };
    setTimeout(() => {
        if (currentStep === 5) {
            setCurrentStep(6);
        }
    }, 10000);

    console.log(order)
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <HugeiconsIcon
                        icon={ViewIcon}
                        color="#A1A1AA"
                        className="cursor-pointer"
                    />
                </DialogTrigger>
                <DialogContent className="w-[500px] max-h-[700px] overflow-y-auto right-[.2%]">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>

                        <DialogDescription>
                            <div className="flex  gap-1 flex-col bg-[#F4F4F5] rounded-[12px] p-3">
                                <span className="text-[#18181B] text-[15px]">
                                    Order #ORD-{order.id}
                                </span>{" "}
                                <div className="flex products-center justify-between">
                                    <div className="flex  gap-1 text-[#18181B] text-[15px]"> Placed on
                                        <span>
                                            {new Date(order.orderDate).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                        at
                                        <span className="text-sm text-gray-500">
                                            {new Date(order.orderDate).toLocaleTimeString("en-US", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>                {getStatus(order.status)}
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    {currentStep === 1 && (
                        <div className="grid gap-4">
                            <div className="flex flex-col gap-3">
                                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                                    Customer Information
                                </h3>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Name</span>
                                    <span className="text-[#18181B] text-[15px]">{order.customerName}</span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Email</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        john@gmail.com{" "}
                                    </span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Phone</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        +46 70 123 4567{" "}
                                    </span>
                                </div>
                                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                                    Shipping Information
                                </h3>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Country</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        BK-2026-001{" "}
                                    </span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        City
                                    </span>
                                    <span className="text-[#18181B] text-[15px]">
                                        {order.city}
                                    </span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Address
                                    </span>
                                    <span className="text-[#18181B] text-[15px]">
                                        12 Nov, 2026 | 03:00am
                                    </span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Appartment</span>
                                    <span className="text-[#18181B] text-[15px]">Uppsala</span>
                                </div>


                                <h3 className="border-b border-[#E4E4E7] text-[#71717A] pb-2">
                                    Ordered Products
                                </h3>
                                <div className="  flex flex-col ">
                                    {order.products.map((product) => {



                                        return (
                                            <div
                                                key={product.productVariantId}
                                                className="p-2 border text-xs flex items-center justify-between rounded-md border-[#E4E4E7]"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="rounded-xl h-16 w-16 overflow-hidden shrink-0 bg-muted">
                                                        <img
                                                            src={product.product.images?.[0]}
                                                            alt={product.product.name}
                                                            className="object-cover h-full w-full"
                                                        />
                                                    </div>

                                                    {/* Product information */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between gap-2">
                                                            <div>
                                                                <h3 className="font-semibold text-base">
                                                                    {product.product.name}
                                                                </h3>
                                                              <div className="flex gap-1 text-xs">
                                                                <p>{product.product.color}</p>
                                                                  <p>{product.product.type}</p>
                                                                  <p>{product.product.size}</p>
                                                              </div> 
                                                            </div>


                                                        </div>

                                                        {/* Price */}
                                                      

                                                        {/* Quantity */}
                                                      <div className="flex gap-2">
                                                          <div className="flex products-center gap-3 border border-[#18181B] rounded-full px-3 py-1 w-max mt-3">
                                                            <span className="text-xs">
                                                                QTY:{product.quantity}
                                                            </span>

                                                        </div>
                                                         <div className="flex products-center gap-3 border border-[#18181B] rounded-full px-3 py-1 w-max mt-3">
                                                            <span className="text-xs">
                                                                UNIT COST: {Number(product.product.price).toLocaleString()} SEK
                                                            </span>

                                                        </div>
                                                      </div>
                                                    </div>
                                                </div>
                                                  <div className="flex justify-between products-center mt-2">
                                                            <span className="text-sm">
                                                                {Number(product.product.price * product.quantity).toLocaleString()} SEK
                                                            </span>


                                                        </div>
                                            </div>
                                        );
                                    })}




                                </div>

                                <h3 className="border-b border-[#E4E4E7] border-dotted text-[#71717A] pb-2">
                                    Payment Details{" "}
                                </h3>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                       Status
                                    </span>
                                   {getStatus(order.paymentStatus)}
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Payment method
                                    </span>
                                    <span className="text-[#18181B] text-[15px]">
                                       Card
                                    </span>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Subtotal fee
                                    </span>
                                    <div className="flex flex-col">
                                        <span className="font-bold">1,800 SEK</span>
                                        <span className="text-[#A1A1AA]">incl. 25% VAT</span>
                                    </div>
                                </div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Shipping  costs
                                    </span>
                                    <span className="font-bold">{order.shippingFee.toLocaleString()} SEK</span>
                                </div>

                                <div className="border h-px border-[#E4E4E7]"></div>
                                <div className="flex products-center justify-between">
                                    <span className="text-[#18181B] font-bold text-[15px]">
                                        Total
                                    </span>
                                    <span className="text-[#18181B] text-[15px] font-bold">
                                        {Number(order.amount).toLocaleString()} SEK
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className=" flex justify-between products-center my-5">
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                className="rounded-full bg-[#F4F4F5]  border-none text-base"
                            >
                                Close{" "}
                            </Button>
                        </DialogClose>

                        <Button
                            type="button"
                            variant="outline"
                            className="rounded-full text-[#DC2626]  px-10 py-6 font-bold"
                            onClick={handleNext}
                        >
                            Cancel Order
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
