import { useEffect, useState } from "react";
import type { IProduct } from "../interfaces/interface";
import { getServicesAndProducts } from "../pre-fetch";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // use-products.ts
  useEffect(() => {
    let cancelled = false;

    getServicesAndProducts()
      .then(({ products }) => {
        if (!cancelled) setProducts(products);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
};
