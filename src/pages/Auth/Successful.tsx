import Navigation from "@/components/header";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function AccountVerified() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-17 h-17 rounded-full bg-green-500 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-black">
            Your account has been successfully verified!
          </h3>

          <p className="text-gray-400 mt-2">
            Please log in to your account.
          </p>

          <Button
            className="mt-6 rounded-full h-10 px-8 font-semibold"
            onClick={() => (window.location.href = "/login")}
          >
            Sign In
          </Button>
        </div>
      </div>
    </>
  );
}
