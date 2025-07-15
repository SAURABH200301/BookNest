import express from "express";

import {
  getAllHotels,
  getHotelById,
  addHotelToFavorite,
  getFavorite,
  searchHotels,
} from "../promises.js";
import { getUpdatePriceAsPerCustomerNeeds } from "../helpers/calculateCost.js";

const router = express.Router();

let favoruiteHotels = [];

// get all hotels
router.post("/getHotels", async (req, res) => {
  try {
    const hotels = await getAllHotels();
    res.json(hotels);
  } catch (err) {
    console.log("Error encountered", err);
  }
});

// search Hotels

router.post("/search", async (req, res) => {
  try {
    console.log("REQUEST: ", req.body);
    const payload = req.body;
    const hotelName = payload.hotelName;
    const response = await searchHotels(
      hotelName,
      payload.startIndex,
      payload.endIndex
    );
    const list = response.data;
    const updatedList = await getUpdatePriceAsPerCustomerNeeds(payload, list);
    res.status(200).json({ ...response, data: updatedList });
  } catch (err) {
    res.status(404).json("Not Found");
  }
});

router.get("/getFavorites", async (req, res) => {
  try {
    res.status(200).json(favoruiteHotels);
  } catch (err) {
    console.log("Error encountered: ", err);
    res.status(404).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const params = req.params;
    const hotelByID = await getHotelById(params.id);
    res.json(hotelByID);
  } catch (err) {
    console.log("caught error", err);
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found", path: req.url }));
  }
});

//add favorites

router.post("/addfavorites/:id", async (req, res) => {
  try {
    const params = req.params;
    const hotelByID = await getHotelById(params.id);
    favoruiteHotels.push(hotelByID);
    res.status(200).json("Hotel added in favorite");
  } catch (err) {
    console.log("Error encountered: ", err);
    res.status(404).json(err);
  }
});

//remove favorites

router.delete("/removeFavorites/:id", async (req, res) => {
  try {
    const params = req.params;
    favoruiteHotels = favoruiteHotels.filter((hotel) => hotel.id !== params.id);
    console.log("favorites", favoruiteHotels);
    res.status(200).json("Hotel Removed");
  } catch (err) {
    console.log("Error encountered: ", err);
    res.status(404).json(err);
  }
});


export default router;
