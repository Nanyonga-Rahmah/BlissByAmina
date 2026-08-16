import { useEffect, useState } from "react";
import { getUserToken } from "../cookies/User-Management";
import {    FetchVariants } from "../routes";
import type {   IVariant } from "../interfaces/interface";


interface useVariantProps{
    productId:number
}
export const useProductVariants = ({productId}:useVariantProps) => {
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getUserToken();

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(FetchVariants(productId), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        

        const data = await response.json();
        setVariants(data.variants ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, []);

  return {
    variants,
    loading,
    error,
  };
};
