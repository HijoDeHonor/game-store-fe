import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/esm/CloseButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { removeItem } from '../services/itemService';
import { useSnackbarContext } from '../utils/snackbars';
import { CANCEL, DELETE, RECICLER_BIN_SUB_TEXT, RECICLER_BIN_TITLE, REMOVE_ITEM_ERROR, SUCCESS_REMOVE_ITEM } from '../utils/textConstants';

const ReciclerItem = ({ item, show, handleClose, deleteAdd }) => {

  const { success, error } = useSnackbarContext();

  const handleXClose = () => {
    handleClose();
  };

  const handleDelete = async () => {
    if (deleteAdd) {
      deleteAdd(item);
      return;
    }
    const itemToRemove = [{ 
      itemName: item.Name,
      quantity: item.Quantity }];
    try {
      handleClose();
      await removeItem(itemToRemove);
      success(SUCCESS_REMOVE_ITEM);
    } catch (e) {
      error(REMOVE_ITEM_ERROR);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <CloseButton onClick={handleXClose} />
        <Modal.Title>{RECICLER_BIN_TITLE}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={item.Img}
          style={{ height: '60px', cursor: 'default' }}
          className="item-img"
          alt={item.Name}
        />
        <p>{item.Name}</p>
        <p>{RECICLER_BIN_SUB_TEXT}</p>
      </Modal.Body>
      <Modal.Footer
        style={{ justifyContent: 'space-evenly', flexDirection: 'row' }}
      >
        <button type="button" className="btn" onClick={handleClose}>
          {CANCEL}
        </button>
        <button type="button" className="btn" onClick={handleDelete}>
          {DELETE}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReciclerItem;
