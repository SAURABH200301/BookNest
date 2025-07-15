
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