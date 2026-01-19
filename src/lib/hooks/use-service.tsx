import { useEffect, useState } from "react";
import {   FetchService } from "../routes";
import type {  IService } from "../interfaces/interface";


interface useServiceProps{
    serviceId:number
}
export const useService = ({serviceId}:useServiceProps) => {
  const [service, setService] = useState<IService>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);

      try {
       
        const response = await fetch(FetchService(serviceId), {
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
        setService(data.service ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []);

  return {
    service,
    loading,
    error,
  };
};
