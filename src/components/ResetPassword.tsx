import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ResetForm } from "@/forms/authForms/resetpassword";

interface ResetPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin: () => void;
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  onBackToLogin,
}: ResetPasswordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" md:w-[500px] left-[50%]">
        <h3 className="font-bold text-[#000000] md:text-2xl">Reset Password</h3>

        <p className="text-[#62636C] md:text-base my-1">
          Don't worry, we will send you instructions to reset your password.
        </p>

        <ResetForm />

        <p
          className="mt-2 text-center text-sm text-black underline cursor-pointer"
          onClick={() => {
            onOpenChange(false);
            onBackToLogin();
          }}
        >
          Sign In
        </p>
      </DialogContent>
    </Dialog>
  );
}
