import React, { useEffect } from "react";
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
import { useLoader } from "./Context/LoaderContext";
import { useHotelPagination } from "./Context/SearchHotelPaginationContext";
import { useSearchFormData } from "./Context/SearchFormContext";
import {
  NotificationType,
  useNotification,
} from "./Context/NotificationContext";
import { useSearchParams } from "react-router-dom";

export default function HotelSearchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { setLoader } = useLoader();
  const { pagination, setTotalItems, setLoadMore, setPagination } =
    useHotelPagination();

  const [searchParams] = useSearchParams();

  const {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    guests,
    setGuests,
    rooms,
    setRooms,
    cityHotelName,
    setCityHotelName,
  } = useSearchFormData();
  const { setShowNotification, setMessage, setType, setTime } =
    useNotification();

  const searchResults: HotelInterface[] = useSelector(
    (state: RootState) => state.hotel.searchResults
  );

  useEffect(() => {
    if (cityHotelName.length === 0) {
      dispatch(setSearchResults([]));
      setLoadMore(false);
      setPagination({ startIndex: 0, endIndex: 5 });
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
    const response = await searchHotels(searchHotelPayload);
    if (response.data) {
      const responseData = response.data;
      setTotalItems(responseData.totalItems);
      const data =
        responseData.startIndex === 0
          ? responseData.data
          : [...searchResults, ...responseData.data];
      dispatch(setSearchResults(data));
      setShowNotification(true);
      setMessage(
        `Found ${responseData.totalItems} hotels, top ${responseData.endIndex} hotels displaying`
      );
      setType(NotificationType.SUCCESS);
      setLoader(false);
    } else {
      setLoader(false);
      dispatch(setSearchResults([]));
      setShowNotification(true);
      setMessage(response.error?.message);
      setTime(5000);
      setType(NotificationType.ERROR);
    }
  }

  useEffect(() => {
    if (searchParams.toString() !== "") {
      const hotelName = searchParams.get("hotelName") || "";
      const checkInDate = searchParams.get("checkIn") || "";
      const checkOutDate = searchParams.get("checkOut") || "";
      const guestsCount = searchParams.get("guests") || "1";
      const roomsCount = searchParams.get("rooms") || "1";
      setCityHotelName(hotelName);
      setCheckIn(checkInDate ? dayjs(checkInDate) : (null as unknown as Dayjs));
      setCheckOut(
        checkOutDate ? dayjs(checkOutDate) : (null as unknown as Dayjs)
      );
      setGuests(Number(guestsCount));
      setRooms(Number(roomsCount));
    }
  }, [
    searchParams,
    setCheckIn,
    setCheckOut,
    setCityHotelName,
    setGuests,
    setRooms,
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          px: 3,
          pt: 2,
          pb: 3,
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#60442D",
                  },
                  "&:hover fieldset": {
                    borderColor: "#60442D",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#60442D",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#60442D",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#60442D",
                },
              }}
            />
          </Grid>
          <Grid size={{ md: cityHotelName ? 9 : 12 }}>
            <Collapse in={Boolean(cityHotelName)} timeout={600}>
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
                    onChange={(newValue) => setCheckIn(newValue || checkIn)}
                    className="mui-fields"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "#60442D",
                            },
                            "&:hover fieldset": {
                              borderColor: "#60442D",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#60442D",
                            },
                          },
                          "& .MuiInputLabel-root": {
                            color: "#60442D",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#60442D",
                          },
                        },
                      },
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
                    onChange={(newValue) => setCheckOut(newValue || checkOut)}
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
