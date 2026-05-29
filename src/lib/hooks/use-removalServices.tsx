import { useEffect, useState } from "react";
import {  AllRemovalServices} from "../routes";
import type {  IService } from "../interfaces/interface";



export const useRemovalServices = () => {
  const [removalServices, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {

       

        const response = await fetch(AllRemovalServices(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }
        

        const data = await response.json();
        console.log(data)
        setServices(data.service ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return {
    removalServices,
    loading,
    error,
  };
};
