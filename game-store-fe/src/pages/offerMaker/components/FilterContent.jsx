import QuantitySelector from "../../../components/QuantitySelector";

const FilterContent = ({ data, onQuantityChange, shouldReset, setShouldReset}) => {
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
          hasReset={true}
          shouldShowquantity={true}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item, newQuantity)
          }
          maxQuantity={item.maxQuantity}
          shouldReset={shouldReset}
          setShouldReset={setShouldReset}
        />
      </div>
    ));
};

export default FilterContent;
