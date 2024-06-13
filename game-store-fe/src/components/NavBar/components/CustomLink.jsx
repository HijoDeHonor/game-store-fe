import React from "react";

const CustomLink = ({ to, tittle, className }) => {
  return (
    <>
      <a className={className ? className : "link-tittle"} href={to}>
        {tittle}
      </a>
      
    </>
  );
};

export default CustomLink;
