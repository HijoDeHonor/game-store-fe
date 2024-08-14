// setings
import { useState } from 'react';

// bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import './Modal.css';

// components
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import { addItem, removeItem } from '../../services/itemService';
import { ADD, DELETE, UPDATE } from '../../utils/textConstants';

function ModalItem ({ item, handleClose, show }) {
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
    const updateItem= {
      itemName: item.Name,
      quantity: quantity - firstQuantity
    };
    addItem(updateItem);
    handleClose();
    setShows(false);
    window.location.reload();
  };

  const eraseItem = () => {
    const itemToRemove = [{ 
      itemName: item.Name,
      quantity: firstQuantity }];
    removeItem(itemToRemove);
    handleClose();
    setShows(false);
    window.location.reload();
  };

  const modalUpdatebtn = () => {
    if (firstQuantity !== 0 && quantity === 0) {
      return <Button onClick={eraseItem}>{DELETE}</Button>;
    } else if (firstQuantity === 0) {
      return <Button onClick={handleAddOrUpdate}>{ADD}</Button>;
    } else if (firstQuantity !== 0 && quantity !== 0) {
      return <Button onClick={handleAddOrUpdate}>{UPDATE}</Button>;
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
