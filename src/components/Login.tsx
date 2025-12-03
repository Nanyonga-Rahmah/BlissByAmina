import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/forms/authForms/Login";
import { ResetPasswordDialog } from "./ResetPassword";
import { SignUpDialog } from "./SignUp";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

interface LoginDialogProps {
  open?: boolean;                       // optional
  onOpenChange?: (open: boolean) => void; // optional
  onSwitchToSignUp?: () => void;        // optional
  withTrigger?: boolean;              
}

export function LoginDialog({
  open,
  onOpenChange,
  onSwitchToSignUp,
  withTrigger = true,
}: LoginDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [signUpOpen, setSignUpDialog] = useState(false);

  const isControlled = open !== undefined && !!onOpenChange;
  const actualOpen = isControlled ? open! : internalOpen;
  const setActualOpen = isControlled ? onOpenChange! : setInternalOpen;

  const handleSignUpClick = () => {
    setActualOpen(false);
    setSignUpDialog(true);
    onSwitchToSignUp?.();
  };

  return (
    <>
      <Dialog open={actualOpen} onOpenChange={setActualOpen}>
        {withTrigger && (
          <DialogTrigger asChild>
            <span className="cursor-pointer flex items-center space-x-1">
              <HugeiconsIcon icon={UserIcon} />
              <span>SIGN IN</span>
            </span>
          </DialogTrigger>
        )}

        <DialogContent className="md:w-[500px] hero-bg bg-cover bg-center">
          <h3 className="font-bold text-[#000000] md:text-2xl">Welcome Back</h3>

          <p className="text-[#62636C] md:text-base my-1 flex items-center space-x-1">
            <span>Don&apos;t have an account?</span>

            <span
              className="font-bold text-black underline cursor-pointer"
              onClick={handleSignUpClick}
            >
              Sign up
            </span>
          </p>

          <LoginForm onForgotPassword={() => setResetOpen(true)} />
        </DialogContent>
      </Dialog>

      <ResetPasswordDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        onBackToLogin={() => setResetOpen(false)}
      />

      {signUpOpen && (
        <SignUpDialog open={signUpOpen} onOpenChange={setSignUpDialog} />
      )}
    </>
  );
}
