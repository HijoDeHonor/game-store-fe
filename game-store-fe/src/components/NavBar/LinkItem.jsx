import React, { useState } from "react";
import { Link } from "react-router-dom";

const LinkItem = ({ children, to, content }) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);
  const handleClick = () => setShow(false);

  return (
    <li
      className={content ? "dropdown" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {content ? (
        <p className="li-tittle">{children}</p>
      ) : (
        <Link className="link-tittle" to={to}>
          {children}
        </Link>
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
