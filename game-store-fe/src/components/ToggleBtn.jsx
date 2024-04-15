import React, { useState } from "react";
import SearchBar from "./SearchBar";
import jason from "../services/DB-Server.json";
import jason2 from "../services/DB-User.json";

function ToggleButton({ on, off }) {
  const [isActive, setIsActive] = useState(false);
  const [currentView, setCurrentView] = useState("myItems");
  const [key, setKey] = useState(0);

  const toggleButton = () => {
    setIsActive(!isActive);
    setCurrentView(currentView === "myItems" ? "allItems" : "myItems");
    setKey(prevkey => prevkey + 1);
    console.log(key)
  };

  const handleToggle = () => {
    toggleButton();
  };

  return (
    <div>
      <button
        className="toggle-btn"
        onClick={handleToggle}
        style={{ backgroundColor: isActive ? "green" : "grey" }}
      >
        {isActive ? on : off}
      </button>
      <div>        
      <SearchBar key={key} filterKey={"Name"} fetchData={currentView === "myItems" ? jason : jason2} />     
      </div>
    </div>
  );
}



ToggleButton.defaultProps = {
  on: "Activado",
  off: "Desactivado",
};

export default ToggleButton;