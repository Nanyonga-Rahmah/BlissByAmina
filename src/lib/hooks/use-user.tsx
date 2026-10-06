import { useEffect, useState } from "react";
import { FetchUser } from "../routes";
import type { IUser } from "../interfaces/interface";
import { getUserToken } from "../cookies/User-Management";

export const useUser = ( userId?: number | null ) => {
    const [dbuser, setUser] = useState<IUser>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || userId <= 0) {
            setUser(undefined);
            setLoading(false);
            setError(null);
            return;
        }

        let isCancelled = false;

        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = getUserToken();
                const headers: Record<string, string> = {
                    "Content-Type": "application/json",
                };
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const response = await fetch(FetchUser(userId), {
                    method: "GET",
                    headers,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch user (${response.status})`);
                }

                const data = await response.json();
                if (!isCancelled) {
                    setUser(data.user ?? data);
                }
            } catch (err: any) {
                if (!isCancelled) {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchUser();

        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return {
        dbuser,
        loading,
        error,
    };
};
