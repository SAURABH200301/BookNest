import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addRemoveFavorite } from "../../API/HotelData";
import { HotelInterface } from "../../types/hotel";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../store";
import { setHotelFavorite } from "../../store/HotelStore/hotelSlice";
import AmentiesComponent from "./AmentiesComponent";
import { getCurrencySymbol } from "../../helpers/Currency";
import { useSearchFormData } from "../Context/SearchFormContext";
import {
  NotificationType,
  useNotification,
} from "../Context/NotificationContext";
import { useAuth } from "../Context/AuthContext";
import { useSelector } from "react-redux";

interface CardProps {
  hotel: HotelInterface;
}
export default function CustomCardHorizontal({ hotel }: CardProps) {
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { checkIn, checkOut, guests, rooms } = useSearchFormData();
  const { setShowNotification, setMessage, setType } = useNotification();
  const { isAuthenticated } = useAuth();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const hotelId = hotel?.id;
    const listOfLikedHotels = user?.favorite_hotels || [];

    if (!hotelId) {
      setFavorite(false);
      return;
    }

    const isFavorite = listOfLikedHotels.some(
      (userHotelId) => userHotelId.toString() === hotelId.toString()
    );
    setFavorite(isFavorite);
  }, [hotel?.id, user?.favorite_hotels]);

  function redirectToHotelPage() {
    navigate({
      pathname: `/${hotel._id}`,
      search: `?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&rooms=${rooms}`,
    });
  }

  const addToFavorite = async () => {
    let response: { data: string | null; error: any } = {
      data: "",
      error: null,
    };
    response = await addRemoveFavorite(hotel.id, !favorite);

    if (response.data !== null) {
      dispatch(setHotelFavorite({ id: hotel.id, favorite: !favorite }));
      setShowNotification(true);
      setMessage(response.data);
      setType(NotificationType.SUCCESS);
    } else {
      setShowNotification(true);
      setMessage(response.error);
      setType(NotificationType.ERROR);
    }
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          mx: 5,
          my: 2,
          boxShadow: "3px 0px 3px 0px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#fff",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#fafdff ",
          },
        }}
      >
        <Grid container spacing={2} size={12} sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={hotel.photo}
                alt={hotel.hotelName}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              <Tooltip
                title="Sign in to add this to your favorites"
                disableHoverListener={isAuthenticated}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    display: "inline-block",
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={addToFavorite}
                    disabled={!isAuthenticated}
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    }}
                  >
                    <FavoriteIcon
                      sx={{
                        color: favorite ? "#e91e63" : "#9e9e9e",
                        "&:hover": {
                          color: "#e91e63",
                        },
                      }}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 7 }}
            sx={{
              mx: 1,
              p: 1,
              height: "fit-content",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{hotel.hotelName}</Typography>
                <Stack direction="row" spacing={1}>
                  <Rating
                    name="half-rating"
                    defaultValue={hotel.rating_average}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography variant="subtitle2">({hotel.reviews})</Typography>
                </Stack>
              </Box>
              <Typography variant="subtitle1">
                {hotel.city},{hotel.country}
              </Typography>

              <Box sx={{ py: 1, w: 100 }}>
                <AmentiesComponent amenties={hotel.amenities} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 12 }}>
              <Box
                sx={{
                  backgroundColor: "#E5F5FF",
                  height: "75%",
                  borderRadius: 1,
                  p: 2,
                  alignContent: "flex-end",
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box>
                  From{" "}
                  <Box display="flex">
                    <Typography variant="h4">
                      {getCurrencySymbol(hotel.currency)} {hotel.totalCost}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ alignContent: "end", my: 0.5 }}
                    >
                      Taxes Excluded
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="outlined"
                    onClick={redirectToHotelPage}
                    sx={{ color: "#60442D", borderColor: "#60442D" }}
                  >
                    More Details
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#60442D",
                      color: "white",
                      alignItems: "center",
                      justifyItems: "center",
                      "&:hover": {
                        backgroundColor: "#503621",
                      },
                    }}
                  >
                    <span>Book Now</span>{" "}
                    <ArrowForwardIosIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
