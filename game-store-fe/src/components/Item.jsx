import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

function Item({ item, index, imageWidth, top }) {
  return (
    <div className="item-card" key={index} style={{ width: imageWidth }}>
      <img
        key={item.id}
        className="item-img"
        src={item.img}
        alt={item.Name}
        style={{ width: imageWidth }} 
        data-tooltip-id="tooltip"
        data-tooltip-content={item.Name}
        data-tooltip-place="top"
      />
      <Tooltip id="tooltip" />

      {item.Quantity !== 0 ? (
        <div className="item-quantity" style={{top: top}} >{item.Quantity}</div>
      ) : null}
    </div>
  );
}

export default Item;
