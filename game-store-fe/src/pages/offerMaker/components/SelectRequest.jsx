import React, { useEffect, useState } from "react";
import { useOfferMaker } from "../provider/offerMakerProvider";
import {
  ADD_TO_REQUEST,
  BACK,
  ITEMS_TO_REQUEST,
  NEXT,
  RESET_ALL,
  SET_CURRENT_STAGE,
  SET_REQUEST,
  SET_SERVER_ITEMS,
} from "../../../utils/textConstants";
import { getAllItems } from "../../../services/GetAllItems";
import SearchBar from "../../../components/SearchBar";
import FilterContent from "./FilterContent";
import OfferList from "./OfferList";

const SelectRequest = () => {
  const { state, dispatch } = useOfferMaker();

  const { serverItems, currentStage, request } = state;

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevItems, setPrevItems] = useState([]);

  const fetchItems = async () => {
    try {
      const serverItems = await getAllItems();
      dispatch({
        type: SET_SERVER_ITEMS,
        data: serverItems,
      });
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const filterData = () => {
    const filteredData = serverItems.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(
      filteredData.map((item) => ({
        ...item,
        Quantity: 0,
      }))
    );
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, currentStage, prevItems, serverItems]);

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

  const addToRequest = () => {
    const itemsToAdd = prevItems.filter((item) => item.Quantity !== 0);
    if (itemsToAdd.length > 0) {
      const updatedRequest = state.request.map((requestItem) => {
        const sameItem = itemsToAdd.find(
          (item) => item.Name === requestItem.Name
        );
        if (sameItem) {
          return {
            ...requestItem,
            Quantity: requestItem.Quantity + sameItem.Quantity,
          };
        } else {
          return requestItem;
        }
      });
      const newRequestItems = itemsToAdd.filter(
        (item) =>
          !updatedRequest.some((requestItem) => requestItem.Name === item.Name)
      );
      const updateRequestWithNewItems = [...updatedRequest, ...newRequestItems];
      dispatch({
        type: SET_REQUEST,
        data: updateRequestWithNewItems,
      });
    } else {
      alert("there is no items selected");
    }
    setPrevItems([]);
  };

  const deleteFromRequest = (item) => {
    dispatch({
      type: SET_REQUEST,
      data: state.request.filter(
        (requestitem) => requestitem.Name !== item.Name
      ),
    });
    setPrevItems((prevItems) =>
      prevItems.filter((previtem) => previtem.Name !== item.Name)
    );
  };

  const resetAllCounts = () => {
    filteredData.forEach((item) => {
      onQuantityChange(item, 0);
    });
    setPrevItems([]);
    setShouldReset(true);
  };

  const nextStage = () => {
    if (currentStage !== 2) {
      dispatch({
        type: SET_CURRENT_STAGE,
        data: currentStage + 1,
      });
    }
  };

  const backStage = () => {
    if (currentStage !== 0) {
      const newStage = currentStage - 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    }
  };

  return (
    <div className="om">
      <h3>{ITEMS_TO_REQUEST}</h3>
      <div>
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      <div className="FilterContent">
        <FilterContent
          data={filteredData}
          onQuantityChange={onQuantityChange}
        />
      </div>
      <div className="add-and-rest-Lists">
        <button className="add-btn" onClick={resetAllCounts}>
          {RESET_ALL}
        </button>
        <button className="add-btn-request" onClick={addToRequest}>
          {ADD_TO_REQUEST}
        </button>
      </div>
      <div className="om-body">
        <OfferList
          items={request}
          deleteAdd={deleteFromRequest}
          recicler={true}
        />
      </div>
      <div className="stage2">
        <button className="stage-btn" onClick={backStage}>
          {BACK}
        </button>
        <button className="stage-btn" onClick={nextStage}>
          {NEXT}
        </button>
      </div>
    </div>
  );
};

export default SelectRequest;
