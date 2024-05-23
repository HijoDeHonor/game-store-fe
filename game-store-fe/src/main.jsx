import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import OfferMaker from "./pages/offerMaker/OfferMaker.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <OfferMaker />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
