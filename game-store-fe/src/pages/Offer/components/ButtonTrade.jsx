import { useNavigate } from 'react-router-dom';
import tradeIcon from '../../../assets/trade.png';
import { useNavBarProvider } from '../../../components/NavBar/navbarProvider/navbarProvider.jsx';
import { confirmTradeModal } from '../../../utils/confirmTradeModal.jsx';
import { LOGIN, OWN_TRADE, TRADE } from '../../../utils/textConstants.js';
import { Tooltip } from 'react-tooltip';

export default function ButtonTrade ({ handleConfirmTrade, offer, request, owner }) {
  const { userName } = useNavBarProvider();
  let isMyTrade = owner === userName;
  const navigate = useNavigate();

  const goLogin = () => {
    navigate(LOGIN);
    window.location.reload();
  };

  const handleClick = () => {
    if (!userName) {
      goLogin();
    } else {
      confirmTradeModal(handleConfirmTrade, offer, request);
    }
  };

  return (
    <div className="buttons-container">
      {isMyTrade ?   
        <button
          className='btn-trade own-trade'
          data-tooltip-id="btn-tooltip"
          data-tooltip-content={OWN_TRADE}
          data-tooltip-place="left">
          {TRADE}
        </button>
        :
        <button className="btn-trade" onClick={handleClick}>
          {TRADE}
        </button>}
      <div className='btn-trade icon'>
        {isMyTrade ?
          <img 
            src={tradeIcon} 
            alt={TRADE}
            data-tooltip-id="btn-tooltip"
            data-tooltip-content={OWN_TRADE}
            data-tooltip-place="left" />
          :
          <img 
            src={tradeIcon} 
            alt={TRADE}
            onClick={handleClick} />}
      </div>
      <Tooltip id="btn-tooltip" style={{ zIndex: 1000 }} />
    </div>
  );
}
