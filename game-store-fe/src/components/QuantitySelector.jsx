import React, { useState } from "react";

function QuantitySelector({
  item,
  onQuantityChange,
  maxQuantity,
  shouldShowquantity,
  hasReset,
  valueForReset,
}) {
  const [quantity, setQuantity] = useState(item.Quantity);
  const [resetValue, setResetValue] = useState(valueForReset || 0);

  const quantityUp = () => {
    if (maxQuantity && quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange && onQuantityChange(newQuantity);
    } else if (!maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange && onQuantityChange(newQuantity);
    }
  };

  const quantityDown = () => {
    if (quantity === 0) {
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange && onQuantityChange(newQuantity);
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      if (newQuantity >= 0 && (!maxQuantity || newQuantity <= maxQuantity)) {
        setQuantity(newQuantity);
        onQuantityChange && onQuantityChange(newQuantity);
      }
    }
  };

  return (
    <div className="quantity-selector">
      {hasReset && (
        <button onClick={() => setQuantity(resetValue)}>Reset</button>
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
