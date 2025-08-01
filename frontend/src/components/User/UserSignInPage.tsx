import { Key } from "@mui/icons-material";
import {
  Modal,
  Box,
  Button,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  Input,
  LinearProgress,
  Stack,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CountrySelect from "../UI/CountrySelect";
import { loginUser, signUpUser } from "../../API/AuthData";
import { useLoader } from "../Context/LoaderContext";
import {
  NotificationType,
  useNotification,
} from "../Context/NotificationContext";
import { useAuth } from "../Context/AuthContext";

export interface SignInPageProps {
  openModal: boolean;
  onClose: (value: boolean) => void;
}

export default function UserSignInPage(prop: SignInPageProps) {
  const [open, setOpen] = useState(false);
  const [showSignUpUI, setShowSignUpUI] = useState<boolean>(false);
  const { setLoader } = useLoader();
  const { setMessage, setType, setShowNotification } = useNotification();
  const { login } = useAuth();
  const [buttonLoader, setButtonLoader] = useState(false);
  const handleClose = () => {
    setOpen(false);
    prop.onClose(false);
  };
  useEffect(() => {
    setOpen(prop.openModal);
  }, [prop.openModal]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    height: "80vh",
    bgcolor: "white",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    zIndex: 9999,
  };
  const [data, setData] = useState<{
    email: string;
    password: string;
    status: "initial" | "loading" | "failure" | "sent";
  }>({
    email: "",
    password: "",
    status: "initial",
  });

  const [signUpData, setSignUpData] = useState<{
    name: string;
    email: string;
    password: string;
    country: string;
    status: "initial" | "loading" | "failure" | "sent";
  }>({ name: "", email: "", password: "", country: "", status: "initial" });

  const minLength = 12;

  const handleChange =
    (field: "email" | "password") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({
        ...prev,
        [field]: event.target.value,
        status: "initial",
      }));
    };

  const handleSignUpChange =
    (field: "email" | "password" | "name" | "country") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpData((prev) => ({
        ...prev,
        [field]: event.target.value,
        status: "initial",
      }));
    };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: "loading" }));
    if (
      data.email.trim() &&
      data.email.includes("@") &&
      data.password.length >= minLength
    ) {
      setLoader(true);
      setButtonLoader(true);
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (response.data?.success) {
        login(response.data.jwtToken || "", response.data.user_id || "");
        setShowNotification(true);
        setMessage("Login successfully");
        setType(NotificationType.SUCCESS);
        setLoader(false);
        setButtonLoader(true);
        handleClose();
      } else {
        setShowNotification(true);
        console.log(JSON.stringify(response.error));
        setMessage(
          "Unable to process your login at this time. Please try later. "
        );
        setType(NotificationType.ERROR);
        setLoader(false);
        setButtonLoader(true);
      }
      setData({ email: "", password: "", status: "sent" });
    } else {
      setData((current) => ({ ...current, status: "failure" }));
    }
  };

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSignUpData((current) => ({ ...current, status: "loading" }));
    if (
      signUpData.email.trim() &&
      signUpData.email.includes("@") &&
      signUpData.password.length >= minLength
    ) {
      setLoader(true);
      setButtonLoader(true);
      const response = await signUpUser({
        name: signUpData.name,
        mobileNumberOrEmail: signUpData.email,
        password: signUpData.password,
        country: signUpData.country,
      });
      if (response.data) {
        console.log(response.data);
        login(response.data?.jwtToken, response.data?.user_id);
        handleClose();
        setShowNotification(true);
        setMessage("Account created successfully");
        setType(NotificationType.SUCCESS);
        setLoader(false);
        setButtonLoader(false);
      } else {
        setShowNotification(true);
        console.log(JSON.stringify(response.error));
        setMessage(
          "Unable to process your signup at this time. Please try later. "
        );
        setType(NotificationType.ERROR);
        setLoader(false);
        setButtonLoader(false);
      }
      setSignUpData({
        email: "",
        password: "",
        country: "",
        status: "sent",
        name: "",
      });
    } else {
      setSignUpData((current) => ({ ...current, status: "failure" }));
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            ...style,
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 1,
            boxShadow: 24,
            overflowY: { xs: "auto", md: "visible" },
            overflowX: "hidden",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ padding: 4, width: "100%", height: "100%" }}
          >
            {!showSignUpUI && (
              <>
                <Grid size={{ xs: 12, md: 5, lg: 5 }} sx={{ height: "100%" }}>
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      <ApartmentIcon sx={{ display: "flex" }} />
                      BookNest
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "#60442D", fontWeight: "bolder" }}
                      gutterBottom
                    >
                      Please sign in.
                    </Typography>
                    <form onSubmit={handleLoginSubmit} id="email-pass-form">
                      <Stack spacing={2} sx={{ mt: 1 }}>
                        <FormControl fullWidth>
                          <Typography variant="h6">Email</Typography>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            required
                            value={data.email}
                            onChange={handleChange("email")}
                            error={data.status === "failure"}
                            disabled={data.status === "loading"}
                            sx={{
                              "&:after": { borderBottomColor: "#60442D" },
                              "&:before": {
                                borderBottomColor: "rgba(0,0,0,0.12)",
                              },
                              "&:hover:not(.Mui-disabled):before": {
                                borderBottomColor: "#60442D",
                              },
                            }}
                          />
                        </FormControl>

                        <FormControl fullWidth>
                          <Typography variant="h6">Password</Typography>
                          <Input
                            type="password"
                            placeholder="Password (min 12 chars)"
                            startAdornment={
                              <InputAdornment position="start">
                                <Key />
                              </InputAdornment>
                            }
                            value={data.password}
                            onChange={handleChange("password")}
                            error={data.status === "failure"}
                            disabled={data.status === "loading"}
                            sx={{
                              "&:after": { borderBottomColor: "#60442D" },
                              "&:before": {
                                borderBottomColor: "rgba(0,0,0,0.12)",
                              },
                              "&:hover:not(.Mui-disabled):before": {
                                borderBottomColor: "#60442D",
                              },
                            }}
                          />
                        </FormControl>

                        <FormControlLabel
                          label="Remember Me"
                          labelPlacement="start"
                          control={
                            <Checkbox
                              defaultChecked
                              sx={{
                                color: "#60442D",
                                "&.Mui-checked": { color: "#60442D" },
                              }}
                            />
                          }
                        />

                        <Button
                          type="submit"
                          color="primary"
                          disabled={data.status === "loading"}
                          sx={{
                            backgroundColor: "#60442D",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {buttonLoader ? <CircularProgress disableShrink size={20} sx={{ color: '#ffffff' }}/> : "Sign In"}
                        </Button>

                        {data.status === "failure" && (
                          <FormHelperText>
                            Oops! Invalid email or password too short (min{" "}
                            {minLength} chars).
                          </FormHelperText>
                        )}
                        {data.status === "sent" && (
                          <FormHelperText>You are all set!</FormHelperText>
                        )}
                      </Stack>
                    </form>

                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                        Need help with your password?
                      </Typography>
                      <Link
                        underline="hover"
                        href="#"
                        sx={{ color: "#60442D", fontWeight: "bold" }}
                      >
                        Reset it
                      </Link>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 1, lg: 1 }}>
                  <Divider
                    orientation="horizontal"
                    sx={{ display: { xs: "block", md: "none" } }}
                  />
                  <Divider
                    orientation="vertical"
                    sx={{ display: { xs: "none", md: "block", lg: "block" } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ padding: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      marginTop: { xs: 1, md: "100px", lg: "100px" },
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ color: "#60442D", fontWeight: "bolder" }}
                    >
                      Don't have an account yet?
                    </Typography>
                    <Typography variant="h5">
                      Discover exceptional stays tailored to you, with exclusive
                      perks that make every trip more memorable and rewarding.
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "100%",
                        border: "2px solid #60442D",
                        color: "#60442D",
                        "&:hover": {
                          borderColor: "#60442D",
                          backgroundColor: "rgba(96, 68, 45, 0.04)",
                        },
                        fontWeight: "bolder",
                        mt: 2,
                      }}
                      onClick={() => setShowSignUpUI(true)}
                    >
                      Join Now
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
            {showSignUpUI && (
              <>
                <Grid size={{ xs: 12, md: 6, lg: 6 }}>
                  <Box>
                    <Typography variant="h3" gutterBottom>
                      <ApartmentIcon sx={{ display: "flex" }} />
                      BookNest
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ color: "#60442D", fontWeight: "bolder" }}
                      gutterBottom
                    >
                      Begin your beautiful journey of stay!
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 6 }} sx={{ padding: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      alignItems: "center",
                      width: "100%",
                      alignContent: "center",
                    }}
                  >
                    <form onSubmit={handleSignUpSubmit} id="email-pass-form">
                      <Stack spacing={2} sx={{ mt: 1 }}>
                        <FormControl sx={{ width: "100%" }}>
                          <Input
                            placeholder="Your Name"
                            type="name"
                            required
                            value={signUpData.name}
                            onChange={handleSignUpChange("name")}
                            error={signUpData.status === "failure"}
                            disabled={signUpData.status === "loading"}
                            sx={{
                              "&:after": { borderBottomColor: "#60442D" },
                              "&:before": {
                                borderBottomColor: "rgba(0,0,0,0.12)",
                              },
                              "&:hover:not(.Mui-disabled):before": {
                                borderBottomColor: "#60442D",
                              },
                            }}
                          />
                        </FormControl>
                        <FormControl sx={{ width: "100%" }}>
                          <Input
                            placeholder="your@email.com"
                            type="email"
                            required
                            value={signUpData.email}
                            onChange={handleSignUpChange("email")}
                            error={signUpData.status === "failure"}
                            disabled={signUpData.status === "loading"}
                            sx={{
                              "&:after": { borderBottomColor: "#60442D" },
                              "&:before": {
                                borderBottomColor: "rgba(0,0,0,0.12)",
                              },
                              "&:hover:not(.Mui-disabled):before": {
                                borderBottomColor: "#60442D",
                              },
                            }}
                          />
                        </FormControl>
                      </Stack>
                      <Stack spacing={2} sx={{ mt: 1 }}>
                        <CountrySelect />
                        <FormControl sx={{ width: "100%" }}>
                          <Stack
                            spacing={0.5}
                            sx={{
                              "--hue": Math.min(
                                signUpData.password.length * 10,
                                120
                              ),
                            }}
                          >
                            <Input
                              type="password"
                              placeholder="Password (min 12 chars)"
                              startAdornment={
                                <InputAdornment position="start">
                                  <Key />
                                </InputAdornment>
                              }
                              value={signUpData.password}
                              onChange={handleSignUpChange("password")}
                              error={signUpData.status === "failure"}
                              disabled={signUpData.status === "loading"}
                              sx={{
                                "&:after": { borderBottomColor: "#60442D" },
                                "&:before": {
                                  borderBottomColor: "rgba(0,0,0,0.12)",
                                },
                                "&:hover:not(.Mui-disabled):before": {
                                  borderBottomColor: "#60442D",
                                },
                              }}
                            />
                            {signUpData.password.length > 0 && (
                              <>
                                <LinearProgress
                                  variant="determinate"
                                  value={Math.min(
                                    (signUpData.password.length * 100) /
                                      minLength,
                                    100
                                  )}
                                  sx={{
                                    bgcolor: "background.level3",
                                    "& .MuiLinearProgress-bar": {
                                      backgroundColor:
                                        signUpData.password.length <= 4
                                          ? "#f44336"
                                          : signUpData.password.length <= 8
                                          ? "#ffeb3b"
                                          : "#4caf50",
                                    },
                                  }}
                                />
                                <Typography
                                  sx={{
                                    alignSelf: "flex-end",
                                    color: "hsl(var(--hue) 80% 30%)",
                                  }}
                                >
                                  {signUpData.password.length === 0
                                    ? ""
                                    : signUpData.password.length <= 4
                                    ? "Weak"
                                    : signUpData.password.length <= 8
                                    ? "Medium"
                                    : "Strong"}
                                </Typography>
                              </>
                            )}
                            <FormControlLabel
                              label="Remember Me"
                              labelPlacement="start"
                              control={
                                <Checkbox
                                  defaultChecked
                                  sx={{
                                    color: "#60442D",
                                    "&.Mui-checked": { color: "#60442D" },
                                  }}
                                />
                              }
                            />
                          </Stack>
                        </FormControl>
                        <Button
                          type="submit"
                          color="primary"
                          loading={signUpData.status === "loading"}
                          sx={{
                            backgroundColor: "#60442D",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          {buttonLoader ? <CircularProgress disableShrink size={20} sx={{ color: '#ffffff' }}/> : "Sign Up"}
                        </Button>
                        {signUpData.status === "failure" && (
                          <FormHelperText>
                            Oops! Invalid email or password too short (min{" "}
                            {minLength} chars).
                          </FormHelperText>
                        )}
                        {signUpData.status === "sent" && (
                          <FormHelperText>You are all set!</FormHelperText>
                        )}
                      </Stack>
                    </form>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
