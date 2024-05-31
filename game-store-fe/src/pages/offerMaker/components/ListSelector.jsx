import React from "react";
import { RESET_ALL } from "../../../utils/textConstants";
import SearchBar from "../../../components/SearchBar";
import FilterList from "./FilterList";
import SelectedList from "./SelectedList";

const ListSelector = ({
  titleReference,
  btnReference,
  data,
  setSearchQuery,
  selectedItems,
  addToList,
  deleteFromList,
  resetAllCounts,
  onChangeQuantity,
  setShouldReset,
  shouldReset,
}) => {
  return (
    <>
      <div className="om">
        <h3>{titleReference}</h3>
        <div>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="FilterContent">
          <FilterList
            data={data}
            onChangeQuantity={onChangeQuantity}
            shouldReset={shouldReset}
            setShouldReset={setShouldReset}
          />
        </div>
        <div className="add-and-rest-Lists">
          <button className="add-btn" onClick={resetAllCounts}>
            {RESET_ALL}
          </button>
          <button className="add-btn-request" onClick={addToList}>
            {btnReference}
          </button>
        </div>
        <div className="om-body">
          <SelectedList
            items={selectedItems}
            deleteAdd={deleteFromList}
            recicler={true}
          />
        </div>
      </div>
    </>
  );
};

export default ListSelector;
