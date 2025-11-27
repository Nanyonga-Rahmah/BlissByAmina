import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { SignUpForm } from "@/forms/authForms/signUp";
import { AlertCircleIcon, CheckmarkCircle02Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
export function SignUpDialog() {
  const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (success || failure) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setFailure(false)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success,failure]);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <span className="cursor-pointer flex items-center space-x-1">
            <HugeiconsIcon icon={UserIcon} />
            <span>SIGN IN</span>
          </span>
        </DialogTrigger>
        <DialogContent className=" md:w-[500px]">
          {success && (
            <div className="border flex items-center gap-3 mt-3 rounded-md border-[rgba(0,0,0,0.06)] shadow-md p-3">
             <HugeiconsIcon icon={CheckmarkCircle02Icon} size={32} color="#22C55E" />
              <span className="text-[#18181B] font-normal">
                An email has been sent to{" "}
                <span className="font-semibold">{email}</span> Please check
                your inbox to verify your email.
              </span>
            </div>
          )}

          {failure && (
            <div className="border flex items-center gap-3 mt-3 rounded-md border-[rgba(0,0,0,0.06)] shadow-md p-3">
              <HugeiconsIcon icon={AlertCircleIcon} size={32} color="#D0021B" />
              <span className="text-[#18181B] font-normal">
                User with email
                <span className="font-semibold"> {email}</span> already exists
              </span>
            </div>
          )}
          <h3 className="font-bold text-[#000000] md:text-2xl ">
            Create an Account
          </h3>
          <p className="text-[#62636C] md:text-base my-1">
            Already have an account?{" "}
            <span className="font-bold text-black underline">Sign in</span>
          </p>
          <SignUpForm setSuccess={setSuccess} setEmail={setEmail} setFailure={setFailure} />
        </DialogContent>
      </form>
    </Dialog>
  );
}
