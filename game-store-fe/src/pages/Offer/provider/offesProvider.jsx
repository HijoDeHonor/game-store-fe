import { createContext, useState, useContext } from 'react';

const OffersProviderContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offersList, setOffersList] = useState([]);

  const updateOffers = (newValue) => {
    setOffersList(newValue);
  };

  return (
    <OffersProviderContext.Provider value={{ offersList, updateOffers }}>
      {children}
    </OffersProviderContext.Provider>
  );
};

export const useOffersProvider = () => {
  return useContext(OffersProviderContext);
};
