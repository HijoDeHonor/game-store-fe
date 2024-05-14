import React, { useState } from "react";

function QuantitySelector({ item, onQuantityChange, maxQuantity }) {
  const [quantity, setQuantity] = useState(item.Quantity);
  const quantityUp = () => {
    if (maxQuantity && quantity < maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    } else if (!maxQuantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const quantityDown = () => {
    if (quantity === 0) {
      return;
    }
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleInputChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      if (newQuantity >= 0 && (!maxQuantity || newQuantity <= maxQuantity)) {
        setQuantity(newQuantity);
        onQuantityChange(item, newQuantity);
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
        value={quantity}
        onChange={handleInputChange}
      />
      <button className="quantity-btn" onClick={quantityUp}>
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
