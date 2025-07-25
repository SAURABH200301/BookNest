import express from "express";

import {
  getAllHotels,
  getHotelById,
  getFavorite,
  searchHotels,
} from "../promises.js";
import { getUpdatePriceAsPerCustomerNeeds } from "../helpers/calculateCost.js";
import { currentUpdateInfo } from "@temporalio/workflow";

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
router.post("/:id/pricing", async (req, res) => {
  try {
    const params = req.params;
    const hotelByID = await getHotelById(params.id);
    if (!hotelByID) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    const payload = req.body;
    const hotellist = [JSON.parse(hotelByID)];
    const updatedHotel = await getUpdatePriceAsPerCustomerNeeds(
      payload,
      hotellist
    );
    const response = {
      id: updatedHotel[0]._id,
      name: updatedHotel[0].name,
      totalCost: Number((updatedHotel[0].totalCost).toFixed(2)),
      stayDuration: updatedHotel[0].stayDuration,
      currency: updatedHotel[0].currency,
    };
    res.status(200).json(response);
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
    res.status(200).json(`Hotel removed from favorites`);
  } catch (err) {
    console.log("Error encountered: ", err);
    res.status(404).json(err);
  }
});

export default router;
