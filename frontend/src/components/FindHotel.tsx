import classes from "./FindHotel.module.css";
import HotelSearchForm from "./HotelSearchForm";
import ShowSearchResult from "./ShowSearchResults";
import { useHotelPagination } from "../helpers/SearchHotelPaginationContext";
import { Box, Button } from "@mui/material";

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
        <div>
          <h1>Save up to 55% on your next hotel stay</h1>
          <p>We compare hotel prices from over 100 sites</p>
        </div>
        <HotelSearchForm />
      </div>
      <ShowSearchResult />
      {loadMore && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={changePagination} variant="text">
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}
