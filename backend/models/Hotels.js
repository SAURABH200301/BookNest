/* eslint-disable no-undef */
import { Schema, model } from "mongoose";

const distanceSchema = new Schema({
    name: { type: String, required: true },
    distance: { type: Number, required: true },
});

const hotelSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    hotelName: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    star_rating: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    price_per_night_per_guest: { type: Number, required: true },
    price_per_hour: { type: Number, required: true },
    reviews: { type: Number, required: true },
    rating_average: { type: Number, required: true },
    photo: { type: String, required: true },
    hotel_description: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    amenities: [{ type: String }],
    distance_from: { type: [distanceSchema], required: true },
});

export default model("hotels", hotelSchema);
