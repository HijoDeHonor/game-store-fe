import React, { useState } from "react";

function QuantitySelector({ item, onQuantityChange, maxQuantity, shouldShowquantity }) {
  const [quantity, setQuantity] = useState(item.Quantity);
  const quantityUp = () => {
    console.log(item, quantity)
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
        onQuantityChange && onQuantityChange(item, newQuantity);
      }
    }
  };

  return (
    <div className="quantity-selector">
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
