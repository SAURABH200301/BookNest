import { useEffect, useState } from "react";
import { HotelInterface } from "../types/hotel";
import Navbar from "./Navbar";
import { getHotelData } from "../API/HotelData";
import Loader from "./UI/Loader.component";
import type { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { setAllHotels } from "../store/HotelStore/hotelSlice";
import { useLoader } from "./Context/LoaderContext";
import { HotelPaginationProvider } from "./Context/SearchHotelPaginationContext";
import { Box } from "@mui/material";
import {
  NotificationType,
  useNotification,
} from "./Context/NotificationContext";
import NotificationComponent from "./UI/NotificationComponent";
import HomePage from "./HomePage";
import { SearchFormDataProvider } from "./Context/SearchFormContext";
import UserSignInPage from "./User/UserSignInPage";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, setLoader } = useLoader();
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const {
    showNotification,
    message,
    type,
    setMessage,
    setShowNotification,
    setType,
    time,
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
        <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Navbar  setOpenSignInModal={setOpenSignInModal} />
        </Box>
        <SearchFormDataProvider>
          <HomePage />
        </SearchFormDataProvider>
      </div>
      {openSignInModal && (
        <UserSignInPage
          openModal={true}
          onClose={(value) => setOpenSignInModal(value)}
        />
      )}
      {showNotification && (
        <NotificationComponent message={message} type={type} time={time} />
      )}
    </HotelPaginationProvider>
  );
}
