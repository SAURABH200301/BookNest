import { HotelInterface } from '../types/hotel';

export type HotelActionTypes = | 'SET_SEARCH_RESULTS' | 'CLEAR_SEARCH_RESULTS' | 'SET_ALL_HOTELS'

export interface HotelAction {
    type: HotelActionTypes,
    payload: | null | HotelInterface[]
}

