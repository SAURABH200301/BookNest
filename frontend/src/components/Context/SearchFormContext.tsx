import dayjs, { Dayjs } from "dayjs";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoaderContextType = {
  checkIn: Dayjs;
  setCheckIn: Dispatch<SetStateAction<Dayjs>>;
  checkOut: Dayjs;
  setCheckOut: Dispatch<SetStateAction<Dayjs>>;
  guests: number;
  setGuests: Dispatch<SetStateAction<number>>;
  rooms: number;
  setRooms: Dispatch<SetStateAction<number>>;
  cityHotelName: string;
  setCityHotelName: Dispatch<SetStateAction<string>>;
};

interface SearchFormDataProviderProps {
  children: React.ReactNode;
}

const SearchFormContext = createContext<LoaderContextType>({
  checkIn: dayjs(),
  setCheckIn: () => {},
  checkOut: dayjs().add(1, "day"),
  setCheckOut: () => {},
  guests: 1,
  setGuests: () => {},
  rooms: 1,
  setRooms: () => {},
  cityHotelName: "",
  setCityHotelName: () => {},
});

export const SearchFormDataProvider: React.FC<SearchFormDataProviderProps> = ({
  children,
}) => {
  const [checkIn, setCheckIn] = useState<Dayjs>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs>(dayjs().add(1, "day"));
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const [cityHotelName, setCityHotelName] = useState<string>("");
  
  return (
    <SearchFormContext.Provider
      value={{
        checkIn,
        setCheckIn,
        checkOut,
        setCheckOut,
        guests,
        setGuests,
        rooms,
        setRooms,
        cityHotelName,
        setCityHotelName,
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
};

export const useSearchFormData = () => useContext(SearchFormContext);
