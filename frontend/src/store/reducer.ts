import { combineReducers } from '@reduxjs/toolkit';
import hotelReducer from './HotelStore/hotelSlice';
import UserReducer from './UserStore/UserSlice';

const rootReducer = combineReducers({
  hotel: hotelReducer,
  user: UserReducer
});

export default rootReducer;
