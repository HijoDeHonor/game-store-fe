// settings
import React, { useState, useEffect } from "react";

// components
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "./components/ToggleBtn";
import ItemList from "../../components/Itemlist";

// styles
import "./Inventory.css";

// services
import GetAllItems from "../../services/GetAllItems";

const Inventory = () => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [key, setKey] = useState(0);

  let userName = localStorage.getItem("UserName") || "Admin"; // borrar  cuando se ponga en uso la base de datos

  useEffect(() => {
    const filterData = /*async*/ () => {
      let DBServerData = /*await*/ GetAllItems();
      let DBUserData = /*await*/ GetAllItems(userName);
      const data = toggle ? DBServerData : DBUserData;
      const filtered = data.filter((item) =>
        item.Name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    };
    filterData();
  }, [toggle, query]);

  const toggleButton = () => {
    setToggle((prevToggle) => !prevToggle);
    setKey(key + 1);
    setQuery("");
  };

  return (
    <div className="container inventory">
      <div className="inventory-header">
        <SearchBar
          key={key}
          filterKey={"Name"}
          setQuery={setQuery}
          placeholder={query}
        />
        <ToggleBtn toggle={toggle} onClick={toggleButton} />
      </div>
      <div className="inventory-body">
        <ItemList allTheItems={filteredData} />
      </div>
    </div>
  );
};

export default Inventory;
