import { ALL_ITEMS, MY_ITEMS } from '../../../utils/textConstants';

const ToggleBtn = ({ toggle, onClick }) => {
  return (
    <div className="toggle-container" onClick={onClick}>
      <div className={`toggle-btn ${toggle ? 'disable' : ''}`}>
        {''}
        
        {toggle ? ALL_ITEMS : MY_ITEMS}
      </div>
    </div>
  );
};

export default ToggleBtn;
