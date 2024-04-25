import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import json from "../../services/DB-Offer-simul.json";
import Offer from "./components/Offer";
import Pagination from "./components/Pagination";

import "./offer.css";

function OfferList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(json.length / itemsPerPage);

  const displayOffers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return json.slice(startIndex, endIndex);
  };

  const goToPage = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="offer-container">
      <div className="offer-list">
        <Table className="table" striped hover>
          <thead className="t-head">
            <tr>
              <th className="th-id">#</th>
              <th className="th-offer">Offer</th>
              <th className="th-offer">Request</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {displayOffers().map((offer) => (
              <Offer key={offer.Id} offer={offer} />
            ))}
          </tbody>
        </Table>
      </div>
      <div className="page-btn-container">
        <div className="page-btn">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>
    </div>
  );
}

export default OfferList;
