import json from '../utils/DB-Offer-simul.json';
import { LOCAL_USERNAME, URL_BACK, URL_OFFERS } from '../utils/textConstants';
import { v4 as uuidv4 } from 'uuid';
export const getOffers = async (pageNumber) => {
  return new Promise((resolve) => {
    const currentPage = pageNumber || 1;
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = json.slice(startIndex, endIndex);
    const totalPages = Math.ceil(json.length / itemsPerPage);

    setTimeout(() => {
      resolve({
        data: paginatedData,
        totalPages: totalPages,
        currentPage: currentPage,
      }); 
    }, 1500);
  });
};

export const createOffer = async (offer, request) => {
  try {
    const id = uuidv4();
    const newOffer = await fetch(`${URL_BACK}${URL_OFFERS}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        id: id,
        userName: localStorage.getItem(LOCAL_USERNAME) ,
        offer,
        request
      }),
      credentials: 'include'
    });

    if (newOffer.ok) {
      
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
