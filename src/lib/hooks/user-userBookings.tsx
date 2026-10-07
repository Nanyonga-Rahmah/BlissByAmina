import { useEffect, useState } from "react";
import { UserBookings } from "../routes";
import type { IBooking } from "../interfaces/interface";
import { getAuthUser, getUserToken } from "../cookies/User-Management";

export const useUserBookings = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userData = getAuthUser();
  const userId = userData?.id;

  useEffect(() => {
    if (!userId || userId <= 0) {
      setBookings([]);
      setLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;

    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = getUserToken();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch(UserBookings(userId), {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user bookings");
        }

        const data = await response.json();
        if (!isCancelled) {
          setBookings(data.bookings ?? data);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  return {
    bookings,
    loading,
    error,
  };
};
