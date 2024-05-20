import Item from "../../../components/Item";
import QuantitySelector from "../../../components/QuantitySelector";
import { MOD_NONE, RECICLER_OFF } from "../../../utils/constants";

const FilterContent = ({ data, stage, onQuantityChange, addToOfferRequest}) => {
  if (stage === 1 || stage === 0) {
    return data.map((item) => (
      <div className="content" key={item.Id}>
        <Item item={item} modal={MOD_NONE} recicler={RECICLER_OFF} />
        <QuantitySelector
          item={item}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item, newQuantity)
          }
          maxQuantity={item.maxQuantity}
        />
        <button className="add-btn" onClick={() => addToOfferRequest(item)}>
          ADD ITEM
        </button>
      </div>
    ));
  }
  return null;
};

export default FilterContent;
