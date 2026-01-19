import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Field is required.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Field is required.",
    })
    .max(10, {
      message: "Field is required.",
    }),
  address: z.string().min(2, {
    message: "Field is required.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  notes: z.string().min(2, { message: "Field is required." }),
});

interface SignUpProps {
  setUserDetails: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      phoneNumber: string;
      email: string;
      address: string;
      notes: string;
    }>
  >;
  onValidityChange: (isValid: boolean) => void;
}
export function UserDetailsForm({
  setUserDetails,
  onValidityChange,
}: SignUpProps) {
  //   const [submitting, setSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onChange", // 👈 IMPORTANT
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  useEffect(() => {
    onValidityChange(form.formState.isValid);
  }, [form.formState.isValid]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("-->",data);
    setUserDetails(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-4 "
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className=" col-span-2 ">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="first_name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="first_name"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Full name
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="email"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Email{" "}
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="md:col-span-1 col-span-2">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="last_name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="last_name"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Phone
                </label>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="password"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Address{" "}
                </label>
              </div>

              <FormMessage />
              <FormDescription>
                We'll come to this address to provide the service
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className=" col-span-2">
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    id="notes"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent rounded-lg border border-[#E4E4E7] appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <label
                  htmlFor="notes"
                  className="absolute text-[15px] text-[#71717A] dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#212121] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Additional notes
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
