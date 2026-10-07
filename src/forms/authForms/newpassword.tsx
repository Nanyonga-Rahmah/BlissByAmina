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
import { LoginInApi } from "@/lib/routes";
import { toast } from "sonner";
import { setAuthUser, setUserToken } from "@/lib/cookies/User-Management";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  newpassword: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long" }),
   confirmpassword: z
    .string()
    .min(7, { message: "Password must be at least 7 characters long" }),
});

// interface LoginFormProps {
//   onClose?: () => void;
// }

export function NewPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const navigate=useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      newpassword: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      const response = await fetch(LoginInApi(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userResponse = await response.json();

      if (response.ok) {

        if (userResponse.authResponse.userData.userType === "user") {
          navigate("/user-forbidden");
        } else {
          setUserToken(userResponse.authResponse.token);
          setAuthUser(userResponse.authResponse.userData);
          toast.success("Login SuccessFul");

          navigate("/dashboard");
        }
        // setUserToken(userResponse.authResponse.token)
        // setAuthUser(userResponse.authResponse.userData)
        // toast.success("Login SuccessFul");


        // navigate("/dashboard")
      } else {
        toast.error(userResponse.message);
      }
      console.log(response);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 my-4">
        <FormField
          control={form.control}
          name="newpassword"
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
                  New Password (at least 7 characters)
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmpassword"
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
                 Confirm Password (at least 7 characters)
                </label>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative w-full">
          <Button
            disabled={submitting}
            type="submit"
            className="w-full h-12 rounded-full bg-black text-white font-semibold"
          >
            {submitting ? "Submitting" : "Set Password"}
          </Button>
        </div>
      
      </form>
    </Form>
  );
}
