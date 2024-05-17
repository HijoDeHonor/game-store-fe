import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OfferMaker from "./pages/offerMaker/OfferMaker.jsx";
import ReOfferMaker from "./pages/offerMaker/ReOfferMaker.jsx";
import Inventory from "./pages/Invetory/Inventory.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <ReOfferMaker />
      <Inventory />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
