import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { Box, Button } from "@mui/material";

import "./CustomCardVertical.css";
import { addFavorite, removeFavorite } from "../../API/HotelData";
import { getCurrencySymbol } from "../../helpers/Currency";
import { HotelInterface } from "../../types/hotel";
import { setHotelFavorite } from "../../store/HotelStore/hotelSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

interface CardProps {
  hotel: HotelInterface;
}
export default function CustomCardVertical({ hotel }: CardProps) {
  const [favorite, setFavorite] = useState(false);
  const dispatch= useDispatch<AppDispatch>()

  const addToFavorite = async () => {
    try {
      let response;
      if (!favorite) {
        response = await addFavorite(hotel.id);
      } else {
        response = await removeFavorite(hotel.id);
      }
      console.log("fav added", response);
      dispatch(setHotelFavorite({ id: hotel.id, favorite: !favorite }));
    } catch (err) {}
  };

  useEffect(() => {
    setFavorite(hotel.favorite);
  }, [hotel.favorite]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={
          <Stack spacing={1}>
            <Typography variant="h6">{hotel.hotelName}</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <LocationPinIcon /> {hotel.city}, {hotel.country}
            </Typography>
          </Stack>
        }
        action={
          <Stack direction="row" spacing={1}>
            <Rating
              name="half-rating"
              defaultValue={hotel.rating_average}
              precision={0.5}
              readOnly
            />
          </Stack>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={hotel.photo}
        alt={hotel.hotelName}
        sx={{ width: 345, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {hotel.hotel_description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <span className="price">
            {" "}
            {hotel.price_per_hour} {getCurrencySymbol(hotel.currency)} per hour
          </span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <IconButton aria-label="add to favorites" onClick={addToFavorite}>
              <FavoriteIcon sx={{ color: favorite ? "#e91e63" : "#9e9e9e" }} />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Button variant="outlined" color="inherit" aria-label="check-deal">
            <CallMissedOutgoingIcon /> Check the Deal
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
