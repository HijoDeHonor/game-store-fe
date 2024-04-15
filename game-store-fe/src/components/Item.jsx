import React from "react";
import ModalItems from "./Modal";

function Item({ item }) {
  return (
    <div className="item-container" key={item.id}>
      <div className="item-card">
        <img
          className="item-img"
          src={item.img}
          alt={item.Name}
        />
        <div className="item-card-body">
          <div className="item-name">{item.Name}</div>
          {item.Quantity && (
            <div className="item-quantity">{item.Quantity}</div>
          )}
          <ModalItems item={item} />
        </div>
      </div>
    </div>
  );
}

export default Item;
