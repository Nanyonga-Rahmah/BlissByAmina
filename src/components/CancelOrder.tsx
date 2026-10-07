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
    Cancel01Icon,
    InformationCircleIcon,
} from "@hugeicons/core-free-icons";

import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import type { IOrder } from "@/lib/interfaces/interface";
import { CancelOrder } from "@/lib/routes";
import OrderCancellationStatus from "./OrderCancellationStatus";

export interface CancelOrderProps {
    order: IOrder;
}

export function CancelOrderDialog({ order }: CancelOrderProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [cancellationReason, setCancellationReason] = useState("");
    const [status, setStatus] = useState("");

    const [isCancelling, setIsCancelling] = useState(false);
    const [error, setError] = useState("");

    const handleCancellation = async () => {
        try {
            setIsCancelling(true);
            setError("");

            const response = await fetch(CancelOrder(order.id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cancelationReason: cancellationReason,
                }),
            });
            if (!response.ok) {
                setStatus("failure")
            }

            setStatus("success")

            setCurrentStep(2);
        } catch (err: any) {
            console.error("Cancellation failed:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to cancel order. Please try again."
            );
        } finally {
            setIsCancelling(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <HugeiconsIcon
                    icon={Cancel01Icon}
                    color="#A1A1AA"
                    className="cursor-pointer"
                />
            </DialogTrigger>

            <DialogContent className="w-[500px] left-[50%]">
                <DialogHeader>
                    {currentStep === 1 && (
                        <>
                            <DialogTitle>Cancel Order</DialogTitle>

                            <DialogDescription>
                                <div className="flex place-items-center gap-2 bg-[#F4F4F5] rounded-[12px] p-3">
                                    <div className="rounded-full bg-[#DC2626] flex items-center justify-center p-1">
                                        <HugeiconsIcon
                                            icon={InformationCircleIcon}
                                            size={15}
                                            color="#ffffff"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-[#DC2626] font-medium">
                                            Cancellation fees applies
                                        </span>

                                        <span>
                                            Less than 24 hours before service. View{" "}
                                            <a
                                                href="/booking"
                                                className="underline font-medium text-black cursor-pointer"
                                            >
                                                Booking Policy
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </DialogDescription>
                        </>
                    )}
                </DialogHeader>

                <ScrollArea className="max-h-[700px]">
                    {currentStep === 1 && (
                        <div className="grid gap-4">
                            <h3 className="border-b border-[#E4E4E7] pb-2">
                                Order details
                            </h3>

                            <div className="flex flex-col gap-3">
                                {/* Products */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Products
                                    </span>

                                    <span className="text-[#18181B] text-[15px]">
                                        {order.products.map((product, index) => (
                                            <span key={index}>
                                                {product.product.name}
                                            </span>
                                        ))}
                                    </span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        Date
                                    </span>

                                    <div className="flex gap-1 text-[#18181B] text-[15px]">
                                        <span>
                                            {new Date(order.orderDate).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            {new Date(order.orderDate).toLocaleTimeString(
                                                "en-US",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* City */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">
                                        City
                                    </span>

                                    <span className="text-[#18181B] text-[15px]">
                                        {order.city}
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="border flex flex-col gap-2 border-[#E4E4E7] rounded-[12px] p-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#71717A] text-[15px]">
                                            Original amount
                                        </span>

                                        {Number(order.amount).toLocaleString()} SEK
                                    </div>

                                    <div className="flex items-center justify-between text-[#DC2626]">
                                        <span className="text-[15px]">
                                            Cancellation fee
                                        </span>

                                        <span className="text-[15px] font-medium">
                                            -150 SEK
                                        </span>
                                    </div>

                                    <div className="border h-px border-[#E4E4E7]" />

                                    <div className="flex items-center font-bold text-[#18181B] justify-between">
                                        <span className="text-[15px]">
                                            Refund amount
                                        </span>

                                        <span className="text-[15px]">
                                            2,250 SEK
                                        </span>
                                    </div>
                                </div>

                                <p className="text-[#71717A] text-[15px]">
                                    Are you sure you want to cancel this order?
                                    This action cannot be undone.
                                </p>

                                {/* Reason */}
                                <div>
                                    <label
                                        htmlFor="notes"
                                        className="block mb-2 font-medium"
                                    >
                                        Reason for cancellation (Optional)
                                    </label>

                                    <Textarea
                                        id="notes"
                                        maxLength={250}
                                        value={cancellationReason}
                                        onChange={(e) =>
                                            setCancellationReason(e.target.value)
                                        }
                                        placeholder="Let us know why you're cancelling..."
                                    />

                                    <div className="flex items-center justify-between text-[#71717B] text-xs">
                                        <span>
                                            Help us improve our service
                                        </span>

                                        <span>
                                            {cancellationReason.length}/250
                                        </span>
                                    </div>
                                </div>

                                {/* API error */}
                                {error && (
                                    <p className="text-sm text-red-600">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="grid gap-4">
                            <OrderCancellationStatus status={status} />
                        </div>
                    )}

                    <DialogFooter className="flex justify-between items-center my-5">
                        {currentStep === 1 && (
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="rounded-full bg-[#F4F4F5] border-none text-base"
                                    disabled={isCancelling}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        )}

                        {currentStep === 1 && (
                            <Button
                                type="button"
                                className="rounded-full bg-[#DC2626] px-10 py-6 font-bold"
                                onClick={handleCancellation}
                                disabled={isCancelling}
                            >
                                {isCancelling
                                    ? "Cancelling..."
                                    : "Confirm Cancellation"}
                            </Button>
                        )}
                    </DialogFooter>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}