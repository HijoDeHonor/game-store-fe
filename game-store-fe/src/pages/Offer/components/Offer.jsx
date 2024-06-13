import React from "react";
import Item from "../../../components/Item/Item";
import tradeMake from "./tradeMake";
import { useNavigate } from "react-router-dom";

const Offer = ({ offer }) => {
  const { Id, Offer, Request, UserNamePoster } = offer;

  const navigate = useNavigate();

  const Confirm = (Id, Offer, Request, UserNamePoster) => {
    tradeMake(Id, Offer, Request, UserNamePoster);
  };

  const handleConfirmTrade = () => {
    if (localStorage.getItem("GameStore-userName") === null) {
      navigate("/login");
      window.location.reload();
    } else {
      Confirm(Id, Offer, Request, UserNamePoster);
    }
  };

  return (
    <tr className="tr-table">
      <td className="td-id">{Id}</td>
      <td className="td-offer">
        <div className="item-container-offer">
          {Offer.map((item, index) => (
            <Item key={index} item={item} top="43%" imageWidth="40px" />
          ))}
        </div>
      </td>
      <td className="td-request">
        <div className="item-container-request">
          {Request.map((item, index) => (
            <Item key={index} item={item} top="43%" imageWidth="40px" />
          ))}
        </div>
      </td>
      <td className="td-btn">
        <div className="buttons-container">
          <button className="btn-trade" onClick={() => handleConfirmTrade()}>
            TRADE
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Offer;
