
import { HotelInterface } from '../types/hotel';



export interface HotelState {
    AllHotels: HotelInterface[]
    searchResults: HotelInterface[];
}

export function getInitlialHotelState() {
    return {
        AllHotels: [],
        searchResults: []
    }
}

export interface UserState {
    _id: string
    user_id: string;
    name: string;
    mobile_number: number;
    email: string;
    favorite_hotels: any[];
    country: string;
}

export function getInitialUserState(): UserState {
    return {
        _id: '',
        user_id: '',
        name: 'John Snow',
        mobile_number: 0,
        email: 'johnshow@north.com',
        favorite_hotels: [],
        country: 'north'
    }
}