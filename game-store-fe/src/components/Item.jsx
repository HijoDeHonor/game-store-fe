import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import ModalItem from "./Modal";
function Item({ item, add, onClick, modal }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  const handleToggleModal = () => {
    onClick? onClick({item}) : setShowModal(!showModal);
  };
  
  const modalOn = () => {
    if (modal= true) {
      return (
        showModal && (
          <ModalItem
            handleClose={handleClose}
            item={item}
            show={showModal}
            add={add}
          />
        )
      );
    }
  };

  return (
    <div className="item-card" key={item.Id}>
      <img
        className="item-img"
        src={item.Img}
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
      
      {modalOn()}
    </div>
  );
}

export default Item;
