import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import OpenWeather from "./components/search/OpenWeather.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <OpenWeather /> */}
  </React.StrictMode>
);
