import React, { useState } from 'react';

function ToggleButton({ on, off, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  const handleToggle = () => {
    toggleButton();
    onClick();
  }
  return (
    <button onClick={handleToggle} style={{ backgroundColor: isActive ? 'green' : 'grey' }}>
      {isActive ? on : off}
    </button>
  );
}


ToggleButton.defaultProps = {
  on: 'Activado',
  off: 'Desactivado'
};

export default ToggleButton;