import Navigation from "@/components/header";
import Profile from "@/components/Profile";
import Security from "@/components/Security";
import { getAuthUser } from "@/lib/cookies/User-Management";
import { useState } from "react";

type SettingsTab = "Profile" | "Security";

function Settings() {
    const [settingsTitle, setSettingsTitle] =
        useState<SettingsTab>("Profile");

    const states: SettingsTab[] = [
        "Profile",
     
        "Security",
    ];

    const User = getAuthUser()

    return (


        <div>
            <Navigation />

           <div className="flex justify-center flex-col align-center">
             <div className="flex gap-3 my-6 justify-center">
                {states.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSettingsTitle(tab)}
                        className={`px-4 py-2 rounded-full text-sm transition ${settingsTitle === tab
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex items-center justify-center">
                {settingsTitle === "Profile" && <Profile />}
            {settingsTitle == "Security" && <Security email={User?.email ?? ""} />}
            </div>
           </div>

        </div>
    );
}

export default Settings;