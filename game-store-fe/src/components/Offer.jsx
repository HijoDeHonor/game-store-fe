import React from "react";
import ItemMini from "./ItemMini";

const Offer = ({ offer }) => {
  const { Id, Offer, Request } = offer;

  const Confirm = () => {
    console.log(offer);
  };

  return (
    <tr>
      <td>{Id}</td>
      <td>
        {Offer.map((item, index) => (
          <ItemMini key={index} item={item} />
        ))}
      </td>
      <td>
        {Request.map((item, index) => (
          <ItemMini key={index} item={item} />
        ))}
      </td>
      <td>
        <button className="btn-trade" onClick={Confirm}>
          Trade
        </button>
      </td>
    </tr>
  );
};

export default Offer;

