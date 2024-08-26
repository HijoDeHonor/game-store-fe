import Item from '../../../components/Item/Item';
import { useNavigate } from 'react-router-dom';
import ButtonTrade from './ButtonTrade.jsx';
import { acceptTrade } from '../../../services/offerService.js';
import { INVENTORY, LOGIN, TRADE, TRADE_SUCCESS, TRY_AGAIN } from '../../../utils/textConstants.js';
import { useSnackbarContext } from '../../../utils/snackbars.jsx';
import { useNavBarProvider } from '../../../components/NavBar/navbarProvider/navbarProvider.jsx';

const Offer = ({ offer }) => {
  const { Id, Offer, Request, UserNamePoster, IdList } = offer;
  const navigate = useNavigate();
  const { success, error } = useSnackbarContext();
  const { userName } = useNavBarProvider();


  const goLogin = () => {
    console.log(userName);
    navigate(LOGIN);
    window.location.reload();

  };

  const handleConfirmTrade = async () => {
    const isAcecepted = await acceptTrade(Id, userName);
    if (!isAcecepted) {
      error(TRY_AGAIN);
      window.location.reload();
      return;
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
        {userName ? <ButtonTrade handleConfirmTrade={ handleConfirmTrade } offer={Offer} request={Request} owner={UserNamePoster} /> : <button className='btn-trade' onClick={goLogin}>{TRADE}</button> }
      </td>
    </tr >
  );
};

export default Offer;
