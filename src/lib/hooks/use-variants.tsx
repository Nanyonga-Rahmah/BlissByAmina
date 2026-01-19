import { useEffect, useState } from "react";
import {    FetchVariants } from "../routes";
import type {   IVariant } from "../interfaces/interface";


interface useVariantProps{
    serviceId:number
}
export const useVariants = ({serviceId}:useVariantProps) => {
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      setLoading(true);
      setError(null);

      try {

       

        const response = await fetch(FetchVariants(serviceId), {
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
