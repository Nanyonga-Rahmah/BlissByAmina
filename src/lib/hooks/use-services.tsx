import { useEffect, useState } from "react";
import {  AllServices } from "../routes";
import type {  IService } from "../interfaces/interface";

export const useServices = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {

       

        const response = await fetch(AllServices(), {
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
        setServices(data.services ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return {
    services,
    loading,
    error,
  };
};
