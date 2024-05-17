import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Item from "../../components/Item";
import ItemList from "../../components/Itemlist";
import QuantitySelector from "../../components/QuantitySelector";

import "./offerMaker.css";
import GetAllItems from "../../services/GetAllItems";
import {
  MOD_NONE,
  MOD,
  RECICLER_OFF,
  RECICLER_ON,
} from "../../utils/constants";

const ReOfferMaker = () => {
  // States
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [stage, setStage] = useState(0);

  const [prevItem, setPrevItem] = useState([]);
  const [preOffer, setPreOffer] = useState([]);
  const [offer, setOffer] = useState([]);
  const [preRequest, setPreRequest] = useState([]);
  const [request, setRequest] = useState([]);

  const userName = localStorage.getItem("UserName") || "Guest";

  const finalOffer = {
    Offer: offer,
    Request: request,
    UserNamePoster: userName,
  };

  // Effects
  useEffect(() => {
    if (stage === 0) {
      const data = GetAllItems(userName);
      setPrevItem(
        data.map((item) => ({
          ...item,
          maxQuantity: item.Quantity,
          Quantity: 0,
        }))
      );
    } else if (stage === 1) {
      const data = GetAllItems();
      setPrevItem(
        data.map((item) => ({
          ...item,
          Quantity: 0,
        }))
      );
    }
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
  }, [stage, searchQuery]);

  useEffect(() => {
    console.log(preOffer, "preOffer");
  }, [preOffer]);

  // Functions
  const dropContent = () => {
    let data = filteredData;
    if (stage === 1 || stage === 0) {
      if (data.length === 0) {
        return (
          <div className="content">
            <p>There is no match for that item name.</p>
          </div>
        );
      }
      return data.map((item) => (
        <div className="content" key={item.Id}>
          <Item item={item} modal={MOD_NONE} recicler={RECICLER_OFF} />
          <QuantitySelector
            item={item}
            onQuantityChange={(newQuantity) =>
              onQuantityChange(item, newQuantity)
            }
            maxQuantity={item.maxQuantity}
          />
          <button className="add-btn" onClick={() => addToOfferRequest(item)}>
            ADD ITEM
          </button>
        </div>
      ));
    }
    return null;
  };

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

  const visualizeOfferRequest = () => {
    if (stage === 0) {
      return (
        <ItemList
          allTheItems={offer}
          modal={MOD_NONE}
          recicler={RECICLER_ON}
          deleteAdd={deleteAdd}
        />
      );
    } else if (stage === 1) {
      return (
        <ItemList
          allTheItems={request}
          modal={MOD_NONE}
          recicler={RECICLER_ON}
          deleteAdd={deleteAdd}
        />
      );
    } else {
      return (
        <div className="final-content">
          <p>This are your Offers</p>
          <ItemList key={1} allTheItems={offer} modal={MOD_NONE} />
          <p>In exchange for this item...</p>
          <ItemList key={2} allTheItems={request} modal={MOD_NONE} />
        </div>
      );
    }
  };

  const stageButton = () => {
    if (stage === 0) {
      return (
        <div className="stage1-btn">
          <button className="stage-btn" onClick={nextStage}>
            Next
          </button>
        </div>
      );
    } else if (stage === 1) {
      return (
        <div className="stage2-btn">
          <button className="stage-btn" onClick={backStage}>
            Back
          </button>
          <button className="stage-btn" onClick={nextStage}>
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="stage2-btn">
          <button className="stage-back" onClick={backStage}>
            Back
          </button>
          <button className="stage-btn" onClick={confirm}>
            Create Offer
          </button>
        </div>
      );
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
      if (stage === 1) {
        setStage((prevStage) => prevStage - 1);
      } else if (stage === 2) {
        setStage((prevStage) => prevStage - 1);
      }
      document.getElementById("search-input").value = "";
      setSearchQuery("");
    }
  };

  const confirm = () => {
    alert(
      finalOffer.UserNamePoster +
        " Your exchange request has been created successfully"
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
        <div className="drop">{dropContent()}</div>
      </div>
      <div className="om-Body">
        <div className={stage !== 2 ? "om-body-selector" : "asd"}>
          {visualizeOfferRequest()}
        </div>
        <div className="om-Footer">{stageButton()}</div>
      </div>
    </div>
  );
};

export default ReOfferMaker;
