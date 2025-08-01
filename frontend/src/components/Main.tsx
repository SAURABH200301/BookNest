import { useEffect } from "react";
import { HotelInterface } from "../types/hotel";
import { getHotelData } from "../API/HotelData";
import Loader from "./UI/Loader.component";
import type { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { setAllHotels } from "../store/HotelStore/hotelSlice";
import { useLoader } from "./Context/LoaderContext";
import { HotelPaginationProvider } from "./Context/SearchHotelPaginationContext";
import {
  NotificationType,
  useNotification,
} from "./Context/NotificationContext";
import NotificationComponent from "./UI/NotificationComponent";
import HomePage from "./HomePage";
import { SearchFormDataProvider } from "./Context/SearchFormContext";
export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, setLoader } = useLoader();
  const {
    showNotification,
    message,
    type,
    setMessage,
    setShowNotification,
    setType,
  } = useNotification();

  useEffect(() => {
    setLoader(true);

    const fetchHotels = async () => {
      const response: { data: HotelInterface[] | null; error: any } =
        await getHotelData();
      if (response.data) {
        dispatch(setAllHotels(response.data));
      } else {
        setShowNotification(true);
        setMessage("Failed to fetch hotel pricing");
        setType(NotificationType.ERROR);
      }
      setLoader(false);
    };

    fetchHotels();
  }, [dispatch, setLoader, setMessage, setShowNotification, setType]);

  return (
    <HotelPaginationProvider>
      {showLoader && <Loader showLoader={showLoader} />}
      <div>
        <SearchFormDataProvider>
          <HomePage />
        </SearchFormDataProvider>
      </div>
      {showNotification && (
        <NotificationComponent message={message} type={type} time={5000} />
      )}
    </HotelPaginationProvider>
  );
}
