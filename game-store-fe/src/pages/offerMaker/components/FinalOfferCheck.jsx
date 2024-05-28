import React from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "../provider/offerMakerProvider";
import {
  FINAL_OFFER,
  FINAL_REQUEST,
  BACK,
  CREATE_OFFER,
} from "../../../utils/textConstants";

import OfferList from "./OfferList";

const FinalOfferCheck = () => {
  const { state, backStage, confirmCreateOffer } = useOfferMaker();

  const { offer, request } = state;
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
      <div>
        <button onClick={backStage}>{BACK}</button>
        <button onClick={confirmCreateOffer}>{CREATE_OFFER}</button>
      </div>
    </>
  );
};

export default FinalOfferCheck;
