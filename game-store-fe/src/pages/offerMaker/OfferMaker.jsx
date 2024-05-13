// react
import React, { useEffect, useState } from "react";

// my components
import SearchBar from "../../components/SearchBar";
import Item from "../../components/Item";
import ItemList from "../../components/Itemlist";
import QuantitySelector from "../../components/QuantitySelector";

// fake database
import DBServerData from "../../utils/DB-Server.json";
import DBUserData from "../../utils/DB-User.json";

//styles
import "./offerMaker.css";

const OfferMaker = () => {
  // states--------------------------------------------------------------------
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState(0);
  const [filteredData, setFilteredData] = useState([]);

  //dropdown settings
  const [dropdVisible, setDropdVisible] = useState(false);

  // data
  const [offer, setOffer] = useState([]);
  const [preOffer, setPreOffer] = useState([]);
  const [request, setRequest] = useState([]);
  const [preRequest, setPreRequest] = useState([]);

  const [prevItems, setPrevItems] = useState([]);

  // Variables-----------------------------------------------------------------
  const finalOffer = {
    Offer: offer,
    Request: request,
    UserNamePoster: localStorage.getItem("UserName") || "Guest",
  };
  // move to constant
  const recicler = false;
  const mod = true;
  const modnone = false;

  // functions-----------------------------------------------------------------

  //filter data
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

  //go to next stage
  const nextStage = () => {
    setStage((prevStage) => prevStage + 1);
    setPrevItems([]);
  };

  //go to previous stage
  const backStage = () => {
    if (stage === 1) {
      setRequest([]);
      setPrevItems(offer);
    }
    if (stage === 2) {
      setPrevItems(request);
    }
    setStage((prevStage) => prevStage - 1);
  };

  //create the offer
  const Confirm = () => {
    alert(finalOffer.UserNamePoster + " Your offer has been created");
    console.log(offer, "offer");
    console.log(request, "request");
    setStage(0);
    setOffer([]);
    setPreOffer([]);
    setPreRequest([]);
    setRequest([]);
  };

  //add item to select the quantity
  const prevAdd = ({ item }) => {
    const { Id, Name, Img } = item;
    const maxQuantity = item.Quantity;
    // Verify if the item already exists
    const itemExists = prevItems.some((prevItem) => prevItem.Name === Name);

    if (!itemExists) {
      // If the item does not exist, add it to the prevItems array
      setPrevItems((prevItems) => [
        ...prevItems,
        { Id, Name, Quantity: 0, Img, maxQuantity }, //set default quantity to 0
      ]);
      // Add the item to the offer or request array based on the stage
      if (stage === 0) {
        
        setPreOffer((preOffer) => [
          ...preOffer,
          { Id, Name, Quantity: 0, Img },
        ]);
      } else if (stage === 1) {
        setPreRequest((preRequest) => [
          ...preRequest,
          { Id, Name, Quantity: 0, Img },
        ]);
      }
      setQuery("");
    }
  };

  const quantityOnChange = (changedItem, newQuantity) => {
    //modify quantity of an item in preOffer or preRequest based on the stage
    const updateItem = { ...changedItem, Quantity: newQuantity };
    console.log(updateItem, "updateItem");
    if (stage === 0) {
        console.log(updateItem, "updateItem stage 0");
      setPreOffer((preOffer) =>
        preOffer.map((item) =>
          item.Name === updateItem.Name ? updateItem : item
        )
      );
      console.log(preOffer, "preOffer");
    }
    if (stage === 1) {
      console.log(updateItem, "updateItem stage 1");
      setPreRequest((prevRequest) =>
        prevRequest.map((item) =>
          item.Name === updateItem.Name ? updateItem : item
        )
      );
      console.log(preRequest, "preRequest");
    }
  };

  //add item to offer or request
  const add = (item) => {
    console.log(item, "item asd");
    // Add the item to the offer or request array based on the stage
    if (stage === 0) {
      setOffer((prevOffer) => [...prevOffer, item]);
      console.log(offer, "offer");
    }
    if (stage === 1) {
      setRequest((prevRequest) => [...prevRequest, item]);
    }
  };

  //render-----------------------------------------------------------------------------

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
          <button className="stage-btn" onClick={Confirm}>
            Create Offer
          </button>
        </div>
      );
    }
  };

  const stageContentsection = () => {
    if (stage !== 2) {
      let content = prevItems;
      return content.map((item) => (
        <div className="content" key={item.Id}>
            <h2>prevItems</h2>
          <Item item={item} modal={modnone} />
          <QuantitySelector
            item={item}
            onQuantityChange={(newQuantity) =>
              quantityOnChange(item, newQuantity)
            }
            maxQuantity={item.maxQuantity}
          />
          <button className="add-btn" onClick={() => add(item)}>
            ADD ITEM
          </button>
        </div>
      ));
    }
    if (stage === 2) {
      return (
        <div className="content">
          <div className="content-row">
            <h2>offer</h2>
            <ItemList allTheItems={offer} modal={modnone} />
          </div>
          <div className="content-row">
            <h2>request</h2>
            <ItemList allTheItems={request} modal={modnone} />
          </div>
        </div>
      );
    }
  };

  const stageContent = () => {
    if (stage === 0) {
      return (
        <div className="content2">
          <ItemList allTheItems={offer} modal={modnone} />
        </div>
      );
    }
    if (stage === 1) {
      return (
        <div className="content">
          <ItemList allTheItems={request} modal={modnone} />
        </div>
      );
    }
    {
      return null;
    }
  };

  return (
    <div className="om">
      <h1>Offer Maker</h1>
      <div className="om-Head">
        <SearchBar filterKey={"Name"} setQuery={setQuery} placeholder={query} />
        {dropdVisible && (
          <div
            className="drop"
            style={{
              position: "absolute",
              margin: "5px 20px",
              zIndex: "999",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              overflow: "hidden",
            }}
          >
            <ItemList allTheItems={filteredData} onClick={prevAdd} recicler={recicler}/>
          </div>
        )}
      </div>
      <div className="om-Body">
        {stageContentsection()}
        {stageContent()}
      </div>
      <div className="om-foot">{stageButton()}</div>
    </div>
  );
};

export default OfferMaker;