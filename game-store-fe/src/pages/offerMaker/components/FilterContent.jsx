import QuantitySelector from "../../../components/QuantitySelector";

const FilterContent = ({ data, onQuantityChange, add}) => {
    if (data.length === 0) {
      return (
        <div className="content">
          <p>There is no match for that item name.</p>
        </div>
      );
    }
    return data.map((item) => (
      <div className="content" key={item.Id}>
        <img src={item.Img} alt= {item.Name} />
        <QuantitySelector
          item={item}
          shouldShowquantity={true}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item, newQuantity)
          }
          maxQuantity={item.Quantity}
        />
        <button className="add-btn" onClick={() => add(item)}>
          ADD ITEM
        </button>
      </div>
    ));
};

export default FilterContent;
