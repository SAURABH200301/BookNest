import axios from "axios";
import { HotelInterface, SearchHotelPayload } from "../types/hotel";
import { jsonParseSafe } from "../helpers/jsonParse";

const GET_ALL_HOTELS = "http://localhost:3333/api/hotel/getHotels";
const ADD_FAVOURITE = "http://localhost:3333/api/hotel/addfavorites/";
const REMOVE_FAVOURITE = "http://localhost:3333/api/hotel/removeFavorites/";
const SEARCH_HOTEL = "http://localhost:3333/api/hotel/search/";

export async function getHotelData(): Promise<HotelInterface[]> {
  try {
    const response = await axios.post(GET_ALL_HOTELS);
    return jsonParseSafe(response.data, response.data);
  } catch (err) {
    console.log("error caught", err);
    return [];
  }
}

export async function addFavorite(id: number) {
  try {
    const response = await axios.post(ADD_FAVOURITE + id);
    return jsonParseSafe(response.data, response.data);
  } catch (err) {
    console.log("error caught", err);
    return;
  }
}
export async function removeFavorite(id: number) {
  try {
    const response = await axios.delete(REMOVE_FAVOURITE + id);
    return jsonParseSafe(response.data, response.data);
  } catch (err) {
    console.log("error caught", err);
    return;
  }
}
export async function searchHotels(searchHotelPayload: SearchHotelPayload) {
  try {
    const response = await axios.post(SEARCH_HOTEL, searchHotelPayload);
    return jsonParseSafe(response.data, response.data);
  } catch (err) {
    console.log("error caught", err);
    return;
  }
}
