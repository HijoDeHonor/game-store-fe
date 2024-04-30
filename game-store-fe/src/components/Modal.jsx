// setings
import { useState } from "react";

// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import "bootstrap/dist/css/bootstrap.min.css";

// components
import QuantitySelector from "./QuantitySelector";

function ModalItem({ item, handleClose, show }) {
  const [Quantity, setQuantity] = useState(item.Quantity);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const [shows, setShows] = useState(show);

  const handleCloseClick = () => {
    handleClose();
    setShows(false);
    console.log("cerrar");
  }
  const handleAddOrUpdate = () => {
    console.log(Quantity);
    handleClose();
    setShows(false);
    console.log("cerrar");

  };

  return (
    <>
      <Modal
        show={shows}
        backdrop="static"
        keyboard={false}
        onHide={handleCloseClick}
        id="modal-item"
      >
        <Modal.Header>
        <CloseButton onClick={handleCloseClick} />
          <Modal.Title>
            <h1>{item.Name}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={item.img} alt={item.Name} />
        </Modal.Body>
        <Modal.Footer>
          <QuantitySelector
            item={item}
            onQuantityChange={handleQuantityChange}
          />
          <Button onClick={handleAddOrUpdate}>
            {Quantity !== 0 ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalItem;
