import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/lib/cookies/User-Management";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

export function Account() {
const navigate=useNavigate()


const HandleLogout=()=>{
    logout()
    navigate("/")
}
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="cursor-pointer flex items-center space-x-1 relative">
          <HugeiconsIcon icon={UserIcon} />
          <span>ACCOUNT </span>
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-48 absolute right-px top-4">
        <div className="flex flex-col gap-1">
          <a className="text-[#09090B]  cursor-pointer font-medium" href="/orders">Order History</a>
          <span className="text-[#09090B] cursor-pointer font-medium">Review & Feedback</span>
          <span className="text-[#09090B] cursor-pointer font-medium">Discounts</span>
          <span className="text-[#DC2626] cursor-pointer font-medium" onClick={HandleLogout}>Sign out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
