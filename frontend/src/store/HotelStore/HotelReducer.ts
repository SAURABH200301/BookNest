import { PayloadAction } from "@reduxjs/toolkit";
import { HotelInterface } from "../../types/hotel";
import { HotelState } from "../state";

export function setSearchResultsHandler(
  state: HotelState,
  action: PayloadAction<HotelInterface[]>
) {
  state.searchResults = action.payload;
}
export function clearSearchResultsHandler(
  state: HotelState,
  action: PayloadAction<HotelInterface[]>
) {
  state.searchResults = [];
}
export function setHotelsHandler(
  state: HotelState,
  action: PayloadAction<HotelInterface[]>
) {
  state.AllHotels = action.payload;
}

export function setHotelFavoriteHandler(
  state: HotelState,
  action: PayloadAction<{ id: number, favorite: boolean }>
) {
  const hotels: HotelInterface[] = state.AllHotels;
  state.AllHotels = hotels.map((hotel) =>
    hotel.id === action.payload.id
      ? { ...hotel, favorite: action.payload.favorite }
      : hotel
  );
  const searchedHotels: HotelInterface[] = state.searchResults;
  state.searchResults = searchedHotels?.map((hotel) =>
    hotel.id === action.payload.id
      ? { ...hotel, favorite: action.payload.favorite }
      : hotel
  );
}