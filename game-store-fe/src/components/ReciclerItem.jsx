import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const ReciclerItem = ({ item, show, handleClose }) => {
  const handleXClose = () => {
    handleClose();

  };

  const handleDelete = () => {
    handleClose();
    console.log(item, "deleted");
    // deleteItem(item);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <CloseButton onClick={handleXClose} />
        <Modal.Title>Delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {item.Name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReciclerItem;
