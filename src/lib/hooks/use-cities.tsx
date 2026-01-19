import { useEffect, useState } from "react";
import { AllCities } from "../routes";
import type { ICity } from "../interfaces/interface";

export const useCities = () => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      setError(null);

      try {

       

        const response = await fetch(AllCities(), {
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
        setCities(data.cities ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
  };
};
