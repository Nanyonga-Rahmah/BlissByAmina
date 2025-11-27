import Navigation from "@/components/header";
import { Button } from "@/components/ui/button";
import { Frown, Droplet } from "lucide-react";

export default function VerificationFailed() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative w-20 h-20 rounded-full bg-red-500 flex items-center justify-center mb-4">
            <Frown className="w-10 h-10 text-white" strokeWidth={2} />
            <Droplet className="w-4 h-4 text-white absolute bottom-4 left-4" strokeWidth={3} />
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-black">
            The link has expired or has already been used!
          </h3>
          <p className="text-gray-400 mt-2">
            Please request a new verification link.
          </p>
          <Button
            className="mt-6 rounded-full h-10 px-8 font-semibold"
            onClick={() => (window.location.href = "/signup")}
          >
            Resend link
          </Button>
        </div>
      </div>
    </>
  );
}
