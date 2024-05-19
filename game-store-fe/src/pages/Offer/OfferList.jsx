import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getOffers } from "../../services/offerService";
import Offer from "./components/Offer";
import Pagination from "./components/Pagination";
import LoadingSpinner from "../../components/Spinner";

import "./offer.css";

function OfferList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOffers = async () => {
    try {
      const offersData = await getOffers(currentPage);
      setCurrentPage(offersData.currentPage);
      setTotalPages(offersData.totalPages);
      setOffers(offersData.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [currentPage]);

  const goToPage = (targetPage) => {
    if (isLoading === true) {
      console.log("se evito la carga de datos");
      return;
    }

    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > totalPages) {
      targetPage = totalPages;
    }
    setIsLoading(true);
    setCurrentPage(targetPage); // Actualizar currentPage
    document.querySelector(".offer-list").scrollTop = 0;
  };

  return (
    <div className="offer-container">
      <div className="offer-list">
      <Table className="table" {...(!isLoading && { striped: true, hover: true })}>
          <thead className="t-head">
            <tr>
              <th className="th-id">#</th>
              <th className="th-offer">Offer</th>
              <th className="th-offer">Request</th>
              <th></th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody className="tbody">
              <tr className="tr-spinner">
                <td>
                  <span>
                    <LoadingSpinner />
                  </span>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tbody">
              {offers.map((offer) => (
                <Offer key={offer.Id} offer={offer} />
              ))}
            </tbody>
          )}
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
