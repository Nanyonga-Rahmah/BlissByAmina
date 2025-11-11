import AuthLayout from "@/components/AuthLayout";
import { SignUpForm } from "@/forms/authForms/signUp";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

function SignUp() {
  return (
    <AuthLayout>
      <span className="flex justify-end">
        <HugeiconsIcon icon={Cancel01Icon} className="text-[#A1A1AA]" />
      </span>
      <h3 className="font-bold text-[#000000] md:text-2xl ">
        Create an Account
      </h3>
      <p className="text-[#62636C] md:text-base my-1">
        Already have an account?{" "}
        <span className="font-bold text-black underline">Sign in</span>
      </p>

      <SignUpForm />
    </AuthLayout>
  );
}

export default SignUp;
