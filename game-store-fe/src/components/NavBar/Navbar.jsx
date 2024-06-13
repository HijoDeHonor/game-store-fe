import React, { useState, useEffect } from "react";
import LinkItem from "./components/LinkItem";
import AccountContent from "./components/AccountContent";
import "./NavBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(false);

  let userName = localStorage.getItem("userName") //|| "sdasd";
  const checkUser = () => {
    if (userName !== null) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <ul>
          <LinkItem key={"offermaker"} to={"/offermaker"}>
            Create Offer
          </LinkItem>
          <LinkItem className={"tittle"} key={"home"} to={"/"}>
            GameStore
          </LinkItem>
          {login ? (
            <LinkItem key={"user"} to={"/login"}>
              Login
            </LinkItem>
          ) : (
            <LinkItem key={"account"} to={""} content={AccountContent()}>
              {userName}
            </LinkItem>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
