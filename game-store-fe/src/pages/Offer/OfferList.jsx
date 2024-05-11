import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getOffers } from "../../services/offerService";
import Offer from "./components/Offer";
import Pagination from "./components/Pagination";

import "./offer.css";

function OfferList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getOffers(currentPage);
        setCurrentPage(offersData.currentPage);
        setTotalPages(offersData.totalPages); 
        setOffers(offersData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOffers();
  }, [currentPage]);

  const goToPage = (targetPage) => {
    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > totalPages) {
      targetPage = totalPages;
    }
    setCurrentPage(targetPage); // Actualizar currentPage
    document.querySelector(".offer-list").scrollTop = 0;
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
          <tbody className="tbody">
            {offers.map((offer) => (
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

