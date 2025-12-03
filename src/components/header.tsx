import { ShoppingCart } from "lucide-react";
import { isAuthenticated } from "@/lib/cookies/User-Management";
import { Account } from "./AccountPopover";
import { LoginDialog } from "./Login";

export default function Navigation() {
  const isLoggedIn = isAuthenticated();

  console.log(isLoggedIn);
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="flex items-center space-x-8 text-sm font-medium text-black">
        <span className="cursor-pointer">SHOP</span>
        <span className="cursor-pointer">SERVICES</span>
        <span className="cursor-pointer">CONTACT US</span>
      </div>
      <a className=" w-24 h-[90px] bg-[url(/logos/logo.svg)] bg-cover cursor-pointer" href="/"></a>

      <div className="flex items-center space-x-6 text-sm font-medium text-black">
        <span className="cursor-pointer">BOOK APPOINTMENT</span>

        <span className="cursor-pointer flex items-center space-x-1">
          <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
          <span>CART</span>
        </span>

        {isLoggedIn ? <><Account /></> :<> <LoginDialog /></>}
      </div>
    </div>
  );
}
