import React, { useEffect, useState } from "react";
import { useOfferMaker } from "../provider/offerMakerProvider";
import ListSelector from "./ListSelector";

const SelectStage = ({
  listOfitems, // list of items from user or the server
  listKey, // either 'offer' or 'request'
  updateList, //update offer or request
  titleReference,
  btnReference, //  add to offer o add to request
}) => {
  //context
  const { state, dispatch } = useOfferMaker();
  //states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [itemsToFilter, setItemsToFilter] = useState(listOfitems);
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

  // const updateItemsToFilter = (listOfItems) => {
  //   dispatch({
  //     type: SET_USER_ITEMS,
  //     data: itemsToFilter,
  //   });
  // };

  // useEffect(() => {
  //   updateItemsToFilter(itemsToFilter); // reemplaza el dispatch de abajo
  // }, [itemsToFilter]);

  const addAndUpdate = () => {
    // Filter out items with a quantity of 0
    const itemsToAdd = prevItems.filter((item) => item.Quantity !== 0);

    if (itemsToAdd.length > 0) {
      // Map over the existing list and update quantities
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

      // Add new items that were not in the previous list
      const newListOfItems = itemsToAdd.filter(
        (item) => !updatedList.some((listItem) => listItem.Name === item.Name)
      );
      const finalUpdatedList = [...updatedList, ...newListOfItems];

      // Update the list
      updateList(finalUpdatedList);

      // Update items to filter
      setItemsToFilter(
        prevItems.map((itemInPrevList) => {
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

    // Reset all counts
    resetAllCounts();
  };

  const deleteAndUpdate = (item) => {
    updateList(listKey.filter((listItem) => listItem.Name !== item.Name));

    setPrevItems((prevItems) =>
      prevItems.filter((previtem) => previtem.Name !== item.Name)
    );

    setItemsToFilter(
      itemsToFilter.map((itemToFilter) =>
        itemToFilter.Name === item.Name
          ? {
              ...itemToFilter,
              Quantity: itemToFilter.Quantity + item.Quantity,
              maxQuantity:
                itemToFilter.maxQuantity !== undefined
                  ? item.maxQuantity
                  : undefined,
            }
          : userItem
      )
    );
  };

  // check //
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

  // check //
  const resetAllCounts = () => {
    filteredData.forEach((item) => {
      onChangeQuantity(item, 0);
    });
    setPrevItems([]);
    setShouldReset(true);
  };

  return (
    <ListSelector
      titleReference={titleReference} //titulo de
      btnReference={btnReference} //add to offer o request
      data={filteredData}
      setSearchQuery={setSearchQuery}
      selectedItems={listKey} //offer o request
      addToList={addAndUpdate}
      deleteAndUpdate={deleteAndUpdate}
      resetAllCounts={resetAllCounts}
      onChangeQuantity={onChangeQuantity}
      shouldReset={shouldReset}
      setShouldReset={setShouldReset}
    />
  );
};

export default SelectStage;
