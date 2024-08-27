import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { getOffers } from '../../services/offerService';
import Offer from './components/Offer';
import Pagination from './components/Pagination';
import LoadingSpinner from '../../components/Spinner';

import './offer.css';
import { NO_OFFERS, OFFER, REQUEST } from '../../utils/textConstants';
import { useOffersProvider } from './provider/offesProvider';

function OfferList () {
  const { offersList , updateOffers } = useOffersProvider();
  const [offerListed, setOfferListed] = useState(offersList);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  
  
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offersData = await getOffers(currentPage);
        if (
          (typeof offersData !== 'object' || offersData === null) ||
          (typeof offersData.totalOffers !== 'number' || offersData.totalOffers < 0) ||
          (!Array.isArray(offersData.offers))) {
          updateOffers([]);
          setTotalPages(1);
        } else {
          let listOfOffers = offersData.offers;
          listOfOffers = listOfOffers.map((offer, index) => ({
            ...offer,
            IdList: index + 1 + ((currentPage - 1) * 10),
          }));
          updateOffers(listOfOffers);
          const totalOffersCount = offersData.totalOffers;
          const totalPages = Math.ceil(totalOffersCount / 10);
          setTotalPages(totalPages);  
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffers();
  }, [currentPage]);

  useEffect(()=>{
    setOfferListed(offersList);
  }, [offersList]);

  const goToPage = (targetPage) => {
    if (isLoading === true) {
      return;
    }

    if (targetPage < 1) {
      targetPage = 1;
    } else if (targetPage > totalPages) {
      targetPage = totalPages;
    }
    setIsLoading(true);
    setCurrentPage(targetPage);
    document.querySelector('.offer-list').scrollTop = 0;
  };

  return (
    <div className="offer-container">
      <div className="offer-list">
        <Table className="table" {...(!isLoading && { striped: true, hover: true })}>
          <thead className="t-head">
            <tr>
              <th className="th-id">#</th>
              <th className="th-offer">{OFFER}</th>
              <th className="th-offer">{REQUEST}</th>
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
          ) : offerListed.length === 0 ? (
            <tbody>
              <tr className='no-offer'>
                <td>
                  <span>{NO_OFFERS}</span> 
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="tbody">
              {offerListed.map((offer) => (
                <Offer key={offer.Id} offer={offer} setShow={setShow} />
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
      {show ? <div className="transparent-div"> <LoadingSpinner /> </div> : null}
    </div>
  );
}

export default OfferList;
