import { getAuthUser, getUserToken, isAuthenticated } from "@/lib/cookies/User-Management";
import { Account } from "./AccountPopover";
import { LoginDialog } from "./Login";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CartDialog } from "./Cart";
import { useUser } from "@/lib/hooks/use-user";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const token = getUserToken();
  const user = getAuthUser()

  const { dbuser } = useUser(isLoggedIn ? user?.id : undefined)

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsLoggedIn(authStatus);
  }, [token]);

  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/");
  };


  return (
    <div className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-black">
        <a className="cursor-pointer">SHOP</a>
        <a className="cursor-pointer" href="/services">
          SERVICES
        </a>
        <a className="cursor-pointer" href="/contact-us" target="_self">
          CONTACT US
        </a>
      </div>
      <div
        className=" md:w-24 md:h-[78px] w-16   cursor-pointer"
        onClick={HandleClick}
      >
        <img src="/logos/logo.svg" alt="Logo" width={100} height={100} />
      </div>

      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-black">
        <a className="cursor-pointer" href="/">BOOK APPOINTMENT</a>

        <CartDialog lastName={user?.lastName} userId={isLoggedIn && user?.id ? user.id : 0} isLogggedIn={isLoggedIn} cartId={dbuser?.cartId ?? 0} />


        {isLoggedIn ? (
          <>
            <Account isLoggedIn={isLoggedIn} />
          </>
        ) : (
          <>
            {" "}
            <LoginDialog />
          </>
        )}
      </div>

      <div className="flex md:hidden">
        {isLoggedIn ? (
          <>
            <Account isLoggedIn={isLoggedIn} />
          </>
        ) : (
          <>
            {" "}
            <LoginDialog />
          </>
        )}
      </div>
    </div>
  );
}
