import { useEffect, useState } from "react";
import { FetchUser } from "../routes";
import type { IUser } from "../interfaces/interface";



export const useUser = ( userId:number ) => {
    const [dbuser, setUser] = useState<IUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {

                const response = await fetch(FetchUser(userId), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch cities");
                }


                const data = await response.json();
                setUser(data.user ?? data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return {
        dbuser,
        loading,
        error,
    };
};
