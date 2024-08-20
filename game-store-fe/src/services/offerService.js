import errorModal from '../utils/401ErrorModal';
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
    if (!newOffer.ok) {
      if (newOffer.status === 401) {
        errorModal(() => {
          localStorage.removeItem(LOCAL_USERNAME);
          window.location.href = '/login';
        },()=>{
          localStorage.removeItem(LOCAL_USERNAME);
          window.location.href = '/';
        });
      }
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const acceptTrade = async (Id, userName) => {
  try {
    const tradeAcepted = await fetch(`${URL_BACK}${URL_OFFERS}${Id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ userName: userName })
    });
    if (tradeAcepted.ok) {
      return true;
    } if (!tradeAcepted.ok) {
      if (tradeAcepted.status === 401) {
        errorModal();
      }
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
