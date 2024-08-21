import Item from '../../../components/Item/Item';
import { useNavigate } from 'react-router-dom';
import ButtonTrade from './ButtonTrade.jsx';
import { acceptTrade } from '../../../services/offerService.js';
import { INVENTORY, LOCAL_USERNAME, LOGIN, TRADE_SUCCESS, TRY_AGAIN } from '../../../utils/textConstants.js';
import { useSnackbarContext } from '../../../utils/snackbars.jsx';

const Offer = ({ offer }) => {
  const { Id, Offer, Request, IdList } = offer;

  const navigate = useNavigate();

  const { success, error } = useSnackbarContext();

  const handleConfirmTrade = async () => {
    if (localStorage.getItem(LOCAL_USERNAME) === null) {
      navigate(LOGIN);
      window.location.reload();
    } else {
      let userName = localStorage.getItem(LOCAL_USERNAME);
      const isAcecepted = await acceptTrade(Id, userName);
      if (!isAcecepted) {
        error(TRY_AGAIN);
        window.location.reload();
      }
    }
    success(TRADE_SUCCESS);
    navigate(INVENTORY);
    window.location.reload();
  };

  return (
    <tr className="tr-table">
      <td className="td-id">{ IdList }</td>
      <td className="td-offer">
        <div className="item-container-offer">
          { Offer.map((item, index) => (
            <Item key={ index } item={ item } top="20px" imageWidth="40px" />
          )) }
        </div>
      </td>
      <td className="td-request">
        <div className="item-container-request">
          { Request.map((item, index) => (
            <Item key={ index } item={ item } top="20px" imageWidth="40px" />
          )) }
        </div>
      </td>
      <td className="td-btn">
        <ButtonTrade handleConfirmTrade={ handleConfirmTrade } />
      </td>
    </tr >
  );
};

export default Offer;
