import React from 'react';

const ToggleBtn = ({ toggle, onClick }) => {
  return (
    <div className="toggle-container" onClick={onClick}>
      <div className={`toggle-btn ${toggle ? 'disable' : ''}`}>
        {''}
        
        {toggle ? 'All Items' : 'My Items'}
      </div>
    </div>
  );
};

export default ToggleBtn;
