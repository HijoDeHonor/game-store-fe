import React from "react";
import { Table } from "react-bootstrap";
import json from "../utils/DB-Offer-simul.json";
import Offer from "./Offer";

function OfferList () {

    return (
        <Table className="table" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer</th>
            <th>Request</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {json.map((offer) => (
            <Offer key={offer.Id} offer={offer} />
          ))}
        </tbody>
      </Table>
    )
}

export default OfferList;