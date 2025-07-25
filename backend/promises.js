// import { Hotels } from "./sampleData.js";
import hotelSchema from "./models/Hotels.js";

const Favourite = [];
export async function getAllHotels() {
  try {
    const hotels = await hotelSchema.find();
    return JSON.stringify(hotels);
  } catch (err) {
    return "Unable to return the Hotels";
  }
}

export async function getHotelById(_id) {

  try {
    const hotelByID = await hotelSchema.findOne({ _id });
    return JSON.stringify(hotelByID);
  } catch (err) {
    return "Something went wrong";
  }
}

// export function addHotelToFavorite(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const hotelByID = Hotels.find((hotel) => hotel.id === id);
//       if (hotelByID) {
//         Favourite.push(hotelByID);
//         resolve(true);
//         return;
//       }
//       reject(false);
//     }, 200);
//   });
// }

export function getFavorite() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(Favourite));
    }, 100);
  });
}

export async function searchHotels(hotelName, startIndex, endIndex) {
  try {
    if (!hotelName || hotelName.trim() === "") {
      return JSON.stringify([]);
    }

    const searchedText = hotelName.trim();
    const filter = {
      $or: [
        { hotelName: { $regex: searchedText, $options: "i" } },
        { city: { $regex: searchedText, $options: "i" } },
      ],
    };
    const limit = endIndex - startIndex + 1;
    const skip = startIndex;
    const totalCount = await hotelSchema.countDocuments(filter);

    const filteredList = await hotelSchema.find(filter).skip(skip).limit(limit).lean();

    return {
      data: filteredList,
      totalItems: totalCount,
      startIndex,
      endIndex: Math.min(endIndex, totalCount - 1),
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to search hotels");
  }
}
