import { MOD_NONE, RECICLER_ON } from "../../../utils/constants";
import ItemList from "../../../components/Itemlist";

const OfferList = ({ stage, items, deleteAdd }) => {
  if (stage === 2) {
    return (
      <div className="final-content">
        <p>This are your Offers</p>
        <ItemList key={1} allTheItems={items.offer} modal={MOD_NONE} />
        <p>In exchange for this item...</p>
        <ItemList key={2} allTheItems={items.request} modal={MOD_NONE} />
      </div>
    );
  } else {
    return (
      <ItemList
        allTheItems={stage === 0 ? items.offer : items.request}
        modal={MOD_NONE}
        recicler={RECICLER_ON}
        deleteAdd={deleteAdd}
      />
    );
  }
};

export default OfferList;
