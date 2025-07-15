import { combineReducers } from '@reduxjs/toolkit';
import hotelReducer from './HotelStore/hotelSlice';

const rootReducer = combineReducers({
  hotel: hotelReducer,
});

export default rootReducer;
