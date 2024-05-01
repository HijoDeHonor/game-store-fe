import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import ModalItem from "./Modal";
function Item({ item, add }) {
  
  const [showModal, setShowModal] = useState(false);
  
  const handleClose = () => {
    setShowModal(false);
  };
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  

  return (
    <div className="item-card" key={item.id} >
      <img
        className="item-img"
        src={item.img}
        alt={item.Name}
        onClick={handleToggleModal}
        data-tooltip-id="tooltip"
        data-tooltip-content={item.Name}
        data-tooltip-place="top"
      />
      <Tooltip id="tooltip" />

      {item.Quantity !== 0 ? (
        <div className="item-quantity">{item.Quantity}</div>
      ) : null}

      {showModal && <ModalItem handleClose={handleClose} item={item} show={showModal} add={add} />}

    </div>
  );
}

export default Item;
