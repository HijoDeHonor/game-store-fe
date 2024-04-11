import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./pages/login/Login.jsx";
import MyInventory from "./components/Inventory.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SwitchExample from "./components/ToggleBtn.jsx";
import ToggleButton from "./components/ToggleBtn.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToggleButton on="My items" off="All items" onClick={() => {}} />
  </React.StrictMode>
);
