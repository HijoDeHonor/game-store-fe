import React, { useState } from "react";
import MyInventory from "./Inventory";
import jason from "../services/base-de-datos-fic.json";

const SearchBar = ({ filterKey }) => {
  const [query, setQuery] = useState("");
  const [data] = useState(jason);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  let filteredData;
  if (query.trim() === "") {
    filteredData = data;
  } else {
    filteredData = data.filter((item) =>
      item[filterKey].toLowerCase().includes(query.toLowerCase())
    );
  }

  const todoslositems = filteredData;

  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search: </label>
      <input
        id="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <MyInventory todoslositems={todoslositems} />
    </div>
  );
};

export default SearchBar;
