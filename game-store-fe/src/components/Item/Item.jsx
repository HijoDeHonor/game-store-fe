// settings
import { useState } from 'react';
import './Item.css';

//tools
import { Tooltip } from 'react-tooltip';

//my components
import ModalItem from '../Modal/Modal';
import ReciclerItem from '../ReciclerItem';
import ReciclerIcon from '../../assets/delete.png';

function Item ({
  item,
  add,
  onClick,
  modal,
  recicler,
  deleteAdd,
  top,
  imageWidth,
}) {
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
    if (recicler === true) {
      return (
        showDelete && (
          <ReciclerItem
            handleClose={handleClose}
            item={item}
            show={showDelete}
            deleteAdd={deleteAdd}
          />
        )
      );
    }
  };
  const modalOn = () => {
    if (modal === true) {
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
    <div className="item-container">
      <div
        className="item-card"
        data-tooltip-id="tooltip"
        data-tooltip-content={item.Name}
        data-tooltip-place="top"
        key={item.Id}
      >
        {recicler && item.Quantity !== 0 ? (
          <div className="recicler-Item">
            <img
              src={ ReciclerIcon }
              alt="Delete"
              onClick={handleDeleteClick}
            />
          </div>
        ) : null}
        <img
          className="item-img"
          src={item.Img}
          alt={item.Name}
          style={{ width: imageWidth }}
          onClick={handleToggleModal}
        />

        {item.Quantity !== 0 ? (
          <div className="item-quantity" style={{ marginTop: top }}>
            {item.Quantity}
          </div>
        ) : null}

        {modalOn()}
        {modaldelete()}
      </div>
      <Tooltip id="tooltip" style={{ zIndex: 1000 }} />
    </div>
  );
}

export default Item;
