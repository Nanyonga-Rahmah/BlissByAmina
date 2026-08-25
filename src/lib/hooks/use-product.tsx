import { useEffect, useState } from "react";
import { getUserToken } from "../cookies/User-Management";
import {  FetchProductVariant } from "../routes";
import type {  IProductVariant } from "../interfaces/interface";

interface useProductProps {
  productId: number;
}
export const useProduct = ({ productId }: useProductProps) => {
  const [product, setProduct] = useState<IProductVariant>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getUserToken();

        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(FetchProductVariant(productId), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data.variant ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return {
    product,
    loading,
    error,
  };
};
