import { memo, useEffect, useState } from "react";
import { HotelInterface } from "../../types/hotel";
import { useParams } from "react-router-dom";
import { addRemoveFavorite, getHotelById } from "../../API/HotelData";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import HotelImages from "./HotelImages";
import HotelNameDetails from "./HotelNameDetails";
import { useLoader } from "../Context/LoaderContext";
import Loader from "../UI/Loader.component";
import AmentiesComponent from "../UI/AmentiesComponent";
import HotelPriceCard from "./HotelPriceCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  NotificationType,
  useNotification,
} from "../Context/NotificationContext";
import NotificationComponent from "../UI/NotificationComponent";
import { useAuth } from "../Context/AuthContext";
import { setHotelFavorite } from "../../store/HotelStore/hotelSlice";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";

function HotelDetailPage() {
  const [hotelData, setHotelData] = useState<HotelInterface | null>();
  const { id } = useParams();
  const { showLoader, setLoader } = useLoader();
  const [favorite, setFavorite] = useState(false);
  const {
    message,
    setMessage,
    type,
    setType,
    showNotification,
    setShowNotification,
  } = useNotification();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getHotelValue() {
      setLoader(true);

      const response = await getHotelById(id || "");
      if (response.data !== null) {
        setHotelData(response.data);
        setLoader(false);
      } else {
        setShowNotification(true);
        setMessage("Failed to fetch hotel details");
        setType(NotificationType.ERROR);
        setLoader(false);
      }
    }
    getHotelValue();
  }, [id, setLoader, setMessage, setShowNotification, setType]);

  useEffect(() => {
    const hotelId = hotelData?.id;
    const listOfLikedHotels = user?.favorite_hotels || [];

    if (!hotelId) {
      setFavorite(false);
      return;
    }

    const isFavorite = listOfLikedHotels.some(
      (userHotelId) => userHotelId.toString() === hotelId.toString()
    );
    setFavorite(isFavorite);
  }, [hotelData?.id, user?.favorite_hotels]);

  const addToFavorite = async () => {
    let response: { data: string | null; error: any } = {
      data: "",
      error: null,
    };
    response = await addRemoveFavorite(hotelData?.id || 0, !favorite);

    if (response.data !== null) {
      dispatch(
        setHotelFavorite({ id: hotelData?.id || 0, favorite: !favorite })
      );
      setFavorite(!favorite);

      setShowNotification(true);
      setMessage(response.data);
      setType(NotificationType.SUCCESS);
    } else {
      setShowNotification(true);
      setMessage(response.error.message);
      setType(NotificationType.ERROR);
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "#fafdff", height: "100vh", overflowY: "auto" }}
    >
      {!showLoader && (
        <div style={{ margin: "5vw 10vw" }}>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 6, lg: 6 }}
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <HotelImages images={hotelData?.photo || ""} />

              {/* Wrapper positioned absolutely relative to the Grid */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  display: "inline-block", // needed so Tooltip can register hover and events
                  zIndex: 10, // ensure it’s above other content
                }}
              >
                <Tooltip
                  title="Sign in to add this to your favorites"
                  disableHoverListener={isAuthenticated}
                >
                  {/* IconButton directly inside Tooltip */}
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
                </Tooltip>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Box
                sx={{
                  px: {
                    xs: "4vw",
                    md: "4vw",
                    lg: "5vw",
                    xl: "6vw",
                  },
                }}
              >
                <HotelNameDetails
                  hotelName={hotelData?.hotelName || ""}
                  hotelAddress={
                    `${hotelData?.city}, ${hotelData?.country}` || ""
                  }
                  rating={hotelData?.rating_average || 0}
                  description={hotelData?.hotel_description || ""}
                  reviews={hotelData?.reviews || 0}
                  distanceFrom={hotelData?.distance_from || []}
                />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {" "}
                    Amenities
                  </Typography>
                  <AmentiesComponent amenties={hotelData?.amenities || []} />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <HotelPriceCard />
        </div>
      )}
      {showLoader && (
        <div>
          <Loader showLoader={showLoader} />
        </div>
      )}
      {showNotification && (
        <NotificationComponent message={message} type={type} time={5000} />
      )}
    </Box>
  );
}

export default memo(HotelDetailPage);
