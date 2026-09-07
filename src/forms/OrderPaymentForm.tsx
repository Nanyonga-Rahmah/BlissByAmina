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
import { CreateOrder, MakeOrderPayment} from "@/lib/routes";
import type { IVariant } from "@/lib/interfaces/interface";
import {
  getAuthUser,
  getUserToken,
  isAuthenticated,
} from "@/lib/cookies/User-Management";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
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
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>; // Close the sheet

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
  handleNext,
  totalFee,
  handleBack,
  setIsSheetOpen
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



  // Helper function to create order
  const createOrderRequest = async (paymentIdVal: string = "") => {
    const orderToCreate = {
      products,
      customerName,
      userId: isAuthenticated() ? authUser?.id : null,


      city: selectedCity ?? "",
      amount: totalFee ?? 0,
      deliveryDate: selectedDate
        ? selectedDate.toISOString()
        : new Date().toISOString(),
      address: selectedCity ?? "",
      paymentStatus: paymentIdVal ? "paid" : "pending",
      shippingFee: shippingFee,

      isCanceled: false,
      status: "pending",
      paymentId: paymentIdVal,
    };

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

    return await response.json();
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);

    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) return;

      // STEP 1: Create Order First
      const createdOrder = await createOrderRequest();

      // STEP 2: Create Stripe Payment Method
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

      // STEP 3: Process Payment
      const response = await fetch(MakeOrderPayment(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Number(totalFee),
          customerName,
          city: selectedCity ?? "",
          orderId: createdOrder?.id ?? createdOrder?._id, // Pass order context if server requires it
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Payment failed");
        setFailure(true);
        return;
      }

      setSuccess(true);

      setTimeout(() => {
        handleNext();
                setIsSheetOpen(false); 

      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
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
            {submitting ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
}