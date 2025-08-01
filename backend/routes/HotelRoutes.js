import express from "express";

import {
  getAllHotels,
  getHotelById,
  getFavorite,
  searchHotels,
} from "../promises.js";
import { getUpdatePriceAsPerCustomerNeeds } from "../helpers/calculateCost.js";
import authenticateJWT from "../middleware/AuthenticateJWT.js";
import User from "../models/User.js"
import Hotels from "../models/Hotels.js";

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


//GET ALL FAVORITES 
router.get("/getFavorites", authenticateJWT, async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter missing" });
    }

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorite_hotels || user.favorite_hotels.length === 0) {
      return res.status(200).json([]); 
    }
    const favoriteHotelDocs = await Hotels.find({
      id: { $in: user.favorite_hotels },
    });

    res.status(200).json(favoriteHotelDocs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
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
      totalCost: Number(updatedHotel[0].totalCost.toFixed(2)),
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

router.post("/addfavorites/:id", authenticateJWT, async (req, res) => {
  try {
    const hotelId = req.params.id;
    const userId = req.body.userId;
    const addFavorite = req.body.favorite;

    if (!userId || typeof addFavorite !== "boolean") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const hotelByID = await getHotelById(hotelId);
    if (!hotelByID) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const user = await User.findOne({ user_id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (addFavorite) {
      await User.updateOne(
        { user_id: userId },
        { $addToSet: { favorite_hotels: hotelId } }
      );
      return res.status(200).json({ message: "Hotel added to favorites" });
    } else {
      const updateResult = await User.updateOne(
        { user_id: userId, favorite_hotels: hotelId },
        { $pull: { favorite_hotels: hotelId } }
      );

      if (updateResult.modifiedCount === 0) {
        return res.status(404).json({ message: "Hotel not in favorite list" });
      }

      return res.status(200).json({ message: "Hotel removed from favorites" });
    }
  } catch (err) {
    console.error("Error encountered: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
