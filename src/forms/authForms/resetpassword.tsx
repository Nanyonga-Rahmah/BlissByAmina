import { useForm } from "react-hook-form";
import { z } from "zod";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { VerifyEmail } from "@/lib/routes";


interface FormProps{
  setSuccess:(status:boolean)=>void
}

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
});

export function ResetForm({setSuccess}:FormProps) {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const response = await fetch(VerifyEmail(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true)


      } else {

        setSuccess(false)
      }
      console.log(response);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type="email"
                    id="reset_email"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent 
                    rounded-lg border border-[#E4E4E7] appearance-none focus:outline-none focus:ring-0 
                    focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>
                <label
                  htmlFor="reset_email"
                  className="absolute text-[15px] text-[#71717A] duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                  peer-focus:-translate-y-4"
                >
                  Email
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 rounded-full bg-black text-white font-semibold"
        >
          {submitting ? "Submitting" : "Send instructions"}

        </Button>
      </form>
    </Form>
  );
}
