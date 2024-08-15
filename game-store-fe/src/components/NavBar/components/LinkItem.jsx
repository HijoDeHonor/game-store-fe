import { useState } from 'react';
import CustomLink from './CustomLink';
const LinkItem = ({ children, to, content, className }) => {
  const [show, setShow] = useState(false);
  const [menuIcon, setMenuIcon] = useState(' ≡');

  
  const handleMouseEnter = () => {
    setShow(true);
    setMenuIcon(' ☰');
  };

  const handleMouseLeave = () => {
    setShow(false);
    setMenuIcon(' ≡');
  };
  const handleClick = () => setShow(false);

  return (
    <li
      className={content ? 'dropdown' : ''}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content ? (
        <p className="link-tittle">{children}{menuIcon}</p>
      ) : (
        <CustomLink to={to} tittle={children} className={className}/>
      )}
      {content && show ? (
        <div className="dropdown-content" onClick={handleClick}>
          {content}
        </div>
      ) : null}
    </li>
  );
};

export default LinkItem;
