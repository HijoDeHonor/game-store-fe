// settings
import React, { useState, useEffect } from "react";

//tools
import { Tooltip } from "react-tooltip";

//my components
import ModalItem from "./Modal";
import ReciclerItem from "./ReciclerItem";
function Item({ item, index, imageWidth, top, add, onClick, modal }) {
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClick = () => {
    setShowDelete(!showDelete);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowDelete(false);
  };
  const handleToggleModal = () => {
    onClick ? onClick({ item }) : setShowModal(!showModal);
  };
  const modaldelete = () => {
    if ((modal = true)) {
      return (
        showDelete && (
          <ReciclerItem
            handleClose={handleClose}
            item={item}
            show={showDelete}
            
          />
        )
      );
    }
  };
  const modalOn = () => {
    if ((modal = true)) {
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
    <div className="item-card" key={item.id}>
      <img
        key={item.id}
        className="item-img"
        src={item.Img}
        alt={item.Name}
        style={{ width: imageWidth }} 
        onClick={handleToggleModal}
        data-tooltip-id="tooltip"
        data-tooltip-content={item.Name}
        data-tooltip-place="top"
      />
      <Tooltip id="tooltip" style={{zIndex: 10}} />

      {item.Quantity !== 0 ? (
        <div className="item-quantity" style={{top: top}} >{item.Quantity}</div>
      ) : null}

      {modalOn()}
      {modaldelete()}
    </div>
  );
}

export default Item;