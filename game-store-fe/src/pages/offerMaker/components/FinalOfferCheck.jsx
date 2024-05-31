import React from "react";
import {
  useOfferMaker,
} from "../provider/offerMakerProvider";
import {
  FINAL_OFFER,
  FINAL_REQUEST,
  BACK,
  CREATE_OFFER,
  SET_CURRENT_STAGE,
} from "../../../utils/textConstants";

import OfferList from "./SelectedList";

const FinalOfferCheck = () => {
  const { state, } = useOfferMaker();

  const { offer, request, } = state;




  return (
    <>
      <div className="om-body">
        <p>{FINAL_OFFER}</p>
        <OfferList items={offer} recicler={false} />
      </div>
      <div className="om-body">
        <p>{FINAL_REQUEST}</p>
        <OfferList items={request} recicler={false} />
      </div>
    </>
  );
};

export default FinalOfferCheck;
