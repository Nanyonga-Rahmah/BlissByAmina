import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { LoginForm } from "@/forms/authForms/Login";
import { ResetPasswordDialog } from "./ResetPassword";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToSignUp: () => void;
}

export function LoginDialog({ open, onOpenChange, onSwitchToSignUp }: LoginDialogProps) {
  const [resetOpen, setResetOpen] = useState(false);

  return (
    <>
      <Dialog
        open={open && !resetOpen}
        onOpenChange={onOpenChange}
      >
        <DialogContent className="md:w-[500px] hero-bg bg-cover bg-center">
          <h3 className="font-bold text-[#000000] md:text-2xl">Welcome Back</h3>

          <p className="text-[#62636C] md:text-base my-1 flex items-center space-x-1">
            <span>Don't have an account?</span>

            <span
              className="font-bold text-black underline cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                onSwitchToSignUp();
              }}
            >
              Sign up
            </span>
          </p>

          <LoginForm
            onForgotPassword={() => setResetOpen(true)}
          />
        </DialogContent>
      </Dialog>
      <ResetPasswordDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onBackToLogin={() => setResetOpen(false)}
      />
    </>
  );
}
