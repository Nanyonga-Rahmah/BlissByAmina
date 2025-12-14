import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Field is required.",
  }),
  amount: z
    .string()
    .min(10, {
      message: "Field is required.",
    })
    .max(10, {
      message: "Field is required.",
    }),
  cardNumber: z.string().min(2, {
    message: "Field is required.",
  }),
  expirationDate: z.email().min(2, { message: "Field is required." }),
  cvv: z.string().optional(),
});

// interface SignUpProps {
//   setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
//   setEmail: React.Dispatch<React.SetStateAction<string>>;
//   setFailure: React.Dispatch<React.SetStateAction<boolean>>;
// }
export function CardDetailsForm() {
//   const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: "",
      amount: "",
      expirationDate: "",
      cvv: "",
      cardNumber: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // setSubmitting(true);
    // try {
    //   const response = await fetch(SignUpApi(), {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const userResponse = await response.json();

    //   console.log(userResponse);
    //   if (response.ok) {
    //   } else {
    //   }
    //   console.log(response);
    // } catch (error) {
    // } finally {
    //   setSubmitting(false);
    // }
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

        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="col-span-2 ">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="text"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="cardNumber"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Card number{" "}
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="expirationDate"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="expirationDate"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Expiration date{" "}
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem className=" col-span-1">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="cvv"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="cvv"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  CVV
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
       
      </form>
    </Form>
  );
}
