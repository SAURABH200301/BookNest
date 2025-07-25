import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { LoaderProvider } from "./components/Context/LoaderContext";
import HotelDetailPage from "./components/HotelDetails/HotelDetailPage";
import { SearchFormDataProvider } from "./components/Context/SearchFormContext";
import { NotificationProvider } from "./components/Context/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <NotificationProvider>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/:id"
              element={
                <SearchFormDataProvider>
                  <HotelDetailPage />
                </SearchFormDataProvider>
              }
            />
          </Routes>
        </NotificationProvider>
      </LoaderProvider>
    </BrowserRouter>
  );
}

export default App;
