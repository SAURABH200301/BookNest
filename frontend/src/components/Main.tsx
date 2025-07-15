import { useState, useEffect } from "react";
import { HotelInterface } from "../types/hotel";
import FindHotel from "./FindHotel";
import HotelCarousel from "./HotelCarousel";
import Navbar from "./Navbar";
import { getHotelData } from "../API/HotelData";
import Loader from "./UI/Loader.component";
import type { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setAllHotels } from "../store/HotelStore/hotelSlice";
import { useLoader } from "./UI/LoaderContext";
import { HotelPaginationProvider } from "../helpers/SearchHotelPaginationContext";

export default function Main() {
  const [hotels, setHotels] = useState<HotelInterface[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, setLoader } = useLoader();
  const allHotels: HotelInterface[] = useSelector(
    (state: RootState) => state.hotel.AllHotels
  );

  const searchResults: HotelInterface[] = useSelector(
    (state: RootState) => state.hotel.searchResults
  );

  useEffect(() => {
    setLoader(true);

    const fetchHotels = async () => {
      const listOFHotels: HotelInterface[] = await getHotelData();
      setHotels(listOFHotels);
      dispatch(setAllHotels(listOFHotels));
      setLoader(false);
    };

    fetchHotels();
  }, [dispatch, setLoader]);

  useEffect(() => {
    setHotels(allHotels);
  }, [allHotels]);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();

    if (showLoader) {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    }

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [showLoader]);

  return (
    <HotelPaginationProvider>
      {showLoader && <Loader showLoader={showLoader} />}
      <div>
        <Navbar />
        <FindHotel />
        {!searchResults.length && <HotelCarousel hotels={hotels} />}
      </div>
    </HotelPaginationProvider>
  );
}
