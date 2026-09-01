import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateOrder, MakePayment } from "@/lib/routes";
import type { IVariant } from "@/lib/interfaces/interface";
import {
  getAuthUser,
  getUserToken,
  isAuthenticated,
} from "@/lib/cookies/User-Management";
import type { CityOption } from "@/components/BookingDialog";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2),
  amount: z.string().min(1),
});

export interface ICartItem {
  productVariantId: string | number;
  quantity: number;
  product: {
    name: string;
    description?: string;
    price: number;
    images?: string[];
    type?: string;
  };
}

interface CardDetailsFormProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailure: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVariant?: IVariant | null;
  selectedCity?: string | null;
  selectedDate?: Date | null;
  shippingFee?: number;
  selectedTime?: string | null;
  products?: ICartItem[] | any[];
  quantities?: Record<string | number, number>;
  totalFee?: number;
  handleNext: () => void;
  handleBack: () => void;
}

export function OrderPaymentForm({
  setSuccess,
  setFailure,
  selectedCity,
  selectedDate,
  shippingFee,
  products = [],
  quantities = {},
  selectedVariant,
  handleNext,
  totalFee,
  handleBack,
}: CardDetailsFormProps) {
  const token = getUserToken();
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: "",
      amount: totalFee ? String(totalFee) : "",
    },
  });

  const authUser = getAuthUser();
  const customerName = authUser
    ? `${authUser.firstName ?? ""} ${authUser.lastName ?? ""}`.trim()
    : "Guest";

  // Format array of products or fall back to a single label summary
 

  const totalQuantity = products.length > 0
    ? products.reduce((acc, item) => {
        const qty = quantities[item.productVariantId] ?? item.quantity ?? 1;
        return acc + qty;
      }, 0)
    : 1;

  const orderToCreate = {
    products,
    customerName,
    userId: isAuthenticated() ? authUser?.id : null,
    quantity: totalQuantity,
    type: products?.[0]?.product?.type ?? "",
    city: selectedCity ?? "",
    amount: totalFee ?? 0,
    deliveryDate: selectedDate ? selectedDate.toISOString() : new Date().toISOString(),
    address: selectedCity ?? "",
    paymentStatus: "paid",
    shippingFee: shippingFee,
    size: selectedVariant?.name ?? "",
    isCanceled: false,
    status: "pending",
  };

  const createOrder = async () => {
    try {
      const response = await fetch(CreateOrder(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderToCreate),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      setSuccess(true);
    } catch (err) {
      setFailure(true);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: data.fullName,
        },
      });

      if (error) {
        toast.error(error.message);
        setFailure(true);
        return;
      }

      const response = await fetch(MakePayment(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Number(totalFee),
          customerName,
          city: selectedCity ?? "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        setFailure(true);
        return;
      }

      await createOrder();
      setSuccess(true);

      setTimeout(() => {
        handleNext();
      }, 2000);
    } catch (error) {
      setFailure(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4 my-4"
      >
        {/* Render product list summary if products array exists */}
        {products && products.length > 0 && (
          <div className="col-span-2 space-y-3 mb-2">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Order Summary ({products.length} {products.length === 1 ? "item" : "items"})
            </h4>
            {products.map((item) => {
              const quantity = quantities[item.productVariantId] ?? item.quantity ?? 1;
              const product = item.product || item;

              return (
                <div
                  key={item.productVariantId || product.name}
                  className="py-3 border-b border-[#E4E4E7] border-dashed last-of-type:border-b-0"
                >
                  <div className="flex gap-4">
                    <div className="rounded-xl h-20 w-20 overflow-hidden shrink-0 bg-muted">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="object-cover h-full w-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-base">{product.name}</h3>
                          {product.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">
                          Qty: {quantity} × {product.price?.toLocaleString()} SEK
                        </span>

                        <span className="font-semibold text-sm">
                          {((product.price ?? 0) * quantity).toLocaleString()} SEK
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    readOnly
                    value={totalFee ?? ""}
                    type="text"
                    id="amount"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="amount"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Total Amount (SEK)
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="col-span-2">
          <label className="text-sm text-muted-foreground">Card details</label>

          <div className="border rounded-lg p-3">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "15px",
                    color: "#212121",
                  },
                },
              }}
            />
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="fullName"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="fullName"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Name on card
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between col-span-2 mt-4">
          <Button
            type="button"
            variant="outline"
            className="rounded-full bg-[#F4F4F5] border-none text-base"
            onClick={handleBack}
          >
            Back
          </Button>

          <Button
            type="submit"
            className="rounded-full px-10 py-6 font-bold"
            disabled={submitting}
          >
            {submitting ? "Initiating Payment" : "Pay Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
}