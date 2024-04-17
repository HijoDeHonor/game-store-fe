import React from "react";
import DB-Offer-simul from "../utils/DB-Offer-simul";

const Offer = (offer) => {
    
  return (
    <tr>
      <td>{offer.id}</td>
      <td>{offer.Offer}</td>
      <td>{offer.Request}</td>
      <td><button onClick={()=> Confirm()} >Confirm</button></td>
    </tr>
  );
};

export default Offer;
