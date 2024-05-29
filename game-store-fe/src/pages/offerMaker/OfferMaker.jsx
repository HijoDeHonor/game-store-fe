import React from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "./provider/offerMakerProvider";
import "./offerMaker.css";
import FinalOfferCheck from "./components/FinalOfferCheck";
import SelectOffer from "./components/SelectOffer";
import SelectRequest from "./components/SelectRequest";

const Stages = [
  <SelectOffer key={"SelectOffer"} />,
  <SelectRequest key={"SelectRequest"} />,
  <FinalOfferCheck key={"FinalOfferCheck"} />,
];

const OfferMaker = () => {
  const { state } = useOfferMaker();
  const { currentStage } = state;

  const stage = Stages[currentStage];

  return (
    <>
      <div>{stage}</div>
    </>
  );
};

export default () => (
  <OfferMakerProvider>
    <OfferMaker />
  </OfferMakerProvider>
);
