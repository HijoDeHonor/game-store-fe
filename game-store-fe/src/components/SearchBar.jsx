import React from "react";

const SearchBar = ({ setQuery }) => {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;