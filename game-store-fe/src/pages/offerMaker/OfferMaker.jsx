import React, { useEffect, useState } from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "./provider/offerMakerProvider";
import "./offerMaker.css";
import FinalOfferCheck from "./components/FinalOfferCheck";
import SelectStage from "./components/SelectStage";
import { getAllItems, getUserItems } from "../../services/GetAllItems";
import {
  ADD_TO_OFFER,
  ADD_TO_REQUEST,
  ITEMS_TO_OFFER,
  ITEMS_TO_REQUEST,
  SET_CURRENT_STAGE,
  SET_OFFER,
  SET_REQUEST,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
} from "../../utils/textConstants";
import Stepper from "./components/stepper";

const OfferMaker = () => {
  const { state, dispatch } = useOfferMaker();
  const { currentStage, offer, request, userItems, serverItems } = state;

  const [newOfferItems, setNewOfferItems] = useState([]);
  const [newRequestItems, setNewRequestItems] = useState([]);

  // 'fetch' to get the userItems and the serverItems then set in the context
  useEffect(() => {
    getUserItems().then((result) => {
      console.log(result,"result user")
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
      console.log(result,"result server")
      dispatch({
        type: SET_SERVER_ITEMS,
        data: result,
      });
    });
  }, [dispatch]);

  // dispatch for offer
  useEffect(() => {
    dispatch({
      type: SET_OFFER,
      data: newOfferItems,
    });
  }, [newOfferItems]);

  // dispatch for request
  useEffect(() => {
    dispatch({
      type: SET_REQUEST,
      data: newRequestItems,
    });
  }, [newRequestItems]);

  // Stage controls
  const nextStage = (currentStage) => {
    dispatch({
      type: SET_CURRENT_STAGE,
      data: currentStage + 1,
    });
  };
  const backStage = (currentStage) => {
    dispatch({
      type: SET_CURRENT_STAGE,
      data: currentStage - 1,
    });
  };

  const reset = () => {
    dispatch({ type: SET_CURRENT_STAGE, data: 0 });
    dispatch({ type: SET_SERVER_ITEMS, data: [] });
    dispatch({ type: SET_USER_ITEMS, data: [] });
    dispatch({ type: SET_OFFER, data: [] });
    dispatch({ type: SET_REQUEST, data: [] });
  };

  const confirmCreateOffer = () => {
    alert("genio de la vida ya tenes creada tu oferta papa");
    reset();
  };
  useEffect(() => {
    console.log(userItems, "userItems");
    console.log(serverItems, "serverItems");
  }, [userItems, serverItems]);

  const Stages = [
    <SelectStage
      key={"SelectOffer"}
      listOfItems={userItems}
      listKey={offer}
      titleReference={ITEMS_TO_OFFER}
      btnReference={ADD_TO_OFFER}
      UpdateList={setNewOfferItems}
    />,
    <SelectStage
      key={"SelectRequest"}
      listOfItems={serverItems}
      listKey={request}
      titleReference={ITEMS_TO_REQUEST}
      btnReference={ADD_TO_REQUEST}
      UpdateList={setNewRequestItems}
    />,
    <FinalOfferCheck key={"FinalOfferCheck"} />,
  ];

  return (
    <Stepper
      steps={Stages}
      currentStep={currentStage}
      nextStep={nextStage}
      prevStep={backStage}
      onSubmit={confirmCreateOffer}
    />
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
