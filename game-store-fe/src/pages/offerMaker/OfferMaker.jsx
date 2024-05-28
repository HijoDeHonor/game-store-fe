import React from "react";
import {
  OfferMakerProvider,
  useOfferMaker,
} from "./provider/offerMakerProvider";
import { Stage1, Stage2, FinalStage } from "./components/stages";
import "./offerMaker.css";
import { SET_CURRENT_STAGE, SET_SEARCH_QUERY } from "../../utils/textConstants";

const OfferMaker = () => {
  const {
    state,
    dispatch,
    addToOfferAndUpdate,
    onQuantityChange,
    deleteAndUpdate,
    addToRequest,
    deleteFromRequest,
    nextStage,
    backStage,
    resetAllCounts,
    confirmCreateOffer,
  } = useOfferMaker();

  const { currentStage, filteredData, offer, request } = state;

  switch (currentStage) {
    case 0:
      return (
        <Stage1
          filteredData={filteredData}
          setSearchQuery={(searchQuery) =>
            dispatch({ type: SET_SEARCH_QUERY, data: searchQuery })
          }
          offer={offer}
          addToOfferAndUpdate={addToOfferAndUpdate}
          deleteAndUpdate={deleteAndUpdate}
          onQuantityChange={onQuantityChange}
          resetAllCounts={resetAllCounts}
          nextStage={nextStage}
        />
      );
    case 1:
      return (
        <Stage2
          setSearchQuery={(searchQuery) =>
            dispatch({ type: SET_SEARCH_QUERY, data: searchQuery })
          }
          filteredData={filteredData}
          request={request}
          setCurrentStage={(stage) =>
            dispatch({ type: SET_CURRENT_STAGE, data: stage })
          }
          addToRequest={addToRequest}
          onQuantityChange={onQuantityChange}
          deleteItemFromRequest={deleteFromRequest}
          backStage={backStage}
          nextStage={nextStage}
        />
      );
    case 2:
      return (
        <FinalStage
          offer={offer}
          request={request}
          setCurrentStage={(stage) =>
            dispatch({ type: SET_CURRENT_STAGE, data: stage })
          }
          confirmCreateOffer={confirmCreateOffer}
          backStage={backStage}
        />
      );
    default:
      return null;
  }
};

export default () => (
  <OfferMakerProvider>
    <OfferMaker />
  </OfferMakerProvider>
);
