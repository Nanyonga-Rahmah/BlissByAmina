import VerificationFailed from "@/components/Failed";
import AccountVerified from "@/components/Successful";
import { VerifyApi } from "@/lib/routes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function VerifyEmailPage() {
  const [success, setSuccess] = useState<boolean | null>(null);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const verify = async () => {
      if (!email) {
        setSuccess(false);
        return;
      }

      try {
        const res = await fetch(VerifyApi(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        setSuccess(false);
      }
    };

    verify();
  }, [email]);

  if (success === null) {
    return <div>Verifying your account...</div>;
  }

  return (
    <div>
      {success ? <AccountVerified /> : <VerificationFailed email={email}/>}
    </div>
  );
}

export default VerifyEmailPage;
