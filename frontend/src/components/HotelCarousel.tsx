import { HotelInterface } from "../types/hotel";
import "./HotelCarousel.css";
import { Grid, Typography } from "@mui/material";
import CustomCardVertical from "./UI/CustomCardVertical";

interface HotelCarouselProps {
  hotels: HotelInterface[];
}

export default function HotelCarousel({ hotels }: HotelCarouselProps) {
  return (
    <div className="hotelView">
      <Typography variant="h5" gutterBottom>
        Hot hotel deals right now
      </Typography>

      <Grid container spacing={2}>
        {hotels &&
          [...hotels]
            .sort((a, b) => b.rating_average - a.rating_average)
            .slice(0, 6)
            .map((hotel) => (
              <Grid
                key={hotel.id}
                size={{ sm: 12, md: 4, xs: 4, lg: 4 }}
                className="card"
              >
                <CustomCardVertical key={hotel.id} hotel={hotel} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
