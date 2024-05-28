import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SET_CURRENT_STAGE,
  SET_OFFER,
  SET_REQUEST,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
} from "../../../utils/textConstants";
import { getAllItems, getUserItems } from "../../../services/GetAllItems";

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

  const fetchItems = async () => {
    try {
      const userItem = await getUserItems();
      const serverItems = await getAllItems();
      dispatch({
        type: SET_USER_ITEMS,
        data: userItem.map((item) => ({
          ...item,
          maxQuantity: item.Quantity,
        })),
      });
      dispatch({
        type: SET_SERVER_ITEMS,
        data: serverItems,
      });
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const nextStage = () => {
    if (state.currentStage !== 2) {
      console.log(state.request.length);
      const newData =
        state.currentStage === 0 && state.request.length > 0
          ? state.request
          : [];
      dispatch({
        type: SET_CURRENT_STAGE,
        data: state.currentStage + 1,
      });
    }
  };

  const backStage = () => {
    if (state.currentStage !== 0) {
      const newStage = state.currentStage - 1;
      dispatch({
        type: SET_CURRENT_STAGE,
        data: newStage,
      });
    }
  };

  const reset = () => {
    dispatch({ type: SET_CURRENT_STAGE, data: 0 });
    dispatch({ type: SET_SERVER_ITEMS, data: [] });
    dispatch({ type: SET_USER_ITEMS, data: [] });
    dispatch({ type: SET_OFFER, data: [] });
    dispatch({ type: SET_REQUEST, data: [] });
  };

  const resetAllCounts = () => {
    console.log("todo va a cero");
  };

  const confirmCreateOffer = () => {
    alert("genio de la vida ya tenes creada tu oferta papa");
    reset();
  };

  return (
    <OfferMakerContext.Provider
      value={{
        state,
        dispatch,
        nextStage,
        backStage,
        resetAllCounts,
        confirmCreateOffer,
      }}
    >
      {children}
    </OfferMakerContext.Provider>
  );
};
export default OfferMakerProvider;
export const useOfferMaker = () => useContext(OfferMakerContext);
