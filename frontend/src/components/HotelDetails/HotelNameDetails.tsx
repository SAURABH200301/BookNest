import { Rating, Stack, Typography } from "@mui/material";
import { memo } from "react";

export interface HotelDetailPageProps {
  hotelName: string;
  hotelAddress: string;
  rating: number;
  description: string;
  reviews: number;
  distanceFrom: { name: string; distance: number }[];
}

function HotelNameDetails(props: HotelDetailPageProps) {
  return (
    <>
      <Typography sx={{ fontWeight: "bold", fontSize: "4vw" }}>
        {props.hotelName}
      </Typography>
      <Typography sx={{ fontWeight: "bold", fontSize: "2vw", color: "grey" }}>
        {props.hotelAddress}
      </Typography>
      {props.rating && (
        <Stack direction="row" spacing={1}>
          <Rating
            name="half-rating"
            defaultValue={props.rating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="subtitle2">({props.reviews})</Typography>
        </Stack>
      )}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {" "}
        About this hotel
      </Typography>
      <Typography variant="body1">{props.description}</Typography>
      {props.distanceFrom.length > 0 && (
        <>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {" "}
            Near by places
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {props.distanceFrom.map((item, index) => (
              <Typography variant="subtitle2" key={index}>
                <b><i>{item.name}</i></b> - {item.distance / 1000} km
                {index < props.distanceFrom.length - 1 ? ", " : ""}
              </Typography>
            ))}
          </Typography>
        </>
      )}
    </>
  );
}
export default memo(HotelNameDetails);
