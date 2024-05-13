import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Inventory from "./pages/Invetory/Inventory.jsx";
import OfferMaker2 from "./pages/offerMaker/OfferMaker2.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <OfferMaker2 />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
