import { CONFIRM_TRADE_SUB_TEXT, CONFIRM_TRADE_TITLE } from '../../utils/textConstants';
import Item from '../Item/Item';
import './listForModal.css';

function ListForModal ({ request, offer }) {
  
  return (
    <div className='list-for-modal'>
      <h2 className='subtext'>{CONFIRM_TRADE_TITLE}</h2>
      <div className='confirm-modal-list'>
        {offer.map((item)=> <Item item={ item } key={item.Name}/>)}
      </div>
      <h2 className='subtext'>{CONFIRM_TRADE_SUB_TEXT}</h2>
      <div className='confirm-modal-list'>
        {request.map((item)=> <Item item={ item } key={item.Name}/>)}
      </div>
    </div>
  );
}

export default ListForModal;
