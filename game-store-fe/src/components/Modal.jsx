import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import CustomModal from "./CustomModal";

//import onUpdateItems from "../services/GetAllItems";

function ModalItems({ item }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [quantity, setQuantity] = useState(item.Quantity || undefined);

  const onHandleUpdate = (newQuantity) => {
    setQuantity(newQuantity);
  }
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

  return (
    <>
      {quantity === undefined && (
        <Button className="modal-open-btn" onClick={handleShow}>
          Add Item
        </Button>
      )}
      {quantity > 0 && (
        <Button className="modal-open-btn" onClick={handleShow}>
          Update Item
        </Button>
      )}
      <CustomModal
      show={show}
      handleClose={handleClose}
      item={item}
      quantity={quantity}
      onQuantityChange={setQuantity}
      handleModalAddButtonClick={handleModalAddButtonClick}
      handleModalUpdateButtonClick={handleModalUpdateButtonClick}
      />
      </>
  );
}

export default ModalItems;
