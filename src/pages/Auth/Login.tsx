import AuthLayout from "@/components/AuthLayout";
import { LoginForm } from "@/forms/authForms/Login";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

function Login() {
  return (
    <AuthLayout>
      <span className="flex justify-end">
        <HugeiconsIcon icon={Cancel01Icon} className="text-[#A1A1AA] cursor-pointer" />
      </span>

      <h3 className="font-bold text-[#000000] md:text-2xl">Welcome back</h3>

      <p className="text-[#62636C] md:text-base my-1">
        Don’t have an account?{" "}
        <span className="font-bold text-black underline cursor-pointer">Sign up</span>
      </p>

      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
