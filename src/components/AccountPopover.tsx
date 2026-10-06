import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAuthUser, logout } from "@/lib/cookies/User-Management";
import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";
import { CartDialog } from "./Cart";
import { useUser } from "@/lib/hooks/use-user";


interface AccountProps {
  isLoggedIn: boolean
}
export function Account({ isLoggedIn }: AccountProps) {
  const navigate = useNavigate()
  const user = getAuthUser()

  const { dbuser } = useUser(isLoggedIn ? user?.id : undefined)

  const HandleLogout = () => {
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
          <div className="flex md:hidden">
            <CartDialog lastName={user?.lastName} userId={isLoggedIn && user?.id ? user.id : 0} isLogggedIn={isLoggedIn} cartId={dbuser?.cartId ?? 0} />

          </div>
          <a className="text-[#09090B]  cursor-pointer font-medium" href="/orders">Order History</a>
          <span className="text-[#09090B] cursor-pointer font-medium">Review & Feedback</span>
          <span className="text-[#09090B] cursor-pointer font-medium">Discounts</span>
          <a href="/settings" className="text-[#09090B] cursor-pointer font-medium">Setttings</a>

          <span className="text-[#DC2626] cursor-pointer font-medium" onClick={HandleLogout}>Sign out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
