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

import OfferList from "./OfferList";

const FinalOfferCheck = () => {
  const { state,dispatch, confirmCreateOffer } = useOfferMaker();

  const { offer, request, currentStage } = state;

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
    <>
      <div className="om-body">
        <p>{FINAL_OFFER}</p>
        <OfferList items={offer} recicler={false} />
      </div>
      <div className="om-body">
        <p>{FINAL_REQUEST}</p>
        <OfferList items={request} recicler={false} />
      </div>
      <div className="stage2">
        <button className="stage-btn" onClick={backStage}>{BACK}</button>
        <button className="confirm-btn" onClick={confirmCreateOffer}>{CREATE_OFFER}</button>
      </div>
    </>
  );
};

export default FinalOfferCheck;
