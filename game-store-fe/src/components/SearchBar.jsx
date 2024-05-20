import React from "react";

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
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
