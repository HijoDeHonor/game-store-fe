import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import QuantitySelector from "./QuantitySelector";

const CustomModal = ({
  show,
  handleClose,
  item,
  handleUpdate,
  handleAdd,
  onQuantityChange,
}) => {
  return (
    <Modal
      className="modal-container"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="modal-header">
        <Modal.Title className="modal-title">{item.Name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className="modal-img" src={item.img} alt={item.Name} />
        <QuantitySelector item={item} onQuantityChange={onQuantityChange} />
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button className="modal-btn" onClick={handleClose}>
          Close
        </Button>
        {item.Quantity > 0 && (
          <Button className="modal-btn" onClick={handleUpdate}>
            Update Item
          </Button>
        )}
        {item.Quantity === 0 && (
          <Button className="modal-btn" onClick={handleAdd}>
            Add Item
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
