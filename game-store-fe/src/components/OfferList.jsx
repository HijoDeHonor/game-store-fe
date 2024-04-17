import React from "react";
import { Table } from "react-bootstrap";

function OfferList () {

    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Offer</th>
            <th>Request</th>
            <th>Confirmation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    )
}

export default OfferList;