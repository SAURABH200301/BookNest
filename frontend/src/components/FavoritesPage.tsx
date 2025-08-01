import { useEffect, useState } from "react";
import { getFavoriteHotels } from "../API/HotelData";
import { HotelInterface } from "../types/hotel";
import {
  NotificationType,
  useNotification,
} from "./Context/NotificationContext";

export default function FavoritePage() {
  const [favHotels, setFavHotels] = useState<HotelInterface[] | null>([]);
  const { setShowNotification, setMessage, setType } = useNotification();

  useEffect(() => {
    async function getAllFavorites() {
      const response = await getFavoriteHotels();
      if (response.data) {
        setFavHotels(response.data);
      } else {
        setShowNotification(true);
        setMessage("Something went wrong!");
        setType(NotificationType.ERROR);
      }
    }
    getAllFavorites();
  }, [setMessage, setShowNotification, setType]);
  return (
    <>
      {favHotels?.map((hotel) => {
        return <div key={hotel.id}>{hotel.hotelName}</div>;
      })}
    </>
  );
}
