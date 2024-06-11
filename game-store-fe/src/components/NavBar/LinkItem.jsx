import React, { useState } from "react";

const LinkItem = ({ children, to, content, className }) => {
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
        <a className={className ? className : "link-tittle"} href={to}>
          {children}
        </a>
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
