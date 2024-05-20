import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import OfferList from "./components/OfferList";
import StageButtons from "./components/StageButtons";
import FilterContent from "./components/FilterContent";
import GetAllItems from "../../services/GetAllItems";
import { MOD_NONE, RECICLER_OFF, RECICLER_ON } from "../../utils/constants";

import "./offerMaker.css";

const ReOfferMaker = () => {
  const userName = localStorage.getItem("UserName") || "Guest";

  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stage, setStage] = useState(0);
  const [prevItem, setPrevItem] = useState([]);
  const [preOffer, setPreOffer] = useState([]);
  const [offer, setOffer] = useState([]);
  const [preRequest, setPreRequest] = useState([]);
  const [request, setRequest] = useState([]);

  const finalOffer = {
    Offer: offer,
    Request: request,
    UserNamePoster: userName,
  };

  // Effects
  useEffect(() => {
    const fetchData = async () => {
      const data =
        stage === 0 ? await GetAllItems(userName) : await GetAllItems();
      setPrevItem(
        data.map((item) => ({
          ...item,
          Quantity: 0,
          ...(stage === 0 && { maxQuantity: item.Quantity }),
        }))
      );
    };

    fetchData();
  }, [stage]);

  const filterData = () => {
    const data = prevItem;
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length === 0) {
        setFilteredData([]);
      } else {
        setFilteredData(filtered);
      }
    }
  };

  useEffect(() => {
    filterData();
  }, [stage, searchQuery, prevItem]);

  useEffect(() => {
    console.log(preOffer, "preOffer");
  }, [preOffer]);

  // Functions
  const onQuantityChange = (item, newQuantity) => {
    if (stage === 0) {
      const exist = preOffer.some((olditem) => olditem.Name === item.Name);
      if (!exist) {
        const newItem = { ...item, Quantity: newQuantity };
        setPreOffer((prevPreOffer) => [...prevPreOffer, newItem]);
      } else {
        const updatedPreOffer = preOffer.map((oldItem) => {
          if (oldItem.Name === item.Name) {
            return { ...oldItem, Quantity: newQuantity };
          }
          return oldItem;
        });
        setPreOffer(updatedPreOffer);
      }
    }
    if (stage === 1) {
      const exist = preRequest.some((olditem) => olditem.Name === item.Name);
      if (!exist) {
        const newItem = { ...item, Quantity: newQuantity };
        setPreRequest((prevPreRequest) => [...prevPreRequest, newItem]);
      } else {
        const updatedPreRequest = preRequest.map((oldItem) => {
          if (oldItem.Name === item.Name) {
            return { ...oldItem, Quantity: newQuantity };
          }
          return oldItem;
        });
        setPreRequest(updatedPreRequest);
      }
    }
  };

  const addToOfferRequest = (item) => {
    if (stage === 0) {
      const exist = offer.some((offer) => offer.Name === item.Name);
      if (!exist) {
        let index = preOffer.findIndex(
          (preOffer) => preOffer.Name === item.Name
        );
        if (index !== -1) {
          setOffer((prevOffer) => [...prevOffer, preOffer[index]]);
          document.getElementById("search-input").value = "";
          setSearchQuery("");
        }
      }
    } else if (stage === 1) {
      const exist = request.some((request) => request.Name === item.Name);
      if (!exist) {
        let index = preRequest.findIndex(
          (preRequest) => preRequest.Name === item.Name
        );
        if (index !== -1) {
          setRequest((prevRequest) => [...prevRequest, preRequest[index]]);
          document.getElementById("search-input").value = "";
          setSearchQuery("");
        }
      }
    }
  };

  const deleteAdd = (item) => {
    if (stage === 0) {
      let index = offer.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index !== -1) {
        setOffer((prevOffer) => prevOffer.filter((_, i) => i !== index));
      }
      let index2 = preOffer.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index2 !== -1) {
        setPreOffer((prevPreOffer) =>
          prevPreOffer.filter((_, i) => i !== index2)
        );
      }
    } else if (stage === 1) {
      let index = request.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index !== -1) {
        setRequest((prevRequest) => prevRequest.filter((_, i) => i !== index));
      }
      let index2 = preRequest.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index2 !== -1) {
        setPreRequest((prevPreRequest) =>
          prevPreRequest.filter((_, i) => i !== index2)
        );
      }
    }
  };

  const nextStage = () => {
    if (stage !== 2) {
      setStage((prevStage) => prevStage + 1);
      document.getElementById("search-input").value = "";
      setSearchQuery("");
    }
  };

  const backStage = () => {
    if (stage !== 0) {
      setStage((prevStage) => prevStage - 1);
      document.getElementById("search-input").value = "";
      setSearchQuery("");
    }
  };

  const confirm = () => {
    alert(
      `${finalOffer.UserNamePoster}, Your exchange request has been created successfully`
    );
    setStage(0);
    setOffer([]);
    setPreOffer([]);
    setPreRequest([]);
    setRequest([]);
  };

  return (
    <div className="om">
      <h1>Offer Maker</h1>
      <div className="om-Head">
        <SearchBar
          filterKey={"Name"}
          setQuery={setSearchQuery}
          placeholder={searchQuery}
        />
        {stage === 2 ? null : (
          <div className="FilterContent">
            <FilterContent
              data={filteredData}
              stage={stage}
              onQuantityChange={onQuantityChange}
              addToOfferRequest={addToOfferRequest}
            />
          </div>
        )}
      </div>
      <div className="om-Body">
        <div className={stage !== 2 ? "om-body-selector" : "asd"}>
          <OfferList
            items={{ offer, request }}
            stage={stage}
            deleteAdd={deleteAdd}
          />
        </div>
        <div className="om-Footer">
          <StageButtons
            stage={stage}
            nextStage={nextStage}
            backStage={backStage}
            confirm={confirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ReOfferMaker;
