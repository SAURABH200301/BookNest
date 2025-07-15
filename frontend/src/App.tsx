import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { LoaderProvider } from "./components/UI/LoaderContext";
import HotelDetailPage from "./components/HotelDetailPage";

function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<HotelDetailPage />} />
        </Routes>
      </LoaderProvider>
    </BrowserRouter>
  );
}

export default App;
