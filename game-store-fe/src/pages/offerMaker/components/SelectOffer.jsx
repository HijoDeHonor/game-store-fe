import { useEffect, useState } from 'react';
import { ITEMS_TO_OFFER, SET_OFFER } from '../../../utils/textConstants';
import { useOfferMaker } from '../provider/offerMakerProvider';
import ListSelector from './ListSelector';

const SelectOffer = () => {
  const { state, dispatch } = useOfferMaker();
  const { offer, userItems } = state;
  const [newOfferItems, setNewOfferItems] = useState(offer);
  
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
        finalList={newOfferItems} // either 'offer' or 'request'
      />
    </>
  );
};

export default SelectOffer;
