//settings
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "./components/ToggleBtn";
import ItemList from "../../components/Itemlist";
import LoadingSpinner from "../../components/Spinner";
// fake database
import { getAllItems, getUserItems } from "../../services/GetAllItems";
//styles
import "./Inventory.css";
import { MOD, RECICLER_OFF, RECICLER_ON } from "../../utils/constants";

const Inventory = () => {
  const userName = localStorage.getItem("userName") || "guest";

  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(toggle ? getAllItems(): getUserItems());
      }, 1000);
    });
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    setIsLoading(true);
  }, [toggle]);

  useEffect(() => {
    filterData();
  }, [toggle, searchQuery, isLoading]);

  const filterData = () => {
    const filtered = data.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const resetSearch = () => {
    setSearchQuery("");
    document.getElementById("search-input").value = "";
  };

  const toggleButton = () => {
    if (isLoading) {
      return null;
    }
    setToggle((prevToggle) => !prevToggle);
    setKey(key + 1);
    resetSearch();
  };

  return (
    <div className="container inventory">
      <div className="inventory-header">
        <SearchBar
          key={key}
          filterKey={"Name"}
          setSearchQuery={setSearchQuery}
          placeholder={searchQuery}
        />
        <ToggleBtn toggle={toggle} onClick={toggleButton} />
      </div>
      <div className="inventory-body">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ItemList
            allTheItems={filteredData}
            modal={MOD}
            recicler={toggle ? RECICLER_OFF : RECICLER_ON}
          />
        )}
      </div>
    </div>
  );
};

export default Inventory;
