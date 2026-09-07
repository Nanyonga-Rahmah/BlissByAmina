import type { ICartItem, IService, IVariant } from "@/lib/interfaces/interface";
import type { CityOption } from "./BookingDialog";
import { Button } from "./ui/button";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface PaymentStatusProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    success?: boolean;
    failure?: boolean;
    selectedVariant?: IVariant | null;
    selectedCity?: CityOption | null;
    selectedDate?: Date | null;
    selectedTime?: string | null;
    products?: ICartItem[];
    service?: IService | null;
    totalFee?: number;
    address?: string;
    onClose?: () => void;
}

function OrderPaymentStatus({
    open,
    onOpenChange,
    success,
    totalFee,
    selectedCity,
    selectedVariant,
    service,
    products,
    selectedDate,
    selectedTime,
    address,
    onClose,
}: PaymentStatusProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                {success ? (
                    <div>
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <img src="/images/confirmed.png" alt="Confirmed" />
                            </div>
                            <p className="mt-2 text-[#22C55E]">Purchase Confirmed</p>
                            <span className="text-[#18181B] mt-2 font-bold text-xl">
                                {totalFee?.toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="my-3 border-t border-2 border-dashed w-full border-[#E4E4E7]"></div>

                        <div className="flex flex-col gap-3">
                            {/* Render Service if present */}
                            {service && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Service</span>
                                    <span className="text-[#18181B] text-[15px] font-medium">
                                        {service.name}
                                    </span>
                                </div>
                            )}

                            {/* Render Single Selected Variant */}
                            {selectedVariant && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Variant</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        {selectedVariant.name}
                                    </span>
                                </div>
                            )}

                            {/* Render Ordered Products List */}
                            {products && products.length > 0 && (
                                <div className="flex flex-col gap-2 my-1">
                                    <span className="text-[#71717A] text-[14px] font-semibold">
                                        Items Purchased:
                                    </span>
                                    <div className="flex flex-col gap-2 pl-2 border-l-2 border-[#E4E4E7]">
                                        {products.map((item, idx) => (
                                            <div
                                                key={item.productVariantId || idx}
                                                className="flex items-center justify-between text-[14px]"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[#18181B] font-medium">
                                                        {item.product?.name}
                                                    </span>
                                                    <span className="text-xs text-[#71717A]">
                                                        Qty: {item.quantity} {item.product?.size ? `| Size: ${item.product.size}` : ""}
                                                    </span>
                                                </div>
                                                <span className="text-[#18181B] font-medium">
                                                    {item.product?.price ? `${item.product.price * item.quantity} SEK` : ""}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Amount & Tax */}
                            <div className="flex items-center justify-between">
                                <span className="text-[#71717A] text-[15px]">Total Amount</span>
                                <div className="flex flex-col text-right">
                                    <span className="font-bold">
                                        {totalFee?.toLocaleString()} SEK
                                    </span>
                                    <span className="text-[#A1A1AA] text-xs">incl. 25% VAT</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[#71717A] text-[15px]">Status</span>
                                <span className="text-[#22C55E] text-[15px] font-medium">Paid</span>
                            </div>

                            <div className="border h-px border-[#E4E4E7]"></div>

                            {/* Schedule Dates */}
                            {selectedDate && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Date & Time</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        {format(selectedDate, "dd MMM, yyyy")} {selectedTime ? `| ${selectedTime}` : ""}
                                    </span>
                                </div>
                            )}

                            {selectedCity?.name && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">City</span>
                                    <span className="text-[#18181B] text-[15px]">
                                        {selectedCity.name}
                                    </span>
                                </div>
                            )}

                            {address && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[#71717A] text-[15px]">Address</span>
                                    <span className="text-[#18181B] text-[15px]">{address}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-8 gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="rounded-full bg-[#F4F4F5] border-none text-base w-1/3"
                            >
                                Close
                            </Button>

                            <Button className="rounded-full px-6 py-6 font-bold flex-1">
                                Download Receipt
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col items-center justify-center">
                            <div>
                                <img src="/images/failed.svg" alt="Failed" />
                            </div>
                            <p className="mt-2 text-[#EF4444] font-medium">Payment Failed</p>
                            <span className="text-[#18181B] mt-2 font-bold text-xl">
                                {totalFee?.toLocaleString()} SEK
                            </span>
                        </div>

                        <div className="my-3 border-t border-2 border-dashed w-full border-[#E4E4E7]"></div>

                        <p className="text-[#3F3F46] text-sm text-center">
                            Your payment of {totalFee} SEK didn’t go through. Please try again or use a different payment method. If the issue persists, contact support.
                        </p>

                        <div className="flex justify-between mt-8 gap-3">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                className="rounded-full bg-[#F4F4F5] border-none text-base w-1/3"
                            >
                                Close
                            </Button>

                            <Button className="rounded-full px-6 py-6 font-bold flex-1">
                                Try Again
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default OrderPaymentStatus;