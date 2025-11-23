import { ShoppingCart} from "lucide-react";
import { SignUpDialog } from "./SignUp";

export default function Navigation() {
  return (
    <div className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <div className="flex items-center space-x-8 text-sm font-medium text-black">
        <span className="cursor-pointer">SHOP</span>
        <span className="cursor-pointer">SERVICES</span>
        <span className="cursor-pointer">CONTACT US</span>
      </div>
      <div className=" w-20 h-[70px] bg-[url(/logos/logo.png)] bg-cover"></div>

      <div className="flex items-center space-x-6 text-sm font-medium text-black">
        <span className="cursor-pointer">BOOK APPOINTMENT</span>

        <span className="cursor-pointer flex items-center space-x-1">
          <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
          <span>CART</span>
        </span>

        <SignUpDialog />
      </div>
    </div>
  );
}
