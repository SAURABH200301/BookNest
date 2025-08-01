import { createSlice } from '@reduxjs/toolkit';
import { getInitialUserState } from '../state';
import { removeUserHandler, setUserHandler } from './UserReducer';


const userSlice = createSlice({
    name: 'hotel',
    initialState: getInitialUserState(),
    reducers: {
        setUser: setUserHandler,
        removeUser: removeUserHandler,
        // setAllHotels: setHotelsHandler,
        // setHotelFavorite: setHotelFavoriteHandler
    }
});




export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
