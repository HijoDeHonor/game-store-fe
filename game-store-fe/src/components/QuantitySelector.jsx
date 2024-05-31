import React, { useEffect, useState } from "react";

function QuantitySelector({
  item,
  onChangeQuantity,
  maxQuantity,
  shouldShowquantity,
  hasReset,
  valueForReset,
  shouldReset,
  setShouldReset,
}) {
  const [quantity, setQuantity] = useState(item.Quantity);
  const resetValue = valueForReset ? valueForReset : 0;
 

  useEffect(() => {
    if (shouldReset) {
      handleReset();
      setShouldReset(false);
    }
  }, [shouldReset, setShouldReset]);

  const quantityUp = () => {
    if (maxQuantity && quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChangeQuantity && onChangeQuantity(newQuantity);
    } else if (!maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onChangeQuantity && onChangeQuantity(newQuantity);
    }
  };

  const quantityDown = () => {
    if (quantity === 0) {
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onChangeQuantity && onChangeQuantity(newQuantity);
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      if (newQuantity >= 0 && (!maxQuantity || newQuantity <= maxQuantity)) {
        setQuantity(newQuantity);
        onChangeQuantity && onChangeQuantity(newQuantity);
      }
    }
  };

  const handleReset = () => {
    const newQuantity = resetValue;
    setQuantity(newQuantity);
    onChangeQuantity && onChangeQuantity(newQuantity);
  };

  return (
    <div className="quantity-selector">
      {hasReset && (
        <button className="quantity-reset-btn" onClick={handleReset}>
          Reset
        </button>
      )}
      <button className="quantity-btn" onClick={quantityDown}>
        -
      </button>
      <input
        id={`number-input ${item.Id}`}
        className="quantity-input"
        type="text"
        value={shouldShowquantity ? quantity : 0}
        onChange={handleInputChange}
      />
      <button className="quantity-btn" onClick={quantityUp}>
        +
      </button>
    </div>
  );
}
export default QuantitySelector;
