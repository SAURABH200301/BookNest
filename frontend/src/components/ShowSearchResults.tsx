import CustomCardHorizontal from "./UI/CustomCardHorizontal";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { HotelInterface } from "../types/hotel";
import { useEffect } from "react";

export default function ShowSearchResult() {
  const searchResults: HotelInterface[] = useSelector(
    (state: RootState) => state.hotel.searchResults
  );
  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: {
            xs: "90%",
            sm: "80%",
            md: "80%",
          },
        }}
      >
        {searchResults &&
          searchResults.map((hotel) => (
            <CustomCardHorizontal key={hotel._id} hotel={hotel} />
          ))}
      </Box>
    </Box>
  );
}
