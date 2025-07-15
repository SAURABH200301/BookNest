
import { HotelInterface } from '../types/hotel';



export interface HotelState {
    AllHotels: HotelInterface[]
    searchResults: HotelInterface[];
}

export default function getInitlialState(){
    return {
        AllHotels:[],
        searchResults:[]
    }
}