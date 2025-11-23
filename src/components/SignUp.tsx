import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { SignUpForm } from "@/forms/authForms/signUp";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function SignUpDialog() {
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
          <h3 className="font-bold text-[#000000] md:text-2xl ">
            Create an Account
          </h3>
          <p className="text-[#62636C] md:text-base my-1">
            Already have an account?{" "}
            <span className="font-bold text-black underline">Sign in</span>
          </p>
          <SignUpForm />
        </DialogContent>
      </form>
    </Dialog>
  );
}
