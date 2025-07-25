import { Box, Grid, Typography } from "@mui/material";
import loadingImage1 from "../assests/landing-photo.jpg";
import loadingImage2 from "../assests/landing-photo-2.jpg";
import loadingImage3 from "../assests/landing-photo-3.jpg";
import FindHotel from "./FindHotel";
import { useSearchFormData } from "./Context/SearchFormContext";

export default function HomePage() {
  const { cityHotelName } = useSearchFormData();
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      {cityHotelName.length <= 0 && (
        <Box sx={{ position: "relative", height: "100vh" }}>
          <Box
            component="img"
            src={loadingImage1}
            alt="Landing"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: cityHotelName.length > 0 ? 0 : 1,
              overflow: "hidden",
              transition: "opacity 0.5s, max-height 0.5s",
            }}
          />

          <Typography
            variant="h2"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              zIndex: 1,
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            New Day{" "}
            <Box component="span" display="block">
              New Stay
            </Box>
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          transition:
            "transform 0.5s cubic-bezier(0.4,0,0.2,1), margin-top 0.5s cubic-bezier(0.4,0,0.2,1)",
          transform:
            cityHotelName.length > 0 ? "translateY(10vh)" : "translateY(-10vh)",
        }}
      >
        <FindHotel />
      </Box>
      {cityHotelName.length <= 0 && (
        <Box>
          <Typography
            sx={{
              fontSize: "3rem",
              textAlign: "center",
              mt: 2,
              fontWeight: "bold",
            }}
          >
            NEST IN COMFORT, BOOK WITH EASE
          </Typography>
          <Box>
            <Grid container>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                {" "}
                <Box
                  component="img"
                  src={loadingImage2}
                  alt="Landing"
                  sx={{ width: "100%", height: "70vh", objectFit: "cover" }}
                />
              </Grid>
              <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  height: { xs: "fit-content", sm: "fit-content", md: "70vh" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", p: 2, fontSize: "1.5rem" }}
                  >
                    YOUR COMFORT, OUR PRIORITY
                  </Typography>
                  <Typography variant="body1" sx={{ p: 2 }}>
                    From elegant lobbies to cozy rooms, we partner with
                    properties that prioritize your comfort and well-being.
                    Experience top-notch amenities and exceptional hospitality
                    that will make your stay truly memorable.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                size={{ xs: 12, sm: 12, md: 6 }}
                sx={{
                  backgroundColor: "#f5f5f5",
                  height: { xs: "fit-content", sm: "fit-content", md: "70vh" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    px: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "bold", p: 2, fontSize: "1.5rem" }}
                  >
                    SEAMLESS RESERVATIONS, INSTANT CONFIRMATION
                  </Typography>
                  <Typography variant="body1" sx={{ p: 2 }}>
                    Gone are the days of complicated bookings, Our streamlined
                    process allowed you to find, compare, and reserve your ideal
                    accommodation quickly. Get instant confirmation and start
                    looking forward to your stress-free trip.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                {" "}
                <Box
                  component="img"
                  src={loadingImage3}
                  alt="Landing"
                  sx={{ width: "100%", height: "70vh", objectFit: "cover" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
}
