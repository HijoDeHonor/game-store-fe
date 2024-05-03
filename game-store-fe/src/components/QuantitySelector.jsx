import React, { useState } from "react";

function QuantitySelector({ item, onQuantityChange }) {
  const [quantity, setQuantity] = useState(item.Quantity || 0);

  const quantityUp = () => {
   const newQuantity = quantity + 1;
   setQuantity(newQuantity);
   onQuantityChange(newQuantity);
  };

  const quantityDown = () => {
    
    if (quantity > 1) {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity);
      };
    
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      setQuantity(value);
      onQuantityChange(value);
    }
  };

  return (
    <div className="quantity-selector">
      <button className="quantity-btn" onClick={quantityDown}>
        -
      </button>
      <input
        className="quantity-input"
        type="number"
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