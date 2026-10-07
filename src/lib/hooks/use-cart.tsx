import { useEffect, useState } from "react";
import { FetchCart } from "../routes";
import type { ICart } from "../interfaces/interface";
import { getUserToken } from "../cookies/User-Management";

export const useUserCart = (userId?: number | null) => {
    const [cart, setCart] = useState<ICart>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId || userId <= 0) {
            setCart(undefined);
            setLoading(false);
            setError(null);
            return;
        }

        let isCancelled = false;

        const fetchCart = async () => {
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

                const response = await fetch(FetchCart(userId), {
                    method: "GET",
                    headers,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch cart (${response.status})`);
                }

                const data = await response.json();
                if (!isCancelled) {
                    setCart(data.cart ?? data);
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

        fetchCart();

        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return {
        cart,
        loading,
        error,
    };
};
