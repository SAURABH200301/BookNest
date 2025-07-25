import { memo, useEffect, useState } from "react";
import { HotelInterface } from "../../types/hotel";
import { useParams } from "react-router-dom";
import { getHotelById } from "../../API/HotelData";
import HotelDetailNav from "./HotelDetailsNav";
import { Box, Grid, Typography } from "@mui/material";
import HotelImages from "./HotelImages";
import HotelNameDetails from "./HotelNameDetails";
import { useLoader } from "../Context/LoaderContext";
import Loader from "../UI/Loader.component";
import AmentiesComponent from "../UI/AmentiesComponent";
import HotelPriceCard from "./HotelPriceCard";
import { NotificationType, useNotification } from "../Context/NotificationContext";
import NotificationComponent from "../UI/NotificationComponent";

function HotelDetailPage() {
  const [hotelData, setHotelData] = useState<HotelInterface | null>();
  const { id } = useParams();
  const { showLoader, setLoader } = useLoader();
  const {
    message,
    setMessage,
    type,
    setType,
    showNotification,
    setShowNotification,
  } = useNotification();

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

  return (
    <Box sx={{backgroundColor: "#fafdff", height: "100vh", overflowY: "auto"}}>
      <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
        <HotelDetailNav />
      </Box>
      {!showLoader && (
        <div style={{ margin: "5vw 10vw" }}>
          <Grid container spacing={2}>
            <Grid
              size={{ xs: 12, md: 6, lg: 6 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <HotelImages images={hotelData?.photo || ""} />
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
