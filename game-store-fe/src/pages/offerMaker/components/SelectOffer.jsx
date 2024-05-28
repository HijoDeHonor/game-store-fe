import React, { useEffect, useState } from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "../provider/offerMakerProvider";
import {
  ADD_TO_OFFER,
  ITEMS_TO_OFFER,
  NEXT,
  RESET_ALL,
  SET_OFFER,
  SET_USER_ITEMS,
} from "../../../utils/textConstants";

import SearchBar from "../../../components/SearchBar";
import FilterContent from "./FilterContent";
import OfferList from "./OfferList";

const SelectOffer = () => {
  const { state, dispatch, nextStage, resetAllCounts } = useOfferMaker();
  const { userItems, currentStage, offer } = state;

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevItems, setPrevItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filterData = () => {
    setIsLoading(true);
    let listToFilter = userItems.filter((item) => item.Quantity !== 0);
    const filteredData = listToFilter.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(
      filteredData.map((item) => ({
        ...item,
        Quantity: 0,
      }))
    );
    setIsLoading(false);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, currentStage, prevItems]);
  useEffect(() => {
    console.log(prevItems, "prevItems");
  }, [prevItems]);

  const onQuantityChange = (item, newQuantity) => {
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
  };

  const addToOfferAndUpdate = () => {
    const itemsToAdd = prevItems.filter((item) => item.Quantity !== 0);
    if (itemsToAdd.length > 0) {
      const updatedOffer = state.offer.map((offerItem) => {
        const sameItem = itemsToAdd.find(
          (item) => item.Name === offerItem.Name
        );
        if (sameItem) {
          return {
            ...offerItem,
            Quantity: offerItem.Quantity + sameItem.Quantity,
          };
        } else {
          return offerItem;
        }
      });
      const newOfferItems = itemsToAdd.filter(
        (item) =>
          !updatedOffer.some((offerItem) => offerItem.Name === item.Name)
      );
      const updateOfferWithNewItems = [...updatedOffer, ...newOfferItems];
      dispatch({
        type: SET_OFFER,
        data: updateOfferWithNewItems,
      });
      dispatch({
        type: SET_USER_ITEMS,
        data: state.userItems.map((userItem) => {
          const sameItems = itemsToAdd.find(
            (item) => item.Name === userItem.Name
          );
          if (sameItems) {
            return {
              ...userItem,
              Quantity: userItem.Quantity - sameItems.Quantity,
              maxQuantity: userItem.maxQuantity - sameItems.Quantity,
            };
          } else {
            return userItem;
          }
        }),
      });
    } else {
      alert("there is no items selected");
    }
    setPrevItems([]);
  };

  const deleteAndUpdate = (item) => {
    dispatch({
      type: SET_OFFER,
      data: state.offer.filter((offeritem) => offeritem.Name !== item.Name),
    });

    setPrevItems((prevItems) =>
      prevItems.filter((previtem) => previtem.Name !== item.Name)
    );
    dispatch({
      type: SET_USER_ITEMS,
      data: state.userItems.map((userItem) =>
        userItem.Name === item.Name
          ? { ...userItem, Quantity: userItem.Quantity + item.Quantity }
          : userItem
      ),
    });
  };

  return (
    <OfferMakerProvider>
      <div className="om">
        <h3>{ITEMS_TO_OFFER}</h3>
        <div>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="FilterContent">
          {isLoading ? null : (
            <FilterContent
              data={filteredData}
              onQuantityChange={onQuantityChange}
            />
          )}
        </div>
        <div className="add-and-rest-Lists">
          <button className="add-btn" onClick={resetAllCounts}>
            {RESET_ALL}
          </button>
          <button className="add-btn" onClick={addToOfferAndUpdate}>
            {ADD_TO_OFFER}
          </button>
        </div>
        <div className="om-body">
          <OfferList
            items={offer}
            deleteAdd={deleteAndUpdate}
            recicler={true}
          />
        </div>
        <div>
          <button onClick={nextStage}>{NEXT}</button>
        </div>
      </div>
    </OfferMakerProvider>
  );
};

export default SelectOffer;
