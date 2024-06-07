import React from "react";
import { SEARCH } from "../utils/textConstants";

const SearchBar = ({ setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        id="search-input"
        type="text"
        autoComplete="off"
        placeholder={SEARCH}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
