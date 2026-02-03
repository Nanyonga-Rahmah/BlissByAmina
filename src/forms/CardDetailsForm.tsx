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
import { CreateBooking, MakePayment } from "@/lib/routes";
import type {  IService, IVariant } from "@/lib/interfaces/interface";
import {
  getAuthUser,
  getUserToken,
  isAuthenticated,
} from "@/lib/cookies/User-Management";
import type { CityOption } from "@/components/BookingDialog";

const formSchema = z.object({
  fullName: z.string().min(2),
  amount: z.string().min(1),
});

interface CardDetailsFormProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setFailure: React.Dispatch<React.SetStateAction<boolean>>;
  selectedVariant?: IVariant | null;
  selectedCity?: CityOption | null;
  selectedDate?: Date | null;
  selectedTime?: string | null;
  service?: IService | null;
  totalFee?: number;
  handleNext: () => void;
}
export function CardDetailsForm({
  setSuccess,
  setFailure,
  selectedCity,
  selectedDate,
  selectedTime,
  service,
  selectedVariant,
  handleNext,
  totalFee,
}: CardDetailsFormProps) {
  const token = getUserToken();
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: "",
      amount: "",
    },
  });

  const bookingToSave = {
    serviceName: service?.name ?? "",
    bookingDay: selectedDate?.toISOString().split("T")[0],
    bookingTime: selectedTime,
    isCanceled: false,

    userId: isAuthenticated() ? getAuthUser()?.id : null,
    length: selectedVariant?.length ?? "",
    city: selectedCity?.name ?? "",
    travelfee: selectedCity?.travelFee ?? 0,
    servicefee: String(selectedVariant?.price ?? 0),
    amount:
      Number(selectedVariant?.price ?? 0) +
      Number(selectedCity?.travelFee ?? 0),
    size: selectedVariant?.name ?? "",
  };

  const createBooking = async () => {
    try {
      const response = await fetch(CreateBooking(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingToSave),
      });

      if (!response.ok) {
        throw new Error("Failed to create booking");
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
        console.error(error.message);
        return;
      }

      const response = await fetch(MakePayment(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Number(totalFee),
        }),
      });

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        createBooking();

        setTimeout(() => {
          handleNext();
        }, 2000);
      } else {
        setFailure(true);
      }
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
        className="grid md:grid-cols-2   gap-4 my-4"
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className=" col-span-2 ">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    readOnly
                    value={totalFee}
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
                  Amount
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
            variant="outline"
            className="rounded-full  bg-[#F4F4F5]  border-none text-base"
            // onClick={handleBack}
          >
            Back
          </Button>

          <Button
            type="submit"
            className="rounded-full  px-10 py-6 font-bold"
            disabled={submitting}
          >
            {submitting ? "Initiating Payment" : "Pay Now"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
