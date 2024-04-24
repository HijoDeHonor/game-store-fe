import React from "react";
import Item from "../../../components/Item";
import tradeMake from "./tradeMake";

const Offer = ({ offer }) => {
  const { Id, Offer, Request, UserNamePoster } = offer;

  const Confirm = (Id, Offer, Request, UserNamePoster) => {
    tradeMake(Id, Offer, Request, UserNamePoster);
  };

  return (
    <tr className="tr-table">
      <td className="td-id">{Id}</td>
      <td className="td-offer">
        <div className="item-container">
          {Offer.map((item, index) => (
            <Item key={index} item={item} top={"76%"} imageWidth="40px" />
          ))}
        </div>
      </td>
      <td className="td-request">
        <div className="item-container">
          {Request.map((item, index) => (
            <Item key={index} item={item} top={"76%"} imageWidth="40px" />
          ))}
        </div>
      </td>
      <td>
        <div className="buttons-container">
          <button
            className="btn-trade"
            onClick={() => Confirm(Id, Offer, Request, UserNamePoster)}
          >
            TRADE
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Offer;
