import axios from "axios";
import {
  HotelInterface,
  HotelPricingInterface,
  HotelPricingResponse,
  SearchHotelPayload,
} from "../types/hotel";
import { jsonParseSafe } from "../helpers/jsonParse";

const MAIN_URL = "http://localhost:3333/api/hotel/";

const GET_ALL_HOTELS = `${MAIN_URL}getHotels`;
const ADD_FAVOURITE = `${MAIN_URL}addfavorites/`;
const SEARCH_HOTEL = `${MAIN_URL}search/`;
const GET_ALL_FAVORITES = `${MAIN_URL}getFavorites`;

export async function getHotelById(id: string): Promise<{
  data: HotelInterface | null;
  error: any;
}> {
  try {
    const response = await axios.post(MAIN_URL + id);
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
      MAIN_URL + payload.id + "/pricing",
      payload
    );
    return { data: jsonParseSafe(response.data, response.data), error: null };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}

export async function addRemoveFavorite(id: number, favorite: boolean) {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (!userId) {
    return { data: null, error: "Please Login." };
  }
  try {
    const response = await axios.post(
      ADD_FAVOURITE + id,
      { userId, favorite },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      data: jsonParseSafe(response.data.message, response.data.message),
      error: null,
    };
  } catch (err) {
    console.log("error caught", err);
    return { data: null, error: err };
  }
}

export async function getFavoriteHotels() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  if (!userId) {
    return { data: null, error: "Please Login." };
  }
  try {
    const response = await axios.get(GET_ALL_FAVORITES, {
      params: { userId }, 
      headers: { Authorization: `Bearer ${token}` },
    });
    return {
      data: jsonParseSafe(response.data, response.data),
      error: null,
    };
  } catch (err) {
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
