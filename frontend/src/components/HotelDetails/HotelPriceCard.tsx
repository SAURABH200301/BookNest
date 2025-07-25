import dayjs, { Dayjs } from "dayjs";
import { useSearchFormData } from "../Context/SearchFormContext";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  HotelPricingDefault,
  HotelPricingInterface,
  HotelPricingResponse,
  HotelPricingResponseDefault,
} from "../../types/hotel";
import { getHotelPricing } from "../../API/HotelData";
import { getCurrencySymbol } from "../../helpers/Currency";
import {
  getDiscountedPrice,
  getTaxAmount,
  getTaxPlusAmount,
  getTotalAmount,
} from "../../helpers/HotelHelpers";
import { useParams } from "react-router-dom";
import {
  NotificationType,
  useNotification,
} from "../Context/NotificationContext";

export default function HotelPriceCard() {
  const { id } = useParams();
  const [cardCheckIn, setCardCheckIn] = useState<Dayjs>(dayjs());
  const [cardCheckOut, setCardCheckOut] = useState<Dayjs>(
    dayjs().add(1, "day")
  );
  const [cardGuests, setCardGuests] = useState<number>(1);
  const [cardRooms, setCardRooms] = useState<number>(1);
  const { checkIn, checkOut, guests, rooms } = useSearchFormData();
  const [pricingData, setPricingData] = useState<HotelPricingResponse>(
    HotelPricingResponseDefault
  );
  const [payload, setPayload] =
    useState<HotelPricingInterface>(HotelPricingDefault);

  const { setShowNotification, setMessage, setType } = useNotification();
  useEffect(() => {
    if (id && id.length > 0) {
      setPayload({
        id: id || "",
        checkIn: cardCheckIn,
        checkOut: cardCheckOut,
        guests: cardGuests,
        rooms: cardRooms,
      });
    }
  }, [id, cardCheckIn, cardCheckOut, cardGuests, cardRooms]);

  useEffect(() => {
    setCardCheckIn(checkIn);
    setCardCheckOut(checkOut);
    setCardGuests(guests);
    setCardRooms(rooms);
  }, [checkIn, checkOut, guests, rooms]);

  useEffect(() => {
    if (payload.id.length === 0) return;
    const handler = setTimeout(() => {
      fetchPricing();
    }, 300);

    async function fetchPricing() {
      const response = await getHotelPricing(payload);
      if (response.data) {
        setPricingData(response.data);
      } else {
        setShowNotification(true);
        setMessage("Failed to fetch hotel pricing");
        setType(NotificationType.ERROR);
      }
    }
    return () => clearTimeout(handler);
  }, [payload, setMessage, setType, setShowNotification]);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#d8e9f1",
        borderRadius: 3,
        marginTop: 2,
        border: "1px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
        Check Out the deal
      </Typography>
      <Grid container rowSpacing={1} columnSpacing={3} sx={{ marginBottom: 2 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack direction="row" spacing={2}>
                <DatePicker
                  label="Check-In Date"
                  value={cardCheckIn}
                  minDate={dayjs()}
                  onChange={(newValue) =>
                    setCardCheckIn(newValue || cardCheckIn)
                  }
                  format="ddd, DD MMM"
                  slotProps={{
                    textField: { fullWidth: true, size: "small" },
                  }}
                />
                <DatePicker
                  label="Check-out Date"
                  value={cardCheckOut}
                  minDate={cardCheckIn ?? undefined}
                  onChange={(newValue) =>
                    setCardCheckOut(newValue || cardCheckOut)
                  }
                  format="ddd, DD MMM"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </Stack>
          <TextField
            select
            label="Guests"
            value={cardGuests}
            onChange={(e) => setCardGuests(Number(e.target.value))}
            fullWidth
            size="small"
            sx={{ my: 2 }}
          >
            {[1, 2, 3, 4, 5].map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Rooms"
            value={cardRooms}
            onChange={(e) => setCardRooms(Number(e.target.value))}
            fullWidth
            size="small"
            sx={{ marginBottom: 2 }}
          >
            {[1, 2, 3].map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="baseline"
            gap={1}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                width: "fit-content",
              }}
            >
              {getCurrencySymbol(pricingData.currency)}{" "}
              {getTaxPlusAmount(pricingData.totalCost)}
            </Typography>
            <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
              + taxes & fees (18%): {getCurrencySymbol(pricingData.currency)}{" "}
              {getTaxAmount(pricingData.totalCost)}
            </Typography>
          </Box>
          <Box sx={{ borderTop: "1px rgba(0, 0, 0, 0.6) dotted" }}></Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={1}
          >
            <Typography>Your savings (10% off):</Typography>
            <Typography>
              {getCurrencySymbol(pricingData.currency)}{" "}
              {getDiscountedPrice(pricingData.totalCost)}
            </Typography>
          </Box>
          <Box sx={{ borderTop: "1px rgba(0, 0, 0, 0.6) dotted" }}></Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: "bold" }}>Total price:</Typography>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {getCurrencySymbol(pricingData.currency)}{" "}
              {getTotalAmount(pricingData.totalCost)}
            </Typography>
          </Box>
        </Grid>
        <Button
          sx={{ width: "100%", fontWeight: "bold" }}
          variant="contained"
          color="primary"
        >
          Book Now
        </Button>
      </Grid>
    </Box>
  );
}
