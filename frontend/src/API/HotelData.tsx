import axios from "axios";
import {
  HotelInterface,
  HotelPricingInterface,
  HotelPricingResponse,
  SearchHotelPayload,
} from "../types/hotel";
import { jsonParseSafe } from "../helpers/jsonParse";

const GET_ALL_HOTELS = "http://localhost:3333/api/hotel/getHotels";
const ADD_FAVOURITE = "http://localhost:3333/api/hotel/addfavorites/";
const REMOVE_FAVOURITE = "http://localhost:3333/api/hotel/removeFavorites/";
const SEARCH_HOTEL = "http://localhost:3333/api/hotel/search/";
const GET_HOTEL_DETAILS = "http://localhost:3333/api/hotel/";

export async function getHotelById(id: string): Promise<{
  data: HotelInterface | null;
  error: any;
}> {
  try {
    const response = await axios.post(GET_HOTEL_DETAILS + id);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}

export async function getHotelData(): Promise<{
  data: HotelInterface[] | null;
  error: any;
}> {
  try {
    const response = await axios.post(GET_ALL_HOTELS);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function getHotelPricing(
  payload: HotelPricingInterface
): Promise<{ data: HotelPricingResponse | null; error: any }> {
  console.log("Payload:", payload);
  try {
    const response = await axios.post(
      GET_HOTEL_DETAILS + payload.id + "/pricing",
      payload
    );
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}

export async function addFavorite(id: number) {
  try {
    const response = await axios.post(ADD_FAVOURITE + id);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}
export async function removeFavorite(id: number) {
  try {
    const response = await axios.delete(REMOVE_FAVOURITE + id);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}
export async function searchHotels(
  searchHotelPayload: SearchHotelPayload
): Promise<{
  data: {
    data: HotelInterface[];
    endIndex: number;
    startIndex: number;
    totalItems: number;
  } | null;
  error: any;
}> {
  try {
    const response = await axios.post(SEARCH_HOTEL, searchHotelPayload);
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}
