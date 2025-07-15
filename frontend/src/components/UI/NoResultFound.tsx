import { Box, Typography } from "@mui/material";
import noResultFound from "../assests/no-results.png"

export default function NoResultFound() {
  return (
    <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 350,
              width: 350,
              maxHeight: { xs: 350, md: 250 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="No Result Found"
            src={noResultFound}
          />
          <Typography> No Result Found</Typography>
        </Box>
    </>
  );
}
