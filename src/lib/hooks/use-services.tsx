// src/lib/hooks/use-services.ts
import { useEffect, useState } from "react";
import { getServicesAndProducts } from "../pre-fetch";

export function useServices() {
  const [services, setServices] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    getServicesAndProducts()
      .then(({ services }) => {
        if (!cancelled) setServices(services);
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

  return { services, loading, error };
}