import React from "react";

const SearchBar = ({ setQuery }) => {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        className="search-input"
        id="search-input"
        type="text"
        placeholder="Search..."
        autoComplete="off"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;