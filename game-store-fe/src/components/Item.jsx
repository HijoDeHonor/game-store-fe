import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

function Item({ item }) {
  return (
    <div className="item-card" key={item.id}>
      <img
        className="item-img"
        src={item.img}
        alt={item.Name}
        data-tooltip-id="tooltip"
        data-tooltip-content={item.Name}
        data-tooltip-place="top"
      />
      <Tooltip id="tooltip" />

      {item.Quantity !== 0 ? (
        <div className="item-quantity">{item.Quantity}</div>
      ) : null}
    </div>
  );
}

export default Item;
