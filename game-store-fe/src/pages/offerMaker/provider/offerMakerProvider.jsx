import { createContext, useContext, useReducer } from 'react';
import {
  SET_CURRENT_STAGE,
  SET_OFFER,
  SET_REQUEST,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
} from '../../../utils/textConstants';

const OfferMakerContext = createContext();

const initialState = {
  userItems: [],
  serverItems: [],
  offer: [],
  request: [],
  currentStage: 0,
};

const reducer = (state, action) => {
  // {type, data}
  switch (action.type) {
    case SET_USER_ITEMS: {
      return { ...state, userItems: action.data };
    }
    case SET_SERVER_ITEMS: {
      return { ...state, serverItems: action.data };
    }
    case SET_OFFER:
      return { ...state, offer: action.data };
    case SET_REQUEST:
      return { ...state, request: action.data };
    case SET_CURRENT_STAGE:
      return { ...state, currentStage: action.data };
    default:
      return state;
  }
};

export const OfferMakerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

 

  return (
    <OfferMakerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </OfferMakerContext.Provider>
  );
};
export default OfferMakerProvider;
export const useOfferMaker = () => useContext(OfferMakerContext);
