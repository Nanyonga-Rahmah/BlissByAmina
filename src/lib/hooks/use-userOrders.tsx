import { useEffect, useState } from "react";
import { UserOrders } from "../routes";
import type { IOrder } from "../interfaces/interface";
import { getAuthUser, getUserToken } from "../cookies/User-Management";

export const useUserOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const userData = getAuthUser();
    const userId = userData?.id;

    useEffect(() => {
        if (!userId || userId <= 0) {
            setOrders([]);
            setLoading(false);
            setError(null);
            return;
        }

        let isCancelled = false;

        const fetchOrders = async () => {
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

                const response = await fetch(UserOrders(userId), {
                    method: "GET",
                    headers,
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user orders");
                }

                const data = await response.json();
                if (!isCancelled) {
                    setOrders(data.orders ?? data);
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

        fetchOrders();

        return () => {
            isCancelled = true;
        };
    }, [userId]);

    return {
        orders,
        loading,
        error,
    };
};
