import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import FilterList from "./FilterList";
import SelectedList from "./SelectedList";
import { ADD } from "../../../utils/textConstants";
import resetIcon from "../../../assets/resetIcon.png";

const ListSelector = ({
  listOfItems, // list of items from user or the server
  listKey, // either 'offer' or 'request'
  updateList, //update offer or request
  titleReference,
}) => {
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [itemsToFilter, setItemsToFilter] = useState(listOfItems);
  const [prevItems, setPrevItems] = useState([]);
  const [shouldReset, setShouldReset] = useState(false);

  const filterData = () => {
    const filteredData = itemsToFilter.filter(
      (item) =>
        (item.maxQuantity === undefined || item.maxQuantity !== 0) &&
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };
  useEffect(() => {
    filterData();
  }, [searchQuery, itemsToFilter]);

  const addAndUpdate = () => {
    const itemsToAdd = prevItems.filter((item) => item.Quantity !== 0);

    if (itemsToAdd.length > 0) {
      const updatedList = listKey.map((prevListItem) => {
        const sameItem = itemsToAdd.find(
          (item) => item.Name === prevListItem.Name
        );
        if (sameItem) {
          return {
            ...prevListItem,
            Quantity: prevListItem.Quantity + sameItem.Quantity,
          };
        } else {
          return prevListItem;
        }
      });
      const newListOfItems = itemsToAdd.filter(
        (item) => !updatedList.some((listItem) => listItem.Name === item.Name)
      );
      const finalUpdatedList = [...updatedList, ...newListOfItems];

      updateList(finalUpdatedList);

      setItemsToFilter(
        itemsToFilter.map((itemInPrevList) => {
          const sameItem = itemsToAdd.find(
            (item) => item.Name === itemInPrevList.Name
          );
          if (sameItem) {
            return {
              ...itemInPrevList,
              Quantity: itemInPrevList.Quantity - sameItem.Quantity,
              maxQuantity: itemInPrevList.maxQuantity - sameItem.Quantity,
            };
          } else {
            return itemInPrevList;
          }
        })
      );
    } else {
      alert("There are no items selected.");
    }
    resetAllCounts();
  };

  const deleteAndUpdate = (item) => {
    updateList(listKey.filter((listItem) => listItem.Name !== item.Name));
    setPrevItems((prevItems) =>
      prevItems.filter((prevItem) => prevItem.Name !== item.Name)
    );
    const exist = itemsToFilter.some((i) => i.Name === item.Name);
    if (exist) {
      setItemsToFilter((itemsToFilter) =>
        itemsToFilter.map((itemToFilter) =>
          itemToFilter.Name === item.Name
            ? {
                ...itemToFilter,
                Quantity: 0,
                maxQuantity:
                  itemToFilter.maxQuantity !== undefined
                    ? itemToFilter.Quantity + item.maxQuantity
                    : undefined,
              }
            : itemToFilter
        )
      );
    } else {
      setItemsToFilter((prevItemsToFilter) => [...prevItemsToFilter, item]);
    }
  };

  const onChangeQuantity = (item, newQuantity) => {
    const existInPrevItems = prevItems.some(
      (prevItem) => prevItem.Name === item.Name
    );
    if (existInPrevItems) {
      setPrevItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.Name === item.Name
            ? { ...prevItem, Quantity: newQuantity }
            : prevItem
        )
      );
    } else {
      setPrevItems((prevItems) => [
        ...prevItems,
        { ...item, Quantity: newQuantity },
      ]);
    }
    const existInFilteredData = filteredData.some(
      (filteredItem) => filteredItem.Name === item.Name
    );
    if (existInFilteredData) {
      setFilteredData((prevFilteredData) =>
        prevFilteredData.map((filteredItem) =>
          filteredItem.Name === item.Name
            ? { ...filteredItem, Quantity: newQuantity }
            : filteredItem
        )
      );
    }
    setItemsToFilter((prevFilteredData) =>
      prevFilteredData.map((filteredItem) =>
        filteredItem.Name === item.Name
          ? { ...filteredItem, Quantity: newQuantity }
          : filteredItem
      )
    );
  };

  const resetAllCounts = () => {
    filteredData.forEach((item) => {
      onChangeQuantity(item, 0);
    });
    setPrevItems([]);
    setShouldReset(true);
  };

  const deleteAllCounts = () => {
    let clonelist = JSON.parse(JSON.stringify(listKey));
    clonelist.forEach((item) => {
      deleteAndUpdate(item);
    });
    setPrevItems([]);
    updateList([]);
  };

  return (
    <div className="om">
      <h3>{titleReference}</h3>
      <div className="om-body">
        <div className="select-body">
          <SearchBar setSearchQuery={setSearchQuery} />
          <div className="FilterContent">
            <FilterList
              data={filteredData}
              onChangeQuantity={onChangeQuantity}
              shouldReset={shouldReset}
              setShouldReset={setShouldReset}
            />
          </div>
          <div className="add-and-rest-Lists">
            <button className="reset-all">
              <img src={resetIcon} onClick={resetAllCounts}></img>
            </button>
          </div>
        </div>
        <div className="om-button-add">
          <button className="add-btn-request" onClick={addAndUpdate}>
            {ADD}
          </button>
        </div>
        <div className="om-List">
          <div className="om-List-header"></div>
          <SelectedList
            items={listKey}
            deleteAdd={deleteAndUpdate}
            recicler={true}
          />
          <div className="recicler-all">
            <button className="recicler-all-btn">
              <img
                className="recicler-BIN"
                src="https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png"
                alt="recicler BIN"
                onClick={deleteAllCounts}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListSelector;
