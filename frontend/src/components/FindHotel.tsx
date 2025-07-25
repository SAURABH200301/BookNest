import classes from "./FindHotel.module.css";
import HotelSearchForm from "./HotelSearchForm";
import ShowSearchResult from "./ShowSearchResults";
import { useHotelPagination } from "./Context/SearchHotelPaginationContext";
import { Box, Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export default function FindHotel() {
  const { loadMore, setPagination } = useHotelPagination();

  const changePagination = () => {
    setPagination((prev) => ({
      startIndex: prev.startIndex + 11,
      endIndex: prev.endIndex + 10,
    }));
  };

  return (
    <>
      <div className={classes.main}>
        <HotelSearchForm />
      </div>
      <ShowSearchResult />
      {loadMore && (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Button onClick={changePagination} variant="text" sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Box
              sx={{
                display: "inline-flex",
                animation: "bounce 1.2s infinite",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(8px)" },
                },
              }}
            >
              <KeyboardDoubleArrowDownIcon fontSize="large" />
            </Box>
          </Button>
        </Box>
      )}
    </>
  );
}
