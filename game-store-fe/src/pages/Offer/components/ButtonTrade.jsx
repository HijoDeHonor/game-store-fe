import tradeIcon from '../../../assets/trade.png';
import { confirmTradeModal } from '../../../utils/confirmTradeModal.jsx';

export default function ButtonTrade ({ handleConfirmTrade, offer, request }) {
  return (
    <div className="buttons-container">
      <button className="btn-trade" onClick={ () => confirmTradeModal(()=> handleConfirmTrade, offer, request)}>
        TRADE
      </button>
      <div className='btn-trade icon'>
        <img src={ tradeIcon } alt="TRADE" onClick={ () => confirmTradeModal(()=> handleConfirmTrade, offer, request)} />
      </div>
    </div>
  );
}
