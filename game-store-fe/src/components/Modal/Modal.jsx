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
import { ADD, ADD_ITEM_ERROR, DELETE, REMOVE_ITEM_ERROR, SUCCESS_ADD_ITEM, SUCCESS_REMOVE_ITEM, UPDATE } from '../../utils/textConstants';
import { useSnackbarContext } from '../../utils/snackbars.jsx';


function ModalItem ({ item, handleClose, show }) {

  const { success, error } = useSnackbarContext();

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
  const handleAddOrUpdate = async () => {
    const updateItem= {
      itemName: item.Name,
      quantity: quantity - firstQuantity
    };
    try {
      await addItem(updateItem);
      success(SUCCESS_ADD_ITEM);
    } catch (e) {
      error(ADD_ITEM_ERROR);
    } finally {
      handleClose();
      setShows(false);
    }
  };

  const eraseItem = async () => {
    const itemToRemove = [
      { 
        itemName: item.Name,
        quantity: firstQuantity 
      }
    ];
    try {
      await removeItem(itemToRemove);
      success(SUCCESS_REMOVE_ITEM);
    } catch (e) {
      error(REMOVE_ITEM_ERROR);
    } finally {
      handleClose();
      setShows(false);
    }
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
