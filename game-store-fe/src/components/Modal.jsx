import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QuantitySelector from "./QuantitySelector";
import { createPortal } from "react-dom";
//import onUpdateItems from "../services/GetAllItems";

function ModalItems({ item }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Quantity, setQuantity] = useState(item.Quantity || undefined);

  const handleModalUpdateButtonClick = () => {
    //      pasar a funcion async cuando este el backend
    //     const updatedItem = {
    //       id: Id,
    //       Name: item.Name,
    //       img: item.img,
    //       Quantity: Quantity,
    //     };
    //     try{
    //         await updatedItem(updatedItem);
    //         handleClose();
    //         onUpdateItems();
    //     } catch (error){
    //         console.log('Error updating item:', error);
    //     }
  };
  const handleModalAddButtonClick = () => {
    //      pasar a funcion async cuando este el backend
    //     const newItem = {
    //       id: Id,
    //       Name: item.Name,
    //       img: item.img,
    //       Quantity: Quantity,
    //     };
    //     try{
    //         await addItem(newItem);
    //         handleClose();
    //         onUpdateItems();
    //     } catch (error){
    //         console.log('Error adding item:', error);
    //     }
  };

  const modal = (
    <div className="modal-overlay">
      <Modal
        className="modal-container"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="modal-title">{item.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className="modal-img" src={item.img} alt={item.Name} />

          <QuantitySelector item={item} onQuantityChange={setQuantity} />
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button className="close-btn" onClick={handleClose}>
            Close
          </Button>
          {Quantity > 0 && (
            <Button
              className="modal-btn"
              onClick={handleModalUpdateButtonClick}
            >
              Update Item
            </Button>
          )}
          {Quantity === undefined && (
            <Button className="modal-btn" onClick={handleModalAddButtonClick}>
              Add item
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );

  return (
    <>
      {Quantity === undefined && (
        <Button className="modal-open-btn" onClick={handleShow}>
          Add Item
        </Button>
      )}
      {Quantity > 0 && (
        <Button className="modal-open-btn" onClick={handleShow}>
          Update Item
        </Button>
      )}
      {createPortal(modal, document.getElementById("modal-root"))}
    </>
  );
}

export default ModalItems;
