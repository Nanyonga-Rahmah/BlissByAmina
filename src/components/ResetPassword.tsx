import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NewPasswordForm } from "@/forms/authForms/newpassword";
import { ResetForm } from "@/forms/authForms/resetpassword";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

interface ResetPasswordDialogProps {
  open?: boolean;
  email?: string;
  onOpenChange?: (open: boolean) => void;
  onBackToLogin?: () => void;
}

export function ResetPasswordDialog({
  // open,
  email,
  // onOpenChange,
  // onBackToLogin,
}: ResetPasswordDialogProps) {
  const [currentStep] = useState(1)
  const [success, setSuccess] = useState(false)
  return (
    <Dialog >
      <DialogTrigger asChild>
        <div className="bg-[#F4F4F5] text-center rounded-3xl py-2 text-[#18181B] font-bold text-sm cursor-pointer">Change Password</div>
      </DialogTrigger>
      <DialogContent className="md:w-[500px] left-1/2">
        {success && (
          <div className="border flex items-center gap-3 mt-3 rounded-md border-[rgba(0,0,0,0.06)] shadow-md p-3">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={32}
              color="#22C55E"
            />
            <span className="text-[#18181B] font-normal">
              An email has been sent to{" "}
              <span className="font-semibold">{email}</span> Please check
              your inbox .
            </span>
          </div>
        )}
        <h3 className="font-bold text-[#000000] md:text-base">{currentStep === 1 ? 'Reset Password' : 'Set new password'}</h3>

        <p className="text-[#71717A] md:text-sm my-1">
          {currentStep === 1 ? "Don't worry, we will send you instructions to reset your password." : 'Create a strong password to secure your account.'
          }        </p>

        {currentStep === 1 ? (<ResetForm setSuccess={setSuccess} />
        ) : (
          <NewPasswordForm />
        )}

      </DialogContent>
    </Dialog>

    // <Dialog open={open} onOpenChange={onOpenChange}>
    //   <DialogContent className=" md:w-[500px] left-[50%]">
    //     <h3 className="font-bold text-[#000000] md:text-2xl">Reset Password</h3>

    //     <p className="text-[#62636C] md:text-base my-1">
    //       Don't worry, we will send you instructions to reset your password.
    //     </p>

    //     <ResetForm />

    //     <p
    //       className="mt-2 text-center text-sm text-black underline cursor-pointer"
    //       onClick={() => {
    //         onOpenChange(false);
    //         onBackToLogin();
    //       }}
    //     >
    //       Sign In
    //     </p>
    //   </DialogContent>
    // </Dialog>
  );
}
