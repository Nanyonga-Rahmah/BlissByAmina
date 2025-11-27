import VerificationFailed from "@/components/Failed";
import AccountVerified from "@/components/Successful";
import { useState } from "react";

function VerifyEmailPage() {
  const [success, setSucess] = useState(false);

  return <div>{success ? <AccountVerified /> : <VerificationFailed />}</div>;
}

export default VerifyEmailPage;
