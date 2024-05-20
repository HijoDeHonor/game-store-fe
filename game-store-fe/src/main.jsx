import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReOfferMaker from "./pages/offerMaker/ReOfferMaker.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <ReOfferMaker />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
