import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useAuth } from "./Context/AuthContext";
import UserSignInPage from "./User/UserSignInPage";
import { useLocation, useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSearchFormData } from "./Context/SearchFormContext";
import dayjs from "dayjs";
import { getUserByIdHelper } from "../API/UserData";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { removeUser, setUser } from "../store/UserStore/UserSlice";
import {
  NotificationType,
  useNotification,
} from "./Context/NotificationContext";
import { useLoader } from "./Context/LoaderContext";

interface PageType {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const pages: PageType[] = [
  {
    title: "Favorites",
    icon: <FavoriteIcon sx={{ mr: 1 }} />,
    href: "/favorites",
  },
];

const userSettingsLogin = ["SignIn"];
const userSettingLogout = ["Profile", "Logout"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const { isAuthenticated, logout } = useAuth();
  const [userSettings, setUserSettings] = useState<string[]>(userSettingsLogin);
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [userName, setUserName] = useState("John Snow");
  const dispatch = useDispatch<AppDispatch>();
  const { setShowNotification, setMessage, setType } = useNotification();
  const navigate = useNavigate();
  const { setLoader } = useLoader();
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

  const getUserById = useCallback(async () => {
    const userId = localStorage.getItem("userId");
    const response = await getUserByIdHelper(userId || "");
    if (response.data) {
      setUserName(response.data.name);
      dispatch(setUser(response.data));
    } else {
      logout();
      setUserName("John Snow");
      navigate("/");
      setShowNotification(true);
      setMessage(response.error.message);
      setType(NotificationType.ERROR);
    }
  }, [dispatch, logout, navigate, setShowNotification, setMessage, setType]);

  useEffect(() => {
    if (isAuthenticated) {
      setUserSettings(userSettingLogout);
      getUserById();
    } else {
      dispatch(removeUser());
      setUserSettings(userSettingsLogin);
    }
  }, [dispatch, getUserById, isAuthenticated]);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleMenuItems = (href: string) => {
    navigate(href);
  };
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const openSetting = (setting: string) => {
    switch (setting) {
      case "SignIn":
        setOpenSignInModal(true);
        break;
      case "Logout":
        logout();
        setLoader(true);
        setTimeout(() => {
          setLoader(false);
          setShowNotification(true);
          setType(NotificationType.SUCCESS);
          setMessage("Successfully Logout!");
        }, 500);
        setUserName("John Snow");
        navigate("/");
        break;
      default:
    }
    handleCloseUserMenu();
  };
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

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: "grey",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <>
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
            <ApartmentIcon sx={{ mr: 1 }} />
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              BookNest
            </Typography>
            {currentPath === "/" && isAuthenticated && (
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorElNav}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.title}
                      onClick={(e) => handleMenuItems(page.href)}
                    >
                      <Box display="flex" alignItems="center">
                        {page.icon}
                        <Typography textAlign="center">{page.title}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            {currentPath !== "/" && (
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
                            onChange={(newValue) =>
                              setCheckIn(newValue || checkIn)
                            }
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
            )}

            {/* Desktop Menu */}
            {currentPath === "/" && (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {isAuthenticated &&
                  pages.map((page) => (
                    <Button
                      key={page.title}
                      onClick={(e) => handleMenuItems(page.href)}
                      sx={{ my: 2, color: "black", display: "flex" }}
                      startIcon={page.icon}
                    >
                      {page.title}
                    </Button>
                  ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar {...stringAvatar(userName)} />
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
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      openSetting(setting);
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {openSignInModal && (
        <UserSignInPage
          openModal={true}
          onClose={(value) => setOpenSignInModal(value)}
        />
      )}
    </>
  );
}
