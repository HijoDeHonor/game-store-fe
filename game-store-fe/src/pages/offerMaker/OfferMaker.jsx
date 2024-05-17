import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Item from "../../components/Item";
import ItemList from "../../components/Itemlist";
import QuantitySelector from "../../components/QuantitySelector";

import DBServerData from "../../utils/DB-Server.json";
import DBUserData from "../../utils/DB-User.json";

import "./offerMaker.css";

const OfferMaker = () => {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  const [offer, setOffer] = useState([]);
  const [preOffer, setPreOffer] = useState([]);
  const [request, setRequest] = useState([]);
  const [preRequest, setPreRequest] = useState([]);
  const [prevItems, setPrevItems] = useState([]);

  const [dropdVisible, setDropdVisible] = useState(false);

  const finalOffer = {
    Offer: offer,
    Request: request,
    UserNamePoster: localStorage.getItem("UserName") || "Guest",
  };

  useEffect(() => {
    const filterData = () => {
      const data = stage === 0 ? DBUserData : DBServerData; // change DBUserData to getItems(user) and DBServerData to getItems()
      if (query.trim() === "") {
        setFilteredData([]);
        setDropdVisible(false);
      } else {
        const filtered = data.filter((item) =>
          item.Name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered);
        setDropdVisible(true);
      }
    };
    filterData();
  }, [stage, query]);

  const addToPrevItems = ({ item }) => {
    const maxQuantity = item.Quantity;
    const { Name, Img, Id } = item;

    const itemExists = prevItems.some((prevItem) => prevItem.Name === Name);

    if (!itemExists) {
      setPrevItems((prevItems) => [
        ...prevItems,
        { Id, Name, Quantity: 0, Img, maxQuantity }, //set default quantity to 0
      ]);
      if (stage === 0) {
        setPreOffer((preOffer) => [
          ...preOffer,
          { Id, Name, Quantity: 0, Img },
        ]);
        setQuery("");
        document.getElementById("search-input").value = "";
      } else if (stage === 1) {
        setPreRequest((preRequest) => [
          ...preRequest,
          { Id, Name, Quantity: 0, Img },
        ]);
        setQuery("");
        document.getElementById("search-input").value = "";
      }
      setQuery("");
    }
  };

  const preItemsQuantitySelector = (prevItems) => {
    if (stage !== 2) {
      return prevItems.map((item) => (
        <div className="content" key={item.Id}>
          <Item item={item} modal={modnone} recicler={reciclerOff} />
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
    if (stage === 2) {
      return null;
    }
  };

  const onQuantityChange = (item, newQuantity) => {
    if (stage === 0) {
   
      setPreOffer((prevOffer) =>
        prevOffer.map((prevItem) => {
          if (prevItem.Name === item.Name) {
            return { ...prevItem, Quantity: newQuantity };
          }
          return prevItem;
        })
      );
    }
    if (stage === 1) {
     
      setPreRequest((prevRequest) =>
        prevRequest.map((prevItem) => {
          if (prevItem.Name === item.Name) {
            return { ...prevItem, Quantity: newQuantity };
          }
          return prevItem;
        })
      );
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
        }
      }
    }

    if (stage === 1) {
      const exist = request.some((request) => request.Name === item.Name);
      if (!exist) {
        let index = preRequest.findIndex(
          (preRequest) => preRequest.Name === item.Name
        );
        if (index !== -1) {
          setRequest((prevRequest) => [...prevRequest, preRequest[index]]);
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
        setOffer((prevOffer) => {
          const list = [...prevOffer];
          list.splice(index, 1);
          return list;
        });
      }
      let index2 = preOffer.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index2 !== -1) {
        setPreOffer((prevPreOffer) => {
          const list = [...prevPreOffer];
          list.splice(index, 1);
          return list;
        });
      }
    }
    if (stage === 1) {
      let index = request.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index !== -1) {
        setRequest((prevRequest) => {
          const list = [...prevRequest];
          list.splice(index, 1);
          return list;
        });
      }
      let index2 = preRequest.findIndex(
        (itemToRemove) => itemToRemove.Name === item.Name
      );
      if (index2 !== -1) {
        setPreRequest((prevPreRequest) => {
          const list = [...prevPreRequest];
          list.splice(index, 1);
          return list;
        });
      }
    }
  };

  const confirm = () => {
    alert(finalOffer.UserNamePoster + " Your offer has been created");
    setStage(0);
    setOffer([]);
    setPreOffer([]);
    setPreRequest([]);
    setRequest([]);
  };

  const visualizeOfferRequest = () => {
    if (stage === 0) {
      return (
        <ItemList
          allTheItems={offer}
          modal={modnone}
          recicler={reciclerOn}
          deleteAdd={deleteAdd}
        />
      );
    }
    if (stage === 1) {
      return (
        <ItemList
          allTheItems={request}
          modal={modnone}
          recicler={reciclerOn}
          deleteAdd={deleteAdd}
        />
      );
    }
    {
      return (
        <div className="final-content">
          <p>this are your Offers</p>
          <ItemList key={1} allTheItems={offer} modal={modnone} />
          <p>in exchange for this item...</p>
          <ItemList key={2} allTheItems={request} modal={modnone} />
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
    }
    if (stage === 1) {
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
      setPrevItems([]);
      setQuery("");
    }
  };

  const backStage = () => {
    if (stage !== 0) {
      if (stage === 1) {
        setPrevItems(offer);
        setPreRequest([]);
        setStage((prevStage) => prevStage - 1);
        setQuery("");
      }
      if (stage === 2) {
        setPrevItems(request);
        setStage((prevStage) => prevStage - 1);
        setQuery("");
      }
    }
  };

  return (
    <div className="om">
      <h1>Offer Maker</h1>
      <div className="om-Head">
        <SearchBar filterKey={"Name"} setQuery={setQuery} placeholder={query} />
        {dropdVisible && (
          <div className="drop">
            <ItemList
              allTheItems={filteredData}
              onClick={addToPrevItems}
              recicler={reciclerOff}
            />
          </div>
        )}
      </div>
      <div className="om-Body">
        <div className={stage !== 2 && "om-body-selector"}>
          {preItemsQuantitySelector(prevItems)}
        </div>

        {visualizeOfferRequest()}
      </div>
      <div className="om-Footer">{stageButton()}</div>
    </div>
  );

  ///////////////////////////////////////////////////////////////////////////////
};

export default OfferMaker;
