import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useSearchFormData } from "../Context/SearchFormContext";

export default function HotelDetailNav() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);


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

  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(url.split("?")[1]);
    setCheckIn(params.get("checkIn") ? dayjs(params.get("checkIn")) : dayjs());
    setCheckOut(
      params.get("checkOut")
        ? dayjs(params.get("checkOut"))
        : dayjs().add(1, "day")
    );
    setGuests(params.get("guests") ? Number(params.get("guests")) : 1);
    setRooms(params.get("rooms") ? Number(params.get("rooms")) : 1);
    setCityHotelName(params.get("hotelName") || "");
  }, [setCheckIn, setCheckOut, setGuests, setRooms, setCityHotelName]);

  const userSettings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => setAnchorElUser(null);
  function searchHotelsHandler() {
    let host = "http://localhost:3000/";
    const params = {
      hotelName: cityHotelName,
      checkIn: checkIn.toString(),
      checkOut: checkOut.toString(),
      guests: String(guests),
      rooms: String(rooms),
      enIndex: "5",
      startIndex: "0",
    };

    const searchParams = new URLSearchParams(params).toString();
    const url = `${host}?${searchParams}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 8px 10px -15px rgba(0,0,0,0.5)",
        px: 3,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ApartmentIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            // variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.5vw",
            }}
          >
            BookNest
          </Typography>

          <ApartmentIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BookNest
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid
                container
                spacing={2}
                className="gridBox"
                sx={{ p: 1, width: "100%" }}
              >
                <Grid
                  size={{
                    xs: 3,
                    sm: 3,
                    md: 3,
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
                <Grid size={{ md: 9 }}>
                  <Grid container spacing={2}>
                    <Grid
                      size={{
                        xs: 3,
                        sm: 3,
                        md: 3,
                      }}
                    >
                      <DatePicker
                        label="Check-in Date"
                        value={checkIn}
                        onChange={(newValue) => setCheckIn(newValue || checkIn)}
                        format="ddd, DD MMM"
                        slotProps={{
                          textField: { fullWidth: true, size: "small" },
                        }}
                      />
                    </Grid>

                    <Grid
                      size={{
                        xs: 3,
                        sm: 3,
                        md: 3,
                      }}
                    >
                      <DatePicker
                        label="Check-out Date"
                        value={checkOut}
                        minDate={checkIn ?? undefined}
                        onChange={(newValue) =>
                          setCheckOut(newValue || checkOut)
                        }
                        format="ddd, DD MMM"
                        slotProps={{
                          textField: { fullWidth: true, size: "small" },
                        }}
                      />
                    </Grid>

                    <Grid
                      size={{
                        md: 2,
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
                        md: 2,
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
                    <Grid
                      size={{
                        md: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={searchHotelsHandler}
                        disabled={!cityHotelName}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Box>
          {/* User Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {userSettings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
