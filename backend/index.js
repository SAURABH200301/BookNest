import express from "express";
const app = express();
import cors from "cors";
import HotelRoutes from './routes/HotelRoutes.js';
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import {
  getAllHotels,
  getHotelById,
  addHotelToFavorite,
  getFavorite,
} from "./promises.js";
import UrlPattern from "url-pattern";
import url from "url";
import connectToDatabase from "./mongo.js";

//NODE
// const server = http.createServer(async (req, res) => {
//   const hotelByIdPattern = new UrlPattern("/hotel/:id");
//   if (req.url === "/getHotels" && req.method === "GET") {
//     try {
//       const hotels = await getAllHotels();
//       res.end(hotels);
//     } catch (err) {
//       console.log("Error encountered", err);
//     }
//   }
  // if (req.url === "/getHotels" && req.method === "POST") {
  //   let body = "";
  //   req.on("data", chunk => {
  //     body += chunk;
  //   });
  //   req.on("end", async () => {
  //     try {
  //       const hotels = await getAllHotels();
  //       res.end(hotels);
  //     } catch (err) {
  //       console.log("Error encountered", err);
  //     }
  //   });
  // }
//   const parsedUrl = url.parse(req.url, true);
//   const pathname = parsedUrl.pathname;
//   const params = hotelByIdPattern.match(pathname);
//   if (params && params.id && req.method === "POST") {
//     try {
//       const hotelId = params.id;
//       const hotelByID = await getHotelById(hotelId);
//       res.end(hotelByID);
//     } catch (err) {
//       console.log("caught error", err);
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Not found", path: pathname }));
//     }
//   }
//   if (params && params.id && req.method === "PUT") {
//     try {
//       const hotelId = params.id;
//       const addedInFav = await addHotelToFavorite(hotelId);
//       console.log("hotel", addedInFav);
//       if (addedInFav) {
//         res.end(`hotel with Id: ${hotelId} is added in favorite`);
//       }
//     } catch (err) {
//       console.log(err);
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Not found", path: pathname }));
//     }
//   }
//   if (req.url === "/favorites" && req.method === "GET") {
//     try {
//       const favorites = await getFavorite();
//       res.end(favorites);
//     } catch (err) {
//       console.log(err);
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Not found", path: pathname }));
//     }
//   }
// });

// server.listen(PORT, () => {
//   console.log(`listening at ${PORT}`);
// });

//EXPRESS
app.use(cors());
app.use(express.json());
connectToDatabase()

const port = process.env.PORT || 80 

app.use("/api/hotel", HotelRoutes);

app.listen(port, () => {
  console.log("express app listening at 3333");
});
