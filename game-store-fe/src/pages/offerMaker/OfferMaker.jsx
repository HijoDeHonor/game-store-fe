import React, { useState, useEffect } from "react";
import { getAllItems, getUserItems } from "../../services/GetAllItems";
import { Stage1, Stage2, FinalStage } from "./components/stages";
import "./offerMaker.css";

const OfferMaker = () => {
  const [userItems, setUserItems] = useState([]);
  const [serverItems, setServerItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [offer, setOffer] = useState([]);
  const [request, setRequest] = useState([]);
  const [currentStage, setCurrentStage] = useState(0);

  const filterData = () => {
    let data = currentStage === 0 ? userItems : serverItems;
  
    if (searchQuery.trim() !== "") {
      data = data.filter((item) =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (currentStage === 0) {
      data = data.filter((item) => item.Quantity !== 0);
    }
    setFilteredData(data);
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, currentStage, userItems]);

  const fetchItems = async () => {
    try {
      const userItems = await getUserItems();
      const serverItems = await getAllItems();
      setUserItems(
        userItems.map((item) => ({ ...item, maxQuantity: item.Quantity }))
      );
      setServerItems(serverItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [currentStage]);

  const addAndUpdate = (item, newQuantity) => {
    const exist = offer.some((offerItem) => offerItem.Name === item.Name);
    if (!exist) {
      setOffer((prevOffer) => [
        ...prevOffer,
        { ...item, Quantity: newQuantity },
      ]);
      setUserItems((prevUserItems) =>
        prevUserItems.map((userItem) =>
          userItem.Name === item.Name
            ? { ...userItem, Quantity: userItem.Quantity - item.Quantity }
            : userItem
        )
      );
    }
  };

  const deleteAndUpdate = (item) => {
    setOffer((prevOffer) =>
      prevOffer.filter((offerItem) => offerItem.Name !== item.Name)
    );
    setUserItems((prevUserItems) =>
      prevUserItems.map((userItem) =>
        userItem.Name === item.Name
          ? { ...userItem, Quantity: userItem.Quantity + item.Quantity }
          : userItem
      )
    );
  };

  const addToRequest = (item, newQuantity) => {
    const exist = request.some((requestItem) => requestItem.Name === item.Name);
    if (!exist) {
      setRequest((prevRequest) => [
        ...prevRequest,
        { ...item, Quantity: newQuantity },
      ]);
    }
  };

  const deleteItemFromRequest = (item) => {
    setRequest((prevRequest) =>
      prevRequest.filter((requestItem) => requestItem.Name !== item.Name)
    );
  };

  const reset = () => {
    setCurrentStage(0);
    setSearchQuery("");
    setServerItems([]);
    setUserItems([]);
  };
  const confirmCreateOffer = () => {
    alert("genio de la vida ya tenes creada tu oferta papa");
    reset();
  };

  switch (currentStage) {
    case 0:
      return (
        <Stage1
          filteredData={filteredData}
          setSearchQuery={setSearchQuery}
          offer={offer}
          setCurrentStage={setCurrentStage}
          addAndUpdate={addAndUpdate}
          deleteAndUpdate={deleteAndUpdate}
          //onQuantityChange={onQuantityChange}
        />
      );
    case 1:
      return (
        <Stage2
          setSearchQuery={setSearchQuery}
          filteredData={filteredData}
          request={request}
          setCurrentStage={setCurrentStage}
          addToRequest={addToRequest}
          //onQuantityChange={onQuantityChange}
          deleteItemFromRequest={deleteItemFromRequest}
        />
      );
    case 2:
      return (
        <FinalStage
          offer={offer}
          request={request}
          setCurrentStage={setCurrentStage}
          confirmCreateOffer={confirmCreateOffer}
        />
      );
    default:
      return null;
  }
};

export default OfferMaker;
