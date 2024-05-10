import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getOffers } from "../../services/offerService";
import Offer from "./components/Offer";
import Pagination from "./components/Pagination";

import "./offer.css";

function OfferList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = getOffers(null, true);
  const [offers, setOffers] = useState([]);
  
  // restore this comented code when the back end is ready
  
  // useEffect(() => {
  //   const fetchdata = async() => {
  //     try {
  //       const offers = await getOffers(currentPage, false);
  //       setOffers(offers);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchdata();
  // }, [currentPage]);

  const goToPage = (pageNumber) => {
    let targetPage = pageNumber;
    if (pageNumber < 1) {
      targetPage = 1;
    } else if (pageNumber > totalPages) {
      targetPage = totalPages;
    }
    
    
  
    setTimeout(() => {
      setCurrentPage(targetPage);
      getOffers(targetPage, false);//delete this line when the back end is ready
    }, 1500); // change this value to adjust the delay
  
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
          <tbody>
            {/*delete getOffers and restore this comented code*/}
            {/* {offers.map((offer) => (
              <Offer key={offer.Id} offer={offer} />
            ))} */}
            {getOffers(currentPage, false).map((offer) => (
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
