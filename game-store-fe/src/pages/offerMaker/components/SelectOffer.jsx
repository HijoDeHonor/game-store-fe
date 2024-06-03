import { useEffect, useState } from "react";
import { ADD_TO_OFFER, ITEMS_TO_OFFER, SET_OFFER } from "../../../utils/textConstants";
import { useOfferMaker } from "../provider/offerMakerProvider";
import ListSelector from "./ListSelector";

const SelectOffer = () => {
  const { state, dispatch } = useOfferMaker();
  const { offer, userItems } = state;
  const [newOfferItems, setNewOfferItems] = useState([]);

  useEffect(() => {
    dispatch({
      type: SET_OFFER,
      data: newOfferItems,
    });
  }, [newOfferItems]);

  const updateOfferList = (list) => {
    setNewOfferItems(list);
  };

  return (
    <>
      <ListSelector
        titleReference={ITEMS_TO_OFFER}
        updateList={updateOfferList} //update offer or request
        listOfItems={userItems} // list of items from user or the server
        listKey={offer} // either 'offer' or 'request'
        btnReference={ADD_TO_OFFER}
      />
    </>
  );
};

export default SelectOffer;
