import tradeIcon from '../../../assets/trade.png';
import { useNavBarProvider } from '../../../components/NavBar/navbarProvider/navbarProvider.jsx';
import { confirmTradeModal } from '../../../utils/confirmTradeModal.jsx';
import { OWN_TRADE, TRADE } from '../../../utils/textConstants.js';
import { Tooltip } from 'react-tooltip';

export default function ButtonTrade ({ handleConfirmTrade, offer, request, owner }) {

  const { userName } = useNavBarProvider();

  let isMyTrade = owner === userName;

  return (
    <div className="buttons-container">
      { isMyTrade ?   
        <button 
          className='btn-trade'
          data-tooltip-id="btn-tooltip"
          data-tooltip-content={OWN_TRADE}
          data-tooltip-place="left">
          {TRADE}
        </button>
        :
        <button className="btn-trade" onClick={ () => confirmTradeModal(()=> handleConfirmTrade, offer, request)}>
          {TRADE}
        </button> }
      <div className='btn-trade icon'>
        {isMyTrade ?
          <img 
            src={ tradeIcon } 
            alt={TRADE} 
            data-tooltip-id="btn-tooltip"
            data-tooltip-content={OWN_TRADE}
            data-tooltip-place="left" /> 
          :
          <img 
            src={ tradeIcon } 
            alt={TRADE} onClick={ () => confirmTradeModal(()=> handleConfirmTrade, offer, request)} /> }
      </div>
      <Tooltip id="btn-tooltip" style={{ zIndex: 1000 }} />
    </div>
  );
}
