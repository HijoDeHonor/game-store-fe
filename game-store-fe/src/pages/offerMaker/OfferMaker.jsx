import React, { useEffect, useState } from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "./provider/offerMakerProvider";
import "./offerMaker.css";
import { getAllItems, getUserItems } from "../../services/GetAllItems";
import {
  SET_CURRENT_STAGE,
  SET_OFFER,
  SET_REQUEST,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
} from "../../utils/textConstants";
import Stepper from "./components/stepper";
import SelectOffer from "./components/SelectOffer";
import SelectRequest from "./components/SelectRequest";
import FinalOfferCheck from "./components/FinalOfferCheck";

const OfferMaker = () => {
  const { state, dispatch } = useOfferMaker();
  const { currentStage, userItems, serverItems, offer, request } = state;

  const [allLoad, setAllLoad] = useState(false);

  // 'fetch' to get the userItems and the serverItems then set in the context
  useEffect(() => {
    getUserItems().then((result) => {
      const items = result.map((item) => {
        const maxQuantity = item.Quantity;
        item.Quantity = 0;
        return { ...item, maxQuantity };
      });
      dispatch({
        type: SET_USER_ITEMS,
        data: items,
      });
    });
    getAllItems().then((result) => {
      dispatch({
        type: SET_SERVER_ITEMS,
        data: result,
      });
      setAllLoad(true);
    });
  }, []);

  // Stage controls
  const nextStage = () => {
    if (offer.length > 0 && currentStage === 0) {// Check if the offer has any element inside, if so, go to the next stage, if not  it does nothing
      const newStage = currentStage + 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    } else if (request.length > 0 && currentStage === 1) {// Check if the request has any element inside, if so, go to the next stage, if not it does nothing
      const newStage = currentStage + 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    }
  };
  const backStage = () => {//this does not do checks, and only returns to a previous stage
    const newStage = currentStage - 1;
    dispatch({
      type: SET_CURRENT_STAGE,
      data: newStage,
    });
  };

  const reset = () => {
    dispatch({ type: SET_CURRENT_STAGE, data: 0 });
    dispatch({ type: SET_OFFER, data: [] });
    dispatch({ type: SET_REQUEST, data: [] });
  };

  const confirmCreateOffer = () => {
    alert("genio de la vida ya tenes creada tu oferta papa");
    reset();
  };

  return (
    <>
      {allLoad && userItems.length > 0 && serverItems.length > 0 && (
        <div className="offerMaker-container">
          <Stepper
            steps={[
              <SelectOffer key={"SelectOffer"} />,
              <SelectRequest key={"SelectReuest"} />,
              <FinalOfferCheck key={"FinalOfferCheck"} />,
            ]}
            currentStep={currentStage}
            nextStep={nextStage}
            prevStep={backStage}
            onSubmit={confirmCreateOffer}
          />
        </div>
      )}
    </>
  );
};

const OfferMakerWithProvider = () => {
  return (
    <OfferMakerProvider>
      <OfferMaker />
    </OfferMakerProvider>
  );
};

export default OfferMakerWithProvider;
