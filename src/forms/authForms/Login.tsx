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
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(7, { message: "Password must be at least 7 characters long" }),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = () => {};

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 my-4"
      >
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
                    id="email_login"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent 
                    rounded-lg border border-[#E4E4E7] appearance-none focus:outline-none focus:ring-0 
                    focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>
                <label
                  htmlFor="email_login"
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    id="password_login"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent 
                    rounded-lg border border-[#E4E4E7] appearance-none focus:outline-none focus:ring-0 
                    focus:border-[#E4E4E7] peer"
                    placeholder=" "
                  />
                </FormControl>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

                <label
                  htmlFor="password_login"
                  className="absolute text-[15px] text-[#71717A] duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 bg-white px-2 origin-left 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                  peer-focus:-translate-y-4"
                >
                  Password (at least 7 characters)
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-[#4E4E55] text-sm text-center">Forgot password?</p>
        <div className="relative w-full">
          <Button
            type="submit"
            className="w-full h-12 rounded-full bg-black text-white font-semibold"
          >
            Sign in
          </Button>
        </div>
      </form>
    </Form>
  );
}
