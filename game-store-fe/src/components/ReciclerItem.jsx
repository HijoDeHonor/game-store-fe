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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <CloseButton onClick={handleXClose} />
        <Modal.Title>You are about to delete:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={item.Img} style={{ height: "60px", cursor:"default"}} className="item-img" alt={item.Name} />
        <p>{item.Name}</p>
        <p>Are you sure you want to delete it?</p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-evenly", flexDirection: "row" }}>
        <button type="button" className="btn" onClick={handleClose}>
          Cancel
        </button>

        <button type="button" className="btn" onClick={handleDelete}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReciclerItem;
