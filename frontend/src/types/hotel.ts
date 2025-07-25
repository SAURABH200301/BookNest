import { Dayjs } from "dayjs";

export interface SearchHotelPayload {
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  startIndex: number;
  endIndex: number;
}

export enum AmenitiesEnum {
  POOL = "POOL",
  GYM = "GYM",
  SAUNA = "SAUNA",
  TENNIS_COURT = "TENNIS COURT",
  PLAYGROUND = "PLAYGROUND",
  BBQ_AREA = "BBQ AREA",
  WIFI = "WIFI"
}
export interface HotelInterface {
  _id: string;
  id: number;
  hotelName: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  star_rating: number;
  price: number;
  currency: string;
  price_per_night_per_guest: number;
  price_per_hour: number;
  reviews: number;
  rating_average: number;
  photo: string;
  hotel_description: string;
  favorite: boolean;
  amenities: AmenitiesEnum[];
  distance_from: { name: string, distance: number }[],
  totalCost?: number,
  stayDuration?: number
}

export interface HotelPricingInterface {
  id: string;
  checkIn: string | Dayjs;
  checkOut: string | Dayjs;
  guests: number;
  rooms: number;
}
export const HotelPricingDefault: HotelPricingInterface = {
  id: "",
  checkIn: "",
  checkOut: "",
  guests: 0,
  rooms: 0,
};

export interface HotelPricingResponse {
  id: string,
  name: string,
  totalCost: number,
  stayDuration: number,
  currency: string
}
export const HotelPricingResponseDefault: HotelPricingResponse = {
  id: "",
  name: "",
  totalCost: 0,
  stayDuration: 0,
  currency: ""
};
