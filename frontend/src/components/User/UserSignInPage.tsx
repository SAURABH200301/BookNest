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
import { useEffect, useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";

export interface SignInPageProps {
  openModal: boolean;
  onClose: (value: boolean) => void;
}

export default function UserSignInPage(prop: SignInPageProps) {
  const [open, setOpen] = useState(false);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: "loading" }));
    setTimeout(() => {
      // Here, you might want to add more realistic validation (email format, password length, etc.)
      if (
        data.email.trim() &&
        data.email.includes("@") &&
        data.password.length >= minLength
      ) {
        setData({ email: "", password: "", status: "sent" });
      } else {
        setData((current) => ({ ...current, status: "failure" }));
      }
    }, 1200);
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
          <Grid container spacing={2} sx={{ padding: 4, width: "100%" }}>
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
                <form onSubmit={handleSubmit} id="email-pass-form">
                  <FormControl sx={{ width: "100%" }}>
                    <Stack spacing={2} sx={{ mt: 1 }}>
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
                          "&:before": { borderBottomColor: "rgba(0,0,0,0.12)" },
                          "&:hover:not(.Mui-disabled):before": {
                            borderBottomColor: "#60442D",
                          },
                        }}
                      />
                      <Stack
                        spacing={0.5}
                        sx={{
                          "--hue": Math.min(data.password.length * 10, 120),
                        }}
                      >
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
                        {data.password.length > 0 && (
                          <>
                            <LinearProgress
                              variant="determinate"
                              value={Math.min(
                                (data.password.length * 100) / minLength,
                                100
                              )}
                              sx={{
                                bgcolor: "background.level3",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor:
                                    data.password.length <= 4
                                      ? "#f44336"
                                      : data.password.length <= 8
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
                              {data.password.length === 0
                                ? ""
                                : data.password.length <= 4
                                ? "Weak"
                                : data.password.length <= 8
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
                      <Button
                        type="submit"
                        color="primary"
                        loading={data.status === "loading"}
                        sx={{
                          backgroundColor: "#60442D",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        Sign Up
                      </Button>
                    </Stack>
                    {data.status === "failure" && (
                      <FormHelperText>
                        Oops! Invalid email or password too short (min{" "}
                        {minLength} chars).
                      </FormHelperText>
                    )}
                    {data.status === "sent" && (
                      <FormHelperText>You are all set!</FormHelperText>
                    )}
                  </FormControl>
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
                      mt:2
                    }}
                  >
                    Join Now
                  </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
