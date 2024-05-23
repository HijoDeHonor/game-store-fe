import React from "react";
import SearchBar from "../../../components/SearchBar";
import FilterContent from "./FilterContent";
import OfferList from "./OfferList";
import { BACK, NEXT, FINAL_OFFER, FINAL_REQUEST, CREATE_OFFER, ITEMS_TO_OFFER, ITEMS_TO_REQUEST } from "../../../utils/textConstants";

export const Stage1 = ({
  setSearchQuery,
  filteredData,
  offer,
  setCurrentStage,
  addAndUpdate,
  deleteAndUpdate,
}) => (
  <>
    <div>
      <h3>{ITEMS_TO_OFFER}</h3>
    </div>
    <div>
      <SearchBar setSearchQuery={setSearchQuery}  />
    </div>
    <div>
      <FilterContent data={filteredData} onQuantityChange={addAndUpdate} add={addAndUpdate} />
    </div>
    <div>
      <OfferList items={offer} deleteAdd={deleteAndUpdate} />
    </div>
    <div>
      <button onClick={() => setCurrentStage((prevState) => prevState + 1)}>
        {NEXT}
      </button>
    </div>
  </>
);

export const Stage2 = ({
  setSearchQuery,
  filteredData,
  request,
  setCurrentStage,
  addToRequest,
  deleteItemFromRequest,
}) => (
  <>
    <div>
      <h3>{ITEMS_TO_REQUEST}</h3>
    </div>
    <div>
      <SearchBar setSearchQuery={setSearchQuery}  />
    </div>
    <div>
      <FilterContent data={filteredData} onQuantityChange={addToRequest} add={addToRequest} />
    </div>
    <div>
      <OfferList items={request} deleteAdd={deleteItemFromRequest} />
    </div>
    <div>
      <button onClick={() => setCurrentStage((prevState) => prevState - 1)}>
        {BACK}
      </button>
      <button onClick={() => setCurrentStage((prevState) => prevState + 1)}>
        {NEXT}
      </button>
    </div>
  </>
);

export const FinalStage = ({ offer, request, setCurrentStage, confirmCreateOffer }) => (
  <>
    <div>
      <p>{FINAL_OFFER}</p>
      <OfferList items={offer} />
    </div>
    <div>
      <p>{FINAL_REQUEST}</p>
      <OfferList items={request} />
    </div>
    <div>
      <button onClick={() => setCurrentStage((prevState) => prevState - 1)}>
        {BACK}
      </button>
      <button onClick={confirmCreateOffer}>{CREATE_OFFER}</button>
    </div>
  </>
);


