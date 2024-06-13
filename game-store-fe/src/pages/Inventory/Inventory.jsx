// settings
import React, { useState, useEffect } from "react";

// components
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "./components/ToggleBtn";
import LoadingSpinner from "../../components/Spinner";
import ItemList from "../../components/ItemList/Itemlist";
// fake database
import { getAllItems, getUserItems } from "../../services/itemService";
//styles
import "./Inventory.css";
import { MOD, RECICLER_OFF, RECICLER_ON } from "../../utils/constants";

const Inventory = () => {
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [key, setKey] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const data = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(toggle ? getAllItems() : getUserItems());
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

  const toggleButton = () => {
    if (isLoading) {
      return null;
    }
    setToggle((prevToggle) => !prevToggle);
    setKey(key + 1);
  };

  return (
    <div className="inventory-container">
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
    </div>
  );
};

export default Inventory;
