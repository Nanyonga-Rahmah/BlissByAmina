import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import {  UpdateUser } from "@/lib/routes";
import { toast } from "sonner";
import { getAuthUser, getUserToken, setAuthUser } from "@/lib/cookies/User-Management";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon } from "@hugeicons/core-free-icons";

const formSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    fullName: z
        .string()
        .min(7, { message: "" }),
});

// interface LoginFormProps {
//   onClose?: () => void;
// }

export function ProfileForm() {
    const [submitting, setSubmitting] = useState(false);

    const authUser = getAuthUser();

    const [profilePhoto, setProfilePhoto] = useState<string | null>(
        authUser?.profilePhoto || null
    );

    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: authUser?.email,
            fullName: `${authUser?.firstName} ${authUser?.lastName}`,
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setSubmitting(true);

        try {
            const formData = new FormData();

            formData.append("fullName", data.fullName);
            formData.append("email", data.email);

            if (selectedPhoto) {
                formData.append("profilePhoto", selectedPhoto);
            }

            const response = await fetch(UpdateUser(authUser?.id ?? 0),

                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${getUserToken()}`,
                    },
                    body: formData,
                }
            );

            const userResponse = await response.json();

            if (response.ok) {
                setAuthUser(userResponse.user);

                setProfilePhoto(userResponse.user.profilePhoto);

                toast.success("User updated successfully");
            } else {
                toast.error(userResponse.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };
    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        setSelectedPhoto(file);
        setProfilePhoto(URL.createObjectURL(file));
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 my-4">

                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border border-[#E4E4E7] bg-gray-100 flex items-center justify-center">
                            {profilePhoto ? (
                                <img
                                    src={profilePhoto}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-2xl font-semibold text-gray-500">
                                    {authUser?.firstName?.charAt(0)?.toUpperCase() || "U"}
                                </span>
                            )}
                        </div>

                        <label
                            htmlFor="profile-photo"
                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer border-2 border-white"
                        >
                            <HugeiconsIcon icon={Camera01Icon} size={15} />
                        </label>

                        <input
                            id="profile-photo"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={handlePhotoChange}
                            className="hidden"
                        />
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-medium text-[#212121]">
                            Profile Photo
                        </p>
                        <p className="text-xs text-[#71717A]">
                            JPG, PNG or WEBP
                        </p>
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <div className="relative">
                                <FormControl>
                                    <input
                                        {...field}
                                        id="password_login"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent 
                    rounded-lg border border-[#E4E4E7] appearance-none focus:outline-none focus:ring-0 
                    focus:border-[#E4E4E7] peer"
                                        placeholder=" "
                                    />
                                </FormControl>



                                <label
                                    htmlFor="password_login"
                                    className="absolute text-[15px] text-[#71717A] duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 bg-white px-2 origin-left 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                  peer-focus:-translate-y-4"
                                >
                                    Full Name                </label>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="relative">
                                <FormControl>
                                    <input
                                        {...field}
                                        type="email"
                                        id="email_login"
                                        className="block px-2.5 pb-2.5 pt-4 w-full text-[15px] text-[#212121] bg-transparent 
                    rounded-lg border border-[#E4E4E7] appearance-none focus:outline-none focus:ring-0 
                    focus:border-[#E4E4E7] peer"
                                        placeholder=" "
                                    />
                                </FormControl>
                                <label
                                    htmlFor="email_login"
                                    className="absolute text-[15px] text-[#71717A] duration-300 transform 
                  -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 
                  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 
                  peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 
                  peer-focus:-translate-y-4"
                                >
                                    Email
                                </label>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="relative w-full">
                    <Button
                        disabled={submitting}
                        type="submit"
                        className="w-full h-12 rounded-full bg-black text-white font-semibold"
                    >
                        {submitting ? "Submitting" : "Save Changes"}
                    </Button>
                </div>

            </form>
        </Form>
    );
}
