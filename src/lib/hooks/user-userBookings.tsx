import { useEffect, useState } from "react";
import { UserBookings } from "../routes";
import type { IBooking } from "../interfaces/interface";
import { getAuthUser } from "../cookies/User-Management";

export const useUserBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userData = getAuthUser();

  const userId = userData?.id;

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(UserBookings(userId ?? 0), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user bookings");
        }

        const data = await response.json();
        setBookings(data.bookings ?? data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
  };
};
