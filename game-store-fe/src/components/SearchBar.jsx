import React, { useState } from "react";
import ItemList from "./Itemlist";

const SearchBar = ({ filterKey, fetchData}) => {
  const [query, setQuery] = useState("");
  let data = fetchData
  ;

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

  const allTheItems = filteredData;

  return (
    <div className="search-bar">
      <div className="search-bar-header">
      <input className="search-input"
        id="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      </div>
      <ItemList allTheItems={allTheItems} />
    </div>
  );
};

export default SearchBar;