import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth-page/AuthPage";
import WeatherPage from "./pages/weather-page/WeatherPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="weather" element={<WeatherPage />} />
      </Routes>
    </Router>
  );
};

export default App;
