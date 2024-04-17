import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ToggleButton from "./components/ToggleBtn.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  return (
    <React.StrictMode>
      <ToggleButton on="My items" off="All items" />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
