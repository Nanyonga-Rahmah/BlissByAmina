import { ProfileForm } from "@/forms/ProfileForm"

function Profile() {
    return (
        <div className="border rounded-md p-3 border-[#E4E4E7] w-5/12">
            <h3 className="border-b py-2 text-[#27272A] font-bold text-[18px] border-[#E4E4E7]">Update your personal details and profile picture</h3>

            <div>
                <ProfileForm />
            </div>
        </div>
    )
}

export default Profile