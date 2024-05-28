import React from "react";
import SearchBar from "../../../components/SearchBar";
import FilterContent from "./FilterContent";
import OfferList from "./OfferList";
import { BACK, NEXT, FINAL_OFFER, FINAL_REQUEST, CREATE_OFFER, ITEMS_TO_OFFER, ITEMS_TO_REQUEST } from "../../../utils/textConstants";

export const Stage1 = ({
  setSearchQuery,
  filteredData,
  offer,
  addToOfferAndUpdate,
  deleteAndUpdate,
  onQuantityChange,
  nextStage
}) => (
  <>
    <div>
      <h3>{ITEMS_TO_OFFER}</h3>
    </div>
    <div>
      <SearchBar setSearchQuery={setSearchQuery}  />
    </div>
    <div>
      <FilterContent data={filteredData} onQuantityChange={onQuantityChange} />
    </div>
    <div>
      <button onClick={addToOfferAndUpdate}>add to offer</button>
    </div>
    <div>
      <OfferList items={offer} deleteAdd={deleteAndUpdate} />
    </div>
    <div>
      <button onClick={nextStage}>
        {NEXT}
      </button>
    </div>
  </>
);

export const Stage2 = ({
  setSearchQuery,
  filteredData,
  request,
  addToRequest,
  deleteItemFromRequest,
  nextStage,
  backStage,
  onQuantityChange,
}) => (
  <>
    <div>
      <h3>{ITEMS_TO_REQUEST}</h3>
    </div>
    <div>
      <SearchBar setSearchQuery={setSearchQuery}  />
    </div>
    <div>
      <FilterContent data={filteredData} onQuantityChange={onQuantityChange} />
    </div>
    <div>
      <button onClick={addToRequest}>add to Request</button>
    </div>
    <div>
      <OfferList items={request} deleteAdd={deleteItemFromRequest}  />
    </div>
    <div>
      <button onClick={backStage}>
        {BACK}
      </button>
      <button onClick={nextStage}>
        {NEXT}
      </button>
    </div>
  </>
);

export const FinalStage = ({ offer, request, backStage, confirmCreateOffer }) => (
  <>
    <div>
      <p>{FINAL_OFFER}</p>
      <OfferList items={offer} recicler={false} />
    </div>
    <div>
      <p>{FINAL_REQUEST}</p>
      <OfferList items={request} recicler={false} />
    </div>
    <div>
      <button onClick={backStage}>
        {BACK}
      </button>
      <button onClick={confirmCreateOffer}>{CREATE_OFFER}</button>
    </div>
  </>
);

