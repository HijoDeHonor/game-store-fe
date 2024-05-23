import { MOD_NONE, RECICLER_ON } from "../../../utils/constants";
import ItemList from "../../../components/Itemlist";

const OfferList = ({ items, deleteAdd }) => {

  return (
    <ItemList
      allTheItems={items}
      modal={MOD_NONE}
      recicler={RECICLER_ON}
      deleteAdd={deleteAdd ? deleteAdd : null}
    />
  );
};

export default OfferList;
