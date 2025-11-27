import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { SignUpForm } from "@/forms/authForms/signUp";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LoginDialog } from "./Login";
import { useState } from "react";
import { set } from "zod";

export function SignUpDialog() {

  const [open, setOpen] = useState(false);
  const [LoginOpen, setLoginOpen] = useState(false);
  const OnClick = () => {
    setOpen(false);
    setLoginOpen(true);
  }



  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
              <span className="cursor-pointer text-black underline font-semibold" onClick={OnClick}>
                Sign in
              </span>
            </p>
            <SignUpForm />
          </DialogContent>
        </form>
      </Dialog>

      {LoginOpen && <LoginDialog
  open={LoginOpen}
  onOpenChange={setLoginOpen}
  onSwitchToSignUp={() => setOpen(true)}
/>
}


    </>
  );
}
