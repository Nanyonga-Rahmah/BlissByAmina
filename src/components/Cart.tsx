import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { OrderDetailsForm } from "@/forms/OrderDetailsForm";
import { useUserCart } from "@/lib/hooks/use-cart";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
// import { CardDetailsForm } from "@/forms/CardDetailsForm";

interface CartProps {
    isLogggedIn: boolean;
    lastName?: string;
    cartId?: number;
    userId: number;
}

export function CartDialog({
    lastName,
    userId,
    // cartId,
    isLogggedIn,
}: CartProps) {
    const { cart } = useUserCart(userId);

    // Keep quantity for each product separately
    const [quantities, setQuantities] = useState<Record<number, number>>({});

    const [currentStep, setCurrentStep] = useState<number>(1)
    const [, setIsUserFormValid] = useState(false);
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
        notes: "",
    });

    const HandleNext = () => {
        setCurrentStep(currentStep + 1)
    }


    const HandlePrevious = () => {
        setCurrentStep(currentStep - 1)
    }
    // Set the initial quantity from the quantity stored in the cart
    useEffect(() => {
        if (!cart?.products) return;

        const initialQuantities: Record<number, number> = {};

        cart.products.forEach((product) => {
            initialQuantities[product.productVariantId] = product.quantity;
        });

        setQuantities(initialQuantities);
    }, [cart]);

    const increaseQuantity = (productVariantId: number) => {
        setQuantities((prev) => ({
            ...prev,
            [productVariantId]: (prev[productVariantId] ?? 1) + 1,
        }));
    };

    const decreaseQuantity = (productVariantId: number) => {
        setQuantities((prev) => ({
            ...prev,
            [productVariantId]: Math.max(
                1,
                (prev[productVariantId] ?? 1) - 1,
            ),
        }));
    };

    // Calculate total
    const total =
        cart?.products.reduce((sum, item) => {
            const quantity =
                quantities[item.productVariantId] ?? item.quantity;

            return sum + item.product.price * quantity;
        }, 0) ?? 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button
                    type="button"
                    className="cursor-pointer flex items-center space-x-1"
                >
                    <ShoppingCart
                        className="h-5 w-5"
                        strokeWidth={1.5}
                    />
                    <span>CART</span>
                </button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md">
                {!isLogggedIn ? (
                    <p className="h-full flex items-center justify-center">
                        Please login to view cart
                    </p>
                ) : !cart || !cart.products?.length ? (
                    <p className="h-full flex items-center justify-center">
                        User Cart is empty
                    </p>
                ) : (
                    <>
                        {currentStep == 1 && (
                            <>
                                <SheetHeader>
                                    <SheetTitle className="text-2xl font-bold">
                                        {lastName}'s Cart

                                    </SheetTitle>
                                </SheetHeader>

                                <div className=" px-4  flex flex-col h-full">
                                    {cart.products.map((item) => {
                                        const quantity =
                                            quantities[item.productVariantId] ??
                                            item.quantity;

                                        const product = item.product;

                                        return (
                                            <div
                                                key={item.productVariantId}
                                                className="py-5 border-b border-[#E4E4E7] last-of-type:border-b border-dashed border-[#E4E4E7]"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="rounded-xl h-24 w-24 overflow-hidden shrink-0 bg-muted">
                                                        <img
                                                            src={product.images?.[0]}
                                                            alt={product.name}
                                                            className="object-cover h-full w-full"
                                                        />
                                                    </div>

                                                    {/* Product information */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between gap-2">
                                                            <div>
                                                                <h3 className="font-semibold text-base">
                                                                    {product.name}
                                                                </h3>

                                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                                    {product.description}
                                                                </p>
                                                            </div>

                                                            {/* Remove */}
                                                            <button
                                                                type="button"
                                                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                                            >
                                                                <X size={20} />
                                                            </button>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex justify-between items-center mt-2">
                                                            <span className="text-sm">
                                                                {product.price.toLocaleString()} SEK
                                                            </span>

                                                            <span className="font-semibold">
                                                                {(product.price * quantity).toLocaleString()} SEK
                                                            </span>
                                                        </div>

                                                        {/* Quantity */}
                                                        <div className="flex items-center gap-3 border border-[#18181B] rounded-full px-3 py-1 w-max mt-3">
                                                            <span className="text-xs">
                                                                QTY:
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    decreaseQuantity(
                                                                        item.productVariantId,
                                                                    )
                                                                }
                                                                disabled={quantity <= 1}
                                                                className="text-sm disabled:opacity-40 cursor-pointer"
                                                            >
                                                                −
                                                            </button>

                                                            <span className="font-medium text-sm w-4 text-center">
                                                                {quantity}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    increaseQuantity(
                                                                        item.productVariantId,
                                                                    )
                                                                }
                                                                className="text-sm cursor-pointer"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Total */}
                                    <div className="flex justify-between items-center  py-5 ">
                                        <span className="text-lg">
                                            Total
                                        </span>

                                        <span className="text-xl font-bold">
                                            {total.toLocaleString()} SEK
                                        </span>
                                    </div>

                                    {/* Checkout */}
                                    <button
                                        type="button"
                                        onClick={HandleNext}
                                        className="w-full bg-[#18181B] justify-self-end text-white rounded-full py-3  font-medium"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        )



                        }
                        {currentStep == 2 && (
                            <div className="px-4 max-h-[720px] overflow-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-2xl font-bold">
                                        Enter delivery details

                                    </SheetTitle>
                                </SheetHeader>
                                <div>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        defaultValue="item-1"
                                    >                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="no-underline">
                                                <div className="flex flex-col gap-1">
                                                    <span>Your order</span>
                                                    <span className="text-[#71717A] text-sm">{cart.products.length}
                                                        products from Braided Bliss</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className=" px-4  flex flex-col ">
                                                    {cart.products.map((item) => {
                                                        const quantity =
                                                            quantities[item.productVariantId] ??
                                                            item.quantity;

                                                        const product = item.product;

                                                        return (
                                                            <div
                                                                key={item.productVariantId}
                                                                className="py-5 border-b border-[#E4E4E7] last-of-type:border-b border-dashed border-[#E4E4E7]"
                                                            >
                                                                <div className="flex gap-4">
                                                                    <div className="rounded-xl h-24 w-24 overflow-hidden shrink-0 bg-muted">
                                                                        <img
                                                                            src={product.images?.[0]}
                                                                            alt={product.name}
                                                                            className="object-cover h-full w-full"
                                                                        />
                                                                    </div>

                                                                    {/* Product information */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex justify-between gap-2">
                                                                            <div>
                                                                                <h3 className="font-semibold text-base">
                                                                                    {product.name}
                                                                                </h3>

                                                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                                                    {product.description}
                                                                                </p>
                                                                            </div>


                                                                        </div>

                                                                        {/* Price */}
                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <span className="text-sm">
                                                                                {product.price.toLocaleString()} SEK
                                                                            </span>

                                                                            <span className="font-semibold">
                                                                                {(product.price * quantity).toLocaleString()} SEK
                                                                            </span>
                                                                        </div>

                                                                        {/* Quantity */}
                                                                        <div className="flex items-center gap-3 border border-[#18181B] rounded-full px-3 py-1 w-max mt-3">
                                                                            <span className="text-xs">
                                                                                QTY:
                                                                            </span>



                                                                            <span className="font-medium text-sm w-4 text-center">
                                                                                {quantity}
                                                                            </span>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}




                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                <div>
                                    <OrderDetailsForm onValidityChange={setIsUserFormValid}
                                        userDetails={userDetails}
                                        setUserDetails={setUserDetails}
                                    />
                                </div>

                                <div className="flex justify-between gap-10 items-center mt-28">
                                    <button
                                        type="button"
                                        onClick={HandlePrevious}
                                        className="w-full bg-[#F4F4F5] text-[#09090B] justify-self-end  rounded-full py-3  font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={HandleNext}
                                        className="w-full bg-[#18181B] justify-self-end text-white rounded-full py-3  font-medium"
                                    >
                                        Pay Now
                                    </button>
                                </div>

                            </div>
                        )}

                        {currentStep == 3 && (
                            <div className="px-4 max-h-[720px] overflow-auto">
                                <SheetHeader>
                                    <SheetTitle className="text-2xl font-bold">
                                        Make payment

                                    </SheetTitle>
                                </SheetHeader>
                                <div>
                                    <Accordion
                                        type="single"
                                        collapsible
                                        defaultValue="item-1"
                                    >                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="no-underline">
                                                <div className="flex flex-col gap-1">
                                                    <span>Your order</span>
                                                    <span className="text-[#71717A] text-sm">{cart.products.length}
                                                        products from Braided Bliss</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className=" px-4  flex flex-col ">
                                                    {cart.products.map((item) => {
                                                        const quantity =
                                                            quantities[item.productVariantId] ??
                                                            item.quantity;

                                                        const product = item.product;

                                                        return (
                                                            <div
                                                                key={item.productVariantId}
                                                                className="py-5 border-b border-[#E4E4E7] last-of-type:border-b border-dashed border-[#E4E4E7]"
                                                            >
                                                                <div className="flex gap-4">
                                                                    <div className="rounded-xl h-24 w-24 overflow-hidden shrink-0 bg-muted">
                                                                        <img
                                                                            src={product.images?.[0]}
                                                                            alt={product.name}
                                                                            className="object-cover h-full w-full"
                                                                        />
                                                                    </div>

                                                                    {/* Product information */}
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex justify-between gap-2">
                                                                            <div>
                                                                                <h3 className="font-semibold text-base">
                                                                                    {product.name}
                                                                                </h3>

                                                                                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                                                                    {product.description}
                                                                                </p>
                                                                            </div>


                                                                        </div>

                                                                        {/* Price */}
                                                                        <div className="flex justify-between items-center mt-2">
                                                                            <span className="text-sm">
                                                                                {product.price.toLocaleString()} SEK
                                                                            </span>

                                                                            <span className="font-semibold">
                                                                                {(product.price * quantity).toLocaleString()} SEK
                                                                            </span>
                                                                        </div>

                                                                        {/* Quantity */}
                                                                        <div className="flex items-center gap-3 border border-[#18181B] rounded-full px-3 py-1 w-max mt-3">
                                                                            <span className="text-xs">
                                                                                QTY:
                                                                            </span>



                                                                            <span className="font-medium text-sm w-4 text-center">
                                                                                {quantity}
                                                                            </span>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}




                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                {/* <div>
                                    <CardDetailsForm
                                        handleNext={HandleNext}
                                        handleBack={HandlePrevious}

                                    />
                                </div> */}

                                <div>
                                    <h4 className="text-[#18181B] text-lg font-bold">Order Summary</h4>

                                    <div className="flex items-center justify-between gap-10">
                                        <input type="text" name="discount" id="discount" className="border py-1 px-1 border-[#E4E4E7] flex-grow rounded-md" />
                                        <button className="border border-[#18181B] rounded-full px-3 py-2">Apply</button>
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4">
                                        <div className="flex justify-between items-center">
                                            <span>Subtotal</span>
                                            <span>{total.toLocaleString()} SEK</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Taxes (25%)</span>
                                            <span>{(0.25 * total).toLocaleString()} SEK</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Discount</span>
                                            <span></span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Shipping costs</span>
                                            <span>{3000} SEK</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between gap-10 items-center mt-28">
                                    <button
                                        type="button"
                                        onClick={HandlePrevious}
                                        className="w-full bg-[#F4F4F5] text-[#09090B] justify-self-end  rounded-full py-3  font-medium"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={HandleNext}
                                        className="w-full bg-[#18181B] justify-self-end text-white rounded-full py-3  font-medium"
                                    >
                                        Pay Now
                                    </button>
                                </div>

                            </div>
                        )}



                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}