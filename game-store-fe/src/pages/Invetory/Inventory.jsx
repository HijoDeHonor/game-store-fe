//settings
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "./components/ToggleBtn";
import ItemList from "../../components/Itemlist";
// fake database
import DBServerData from "../../utils/DB-Server.json";
import DBUserData from "../../utils/DB-User.json";
//styles
import "./Inventory.css";
import {MOD, MOD_NONE, RECICLER_OFF, RECICLER_ON} from "../../utils/constants"

const Inventory = () => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const filterData = () => {
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
        <ItemList allTheItems={filteredData} modal={MOD} recicler={ toggle? RECICLER_ON : RECICLER_OFF }/>
      </div>
    </div>
  );
};

export default Inventory;
