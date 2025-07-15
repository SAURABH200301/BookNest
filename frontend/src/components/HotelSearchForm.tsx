import React, { useEffect, useState } from "react";
import { Box, MenuItem, Typography, Collapse } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import "./HotelSearchForm.css";
import { searchHotels } from "../API/HotelData";
import { HotelInterface, SearchHotelPayload } from "../types/hotel";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { setSearchResults } from "../store/HotelStore/hotelSlice";
import { useLoader } from "./UI/LoaderContext";
import { useHotelPagination } from "../helpers/SearchHotelPaginationContext";

export default function HotelSearchForm() {
  const [cityHotelName, setCityHotelName] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<Dayjs | null>(dayjs().add(1, "day"));
  const [guests, setGuests] = useState<number>(1);
  const [rooms, setRooms] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const { setLoader } = useLoader();
  const { pagination, setTotalItems, setLoadMore, setPagination } =
    useHotelPagination();

  const searchResults: HotelInterface[] = useSelector(
    (state: RootState) => state.hotel.searchResults
  );

  useEffect(() => {
    if (cityHotelName.length === 0) {
      dispatch(setSearchResults([]));
      setPagination({ startIndex: 0, endIndex: 5 });
      setLoadMore(false);
    }
  }, [cityHotelName, dispatch, setLoadMore, setPagination]);

  useEffect(() => {
    if (cityHotelName && checkOut && checkIn) {
      searchAPI({
        hotelName: cityHotelName,
        checkIn: checkIn.toString(),
        checkOut: checkOut.toString(),
        guests,
        rooms,
        ...pagination,
        startIndex: 0,
      });
    }
  }, [checkIn, checkOut, cityHotelName, guests, pagination, rooms]);

  async function searchAPI(searchHotelPayload: SearchHotelPayload) {
    setLoader(true);
    try {
      const response = await searchHotels(searchHotelPayload);
      setTotalItems(response.totalItems);
      const data =
        response.startIndex === 0
          ? response.data
          : [...searchResults, ...response.data];
      dispatch(setSearchResults(data));
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log("error", err);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        <Typography variant="subtitle1" mb={2}>
          Find what's next?
        </Typography>
        <Grid container spacing={2} className="gridBox">
          <Grid
            size={{
              xs: 12,
              sm: 12,
              md: cityHotelName ? 3 : 12,
            }}
          >
            <TextField
              label="City / Hotel Name"
              value={cityHotelName}
              fullWidth
              placeholder="Where to?"
              size="small"
              onChange={(e) => setCityHotelName(e.target.value)}
            />
          </Grid>
          <Grid size={{ md: cityHotelName ? 9 : 12 }}>
            <Collapse
              in={Boolean(cityHotelName)}
              timeout={600}
            >
              <Grid container spacing={2}>
                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: cityHotelName ? 4 : 12,
                  }}
                >
                  <DatePicker
                    label="Check-in Date"
                    value={checkIn}
                    onChange={(newValue) => setCheckIn(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    sm: 6,
                    md: cityHotelName ? 4 : 12,
                  }}
                >
                  <DatePicker
                    label="Check-out Date"
                    value={checkOut}
                    minDate={checkIn ?? undefined}
                    onChange={(newValue) => setCheckOut(newValue)}
                    slotProps={{
                      textField: { fullWidth: true, size: "small" },
                    }}
                  />
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    sm: 12,
                    md: cityHotelName ? 2 : 12,
                  }}
                >
                  <TextField
                    select
                    label="Guests"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    fullWidth
                    size="small"
                  >
                    {[1, 2, 3, 4, 5].map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid
                  size={{
                    xs: 12,
                    sm: 12,
                    md: cityHotelName ? 2 : 12,
                  }}
                >
                  <TextField
                    select
                    label="Rooms"
                    value={rooms}
                    onChange={(e) => setRooms(Number(e.target.value))}
                    fullWidth
                    size="small"
                  >
                    {[1, 2, 3].map((r) => (
                      <MenuItem key={r} value={r}>
                        {r}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
