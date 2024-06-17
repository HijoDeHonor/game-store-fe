// setings
import { useState } from "react";

// bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import "./Modal.css"

// components
import QuantitySelector from "../QuantitySelector/QuantitySelector";

function ModalItem({ item, handleClose, show, add }) {
  const firstQuantity = item.Quantity;
  const [quantity, setQuantity] = useState(item.Quantity);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const [shows, setShows] = useState(show);

  const handleCloseClick = () => {
    handleClose();
    setShows(false);
  };
  const handleAddOrUpdate = () => {
    handleClose();
    setShows(false);
    add && add(item, quantity);
  };

  const eraseItem = () => {
    setShows(false);
    console.log(item, "deleted");
  };

  const modalUpdatebtn = () => {
    if (firstQuantity !== 0 && quantity === 0) {
      return <Button onClick={eraseItem}>Delete</Button>;
    } else if (firstQuantity === 0) {
      return <Button onClick={handleAddOrUpdate}>Add</Button>;
    } else if (firstQuantity !== 0 && quantity !== 0) {
      return <Button onClick={handleAddOrUpdate}>Update</Button>;
    }
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
        <Modal.Header className="modal-header">
          <CloseButton onClick={handleCloseClick} />
          <Modal.Title>
            <h1>{item.Name}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <img src={item.Img} alt={item.Name} />
        </Modal.Body>
        <Modal.Footer>
          <QuantitySelector
            item={item}
            onChangeQuantity={handleQuantityChange}
            shouldShowQuantity={true}
          />
          {modalUpdatebtn()}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalItem;
