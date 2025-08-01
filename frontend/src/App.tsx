import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { LoaderProvider } from "./components/Context/LoaderContext";
import HotelDetailPage from "./components/HotelDetails/HotelDetailPage";
import { SearchFormDataProvider } from "./components/Context/SearchFormContext";
import { NotificationProvider } from "./components/Context/NotificationContext";
import { AuthProvider } from "./components/Context/AuthContext";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import FavoritePage from "./components/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <NotificationProvider>
          <AuthProvider>
            <SearchFormDataProvider>
            <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
              <Navbar />
            </Box>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/:id"
                element={
                    <HotelDetailPage />
                }
              />
              <Route path="/favorites" element={<FavoritePage/>}/>
            </Routes>
            </SearchFormDataProvider>
          </AuthProvider>
        </NotificationProvider>
      </LoaderProvider>
    </BrowserRouter>
  );
}

export default App;
