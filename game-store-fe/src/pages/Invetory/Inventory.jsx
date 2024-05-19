// settings
import React, { useState, useEffect } from "react";
import {getAllItems}  from "../../services/itemService"
import { MOD, MODNONE,RECICLER_ON, RECICLER_OFF } from "../../utils/constants";
// components
import SearchBar from "../../components/SearchBar";
import ToggleBtn from "./components/ToggleBtn";
import ItemList from "../../components/Itemlist";
import LoadingSpinner from "../../components/Spinner";
// styles
import "./Inventory.css";

const Inventory = () => {
  const [toggle, setToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  let userName = localStorage.getItem("UserName") || "Admin"; // borrar  cuando se ponga en uso la base de datos
  
  const getData = async() => {
    try{
      const data = toggle? getAllItems(): getAllItems(userName);
      setIsLoading(false)
      return data
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [toggle, query]);

  const toggleButton = () => {
    setToggle((prevToggle) => !prevToggle);
    setIsLoading(true)
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
       {isLoading? <LoadingSpinner /> : <ItemList allTheItems={filteredData} mod={MOD} recicler={RECICLER_ON} /> }
      </div>
    </div>
  );
};

export default Inventory;
