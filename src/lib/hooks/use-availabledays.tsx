import { useEffect, useState } from "react";
import { AllAvailableDays } from "../routes";
import type { IAvailableDay } from "../interfaces/interface";

export const useAvailableDays = () => {
  const [availableDays, setAvailableDays] = useState<IAvailableDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDays = async () => {
      setLoading(true);
      setError(null);

      try {

        

        const response = await fetch(AllAvailableDays(), {
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
        setAvailableDays(data.availableDays ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDays();
  }, []);

  return {
    availableDays,
    loading,
    error,
  };
};
