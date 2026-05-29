import { useEffect, useState } from "react";
import { FetchVariants } from "../routes";
import type { IVariant } from "../interfaces/interface";

interface UseVariantProps {
  serviceId?: number;
}

export const useVariants = ({ serviceId }: UseVariantProps) => {
  const [variants, setVariants] = useState<IVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setVariants([]);
      return;
    }

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

        if (!response.ok) {
          throw new Error("Failed to fetch variants");
        }

        const data = await response.json();

        console.log("Variants response:", data);

        setVariants(data.variants ?? data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [serviceId]); 

  return {
    variants,
    loading,
    error,
  };
};