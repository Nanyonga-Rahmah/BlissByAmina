import { useEffect, useState } from "react";
import { FetchCart } from "../routes";
import type { ICart } from "../interfaces/interface";



export const useUserCart = (userId:number ) => {
    const [cart, setCart] = useState<ICart>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            setError(null);

            try {

                const response = await fetch(FetchCart(userId), {
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
                setCart(data.cart ?? data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    return {
        cart,
        loading,
        error,
    };
};
