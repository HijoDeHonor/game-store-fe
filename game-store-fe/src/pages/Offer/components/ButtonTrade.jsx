import tradeIcon from '../../../assets/trade.png';

export default function ButtonTrade ({ handleConfirmTrade }) {
  return (
    <div className="buttons-container">
      <button className="btn-trade" onClick={ () => handleConfirmTrade() }>
        TRADE
      </button>
      <div className='btn-trade icon'>
        <img src={ tradeIcon } alt="TRADE" onClick={ () => handleConfirmTrade() } />
      </div>
    </div>
  );
}
