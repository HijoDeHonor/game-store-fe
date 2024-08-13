import { LOCAL_USERNAME, URL_BACK, URL_OFFERS } from '../utils/textConstants';
import { v4 as uuidv4 } from 'uuid';
export const getOffers = async (pageNumber) => {
  try {
    const offers = await fetch(`${URL_BACK}${URL_OFFERS}${pageNumber}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'aplication/json',
      },
      credentials: 'include'
    });
    if (offers.ok) {
      return offers.json();
    }
  } catch (error) {
    console.log(error);
  }
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
