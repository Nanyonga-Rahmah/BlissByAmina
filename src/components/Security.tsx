import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ResetPasswordDialog } from "./ResetPassword"

interface SecurityProps{
    email:string
}
function Security({email}:SecurityProps) {
    return (
        <div className="border rounded-md p-3 border-[#E4E4E7] w-5/12">
            <h3 className="border-b py-2 text-[#27272A] font-bold text-[18px] border-[#E4E4E7]">Keep your password secure and up to date</h3>

            <div className="border rounded-md my-5 p-2">
                <h4 className="text-[#18181B] font-medium text-sm mb-2">Password Requirements</h4>
                <div>
                    <div className="flex items-center gap-2">
                        <span><HugeiconsIcon icon={Tick02Icon} color="#22C55E" size={15}/></span>
                        <span className="text-[#52525B] text-sm">Minimum 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span><HugeiconsIcon icon={Tick02Icon} color="#22C55E" size={15}/></span>
                        <span className="text-[#52525B] text-sm">Include uppercase and lowercase letters</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <span><HugeiconsIcon icon={Tick02Icon} color="#22C55E" size={15}/></span>
                        <span className="text-[#52525B] text-sm">Include at least one number</span>
                    </div>
                      <div className="flex items-center gap-2">
                        <span><HugeiconsIcon icon={Tick02Icon} color="#22C55E" size={15}/></span>
                        <span className="text-[#52525B] text-sm">Include at least one special character</span>
                    </div>
                </div>
            </div>

            <ResetPasswordDialog email={email}/>
        </div>
    )
}

export default Security