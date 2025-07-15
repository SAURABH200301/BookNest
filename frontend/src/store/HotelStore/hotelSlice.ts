import { createSlice } from '@reduxjs/toolkit';
import getInitlialState from '../state';
import { setSearchResultsHandler, clearSearchResultsHandler, setHotelsHandler, setHotelFavoriteHandler } from './HotelReducer';


const hotelSlice = createSlice({
  name: 'hotel',
  initialState: getInitlialState(),
  reducers: {
    setSearchResults: setSearchResultsHandler,
    clearSearchResults: clearSearchResultsHandler,
    setAllHotels: setHotelsHandler,
    setHotelFavorite: setHotelFavoriteHandler
  }
});




export const { setAllHotels, setSearchResults, clearSearchResults, setHotelFavorite } = hotelSlice.actions;
export default hotelSlice.reducer;
