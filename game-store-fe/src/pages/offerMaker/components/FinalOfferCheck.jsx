import React from "react";
import { useOfferMaker } from "../provider/offerMakerProvider";
import { FINAL_OFFER, FINAL_REQUEST } from "../../../utils/textConstants";

import OfferList from "./SelectedList";

const FinalOfferCheck = () => {
  const { state } = useOfferMaker();

  const { offer, request } = state;

  return (
    <>
      <div className="om-final-check">
          <p>{FINAL_OFFER}</p>
        <div className="offercheck">
          <OfferList items={offer} recicler={false} />
        </div>
          <p>{FINAL_REQUEST}</p>
        <div className="offercheck">
          <OfferList items={request} recicler={false} />
        </div>
      </div>
    </>
  );
};

export default FinalOfferCheck;
