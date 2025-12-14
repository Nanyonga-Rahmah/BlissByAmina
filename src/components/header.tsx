import { ShoppingCart } from "lucide-react";
import { isAuthenticated } from "@/lib/cookies/User-Management";
import { Account } from "./AccountPopover";
import { LoginDialog } from "./Login";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const isLoggedIn = isAuthenticated();

  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="flex items-center space-x-8 text-sm font-medium text-black">
        <a className="cursor-pointer">SHOP</a>
        <a className="cursor-pointer" href="/services">
          SERVICES
        </a>
        <a className="cursor-pointer" href="/contact-us" target="_self">
          CONTACT US
        </a>
      </div>
      <div className=" w-24 h-[78px]   cursor-pointer" onClick={HandleClick}>
        <img src="/logos/logo.svg" alt="Logo" width={100} height={100} />
      </div>

      <div className="flex items-center space-x-6 text-sm font-medium text-black">
        <span className="cursor-pointer">BOOK APPOINTMENT</span>

        <span className="cursor-pointer flex items-center space-x-1">
          <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
          <span>CART</span>
        </span>

        {isLoggedIn ? (
          <>
            <Account />
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
