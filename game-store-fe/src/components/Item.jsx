// settings
import React, { useState } from "react";

//tools
import { Tooltip } from "react-tooltip";

//my components
import ModalItem from "./Modal";
import ReciclerItem from "./ReciclerItem";
function Item({ item, imageWidth, top, add, onClick, modal, recicler }) {
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
    if ((recicler = true)) {
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
    <div className="item-card" key={item.Id}>
      {recicler ?(<div className="recicler-Item">
        <img
          src="https://static-00.iconduck.com/assets.00/delete-icon-1864x2048-bp2i0gor.png"
          alt="Delete"
          onClick={handleDeleteClick}
        />
      </div>):null}
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