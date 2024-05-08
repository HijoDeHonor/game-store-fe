import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Inventory from "./pages/Invetory/Inventory.jsx";
import OfferMaker from "./pages/OfferCreate/OfferMaker.jsx";


const App = () => {
  return (
    <React.StrictMode>
      <Inventory />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
