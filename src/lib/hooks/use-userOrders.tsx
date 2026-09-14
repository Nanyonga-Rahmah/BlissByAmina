import { useEffect, useState } from "react";
import { UserOrders } from "../routes";
import type { IOrder } from "../interfaces/interface";
import { getAuthUser } from "../cookies/User-Management";

export const useUserOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const userData = getAuthUser();

    const userId = userData?.id;

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(UserOrders(userId ?? 0), {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user bookings");
                }

                const data = await response.json();
                setOrders(data.orders ?? data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return {
        orders,
        loading,
        error,
    };
};
