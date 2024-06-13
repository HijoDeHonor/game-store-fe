import React, { useState, useEffect } from "react";
import LinkItem from "./components/LinkItem";
import AccountContent from "./components/AccountContent";
import "./NavBar.css";

const NavBar = () => {
  const [login, setLogin] = useState(false);

  const checkUser = () => {
    let userName = localStorage.getItem("userName");
    if (userName !== null) {
      setLogin(true);
    } else {
      setLogin(false);
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
            <LinkItem key={"account"} to={""} content={<AccountContent />}>
              {localStorage.getItem("userName")}
            </LinkItem>
          ) : (
            <LinkItem key={"user"} to={"/login"}>
              Login
            </LinkItem>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
