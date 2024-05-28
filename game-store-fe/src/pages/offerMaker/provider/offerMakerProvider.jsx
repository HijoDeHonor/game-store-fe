import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SET_CURRENT_STAGE,
  SET_FILTERED_DATA,
  SET_OFFER,
  SET_REQUEST,
  SET_SEARCH_QUERY,
  SET_SERVER_ITEMS,
  SET_USER_ITEMS,
  ON_QUANTITY_CHANGE,
  SET_PREVITEMS,
} from "../../../utils/textConstants";
import { getAllItems, getUserItems } from "../../../services/GetAllItems";

const OfferMakerContext = createContext();

const initialState = {
  userItems: [],
  serverItems: [],
  searchQuery: "",
  filteredData: [],
  prevItems: [],
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
    case SET_SEARCH_QUERY: {
      return { ...state, searchQuery: action.data };
    }
    case SET_FILTERED_DATA: {
      return { ...state, filteredData: action.data };
    }
    case ON_QUANTITY_CHANGE:
      return {
        ...state,
        prevItems: action.data,
      };
    case SET_PREVITEMS: {
      return { ...state, prevItems: action.data };
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

  const filterData = () => {
    let listToFilter =
      state.currentStage === 0
        ? state.userItems.filter((item) => item.Quantity !== 0)
        : state.serverItems;
    dispatch({
      type: SET_FILTERED_DATA,
      data: listToFilter.map((item) => ({
        ...item,
        Quantity: 0,
      })),
    });
  };

  useEffect(() => {
    filterData();
  }, [state.searchQuery, state.currentStage, state.userItems]);

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
    console.log(state.offer, "offer");
    console.log(state.prevItems, "previtems");
  }, [state.offer, state.prevItems]);

  useEffect(() => {
    fetchItems();
  }, []);

  const onQuantityChange = (item, newQuantity) => {
    const existInPrevItems = state.prevItems.some(
      (prevItem) => prevItem.Name === item.Name
    );
    if (existInPrevItems) {
      dispatch({
        type: ON_QUANTITY_CHANGE,
        data: state.prevItems.map((prevItem) =>
          prevItem.Name === item.Name
            ? { ...prevItem, Quantity: newQuantity }
            : prevItem
        ),
      });
    } else {
      dispatch({
        type: SET_PREVITEMS,
        data: [...state.prevItems, { ...item, Quantity: newQuantity }],
      });
    }
    const existInFilteredData = state.filteredData.some(
      (filteredItem) => filteredItem.Name === item.Name
    );
    if (existInFilteredData) {
      dispatch({
        type: SET_FILTERED_DATA,
        data: state.filteredData.map((filteredItem) =>
          filteredItem.Name === item.Name
            ? { ...filteredItem, Quantity: newQuantity }
            : filteredItem
        ),
      });
    }
  };

  const addToOfferAndUpdate = () => {
    const itemsToAdd = state.prevItems.filter((item) => item.Quantity !== 0);
    console.log(itemsToAdd);
    if (itemsToAdd.length > 0) {
      const updatedOffer = state.offer.map((offerItem) => {
        const sameItem = itemsToAdd.find(
          (item) => item.Name === offerItem.Name
        );
        if (sameItem) {
          return {
            ...offerItem,
            Quantity: offerItem.Quantity + sameItem.Quantity,
          };
        } else {
          return offerItem;
        }
      });
      const newOfferItems = itemsToAdd.filter(
        (item) =>
          !updatedOffer.some((offerItem) => offerItem.Name === item.Name)
      );
      const updateOfferWithNewItems = [...updatedOffer, ...newOfferItems];
      dispatch({
        type: SET_OFFER,
        data: updateOfferWithNewItems,
      });
      dispatch({
        type: SET_USER_ITEMS,
        data: state.userItems.map((userItem) => {
          const sameItems = itemsToAdd.find(
            (item) => item.Name === userItem.Name
          );
          if (sameItems) {
            return {
              ...userItem,
              Quantity: userItem.Quantity - sameItems.Quantity,
              maxQuantity: userItem.maxQuantity - sameItems.Quantity,
            };
          } else {
            return userItem;
          }
        }),
      });
    } else {
      alert("there is no items selected");
    }
    dispatch({
      type: SET_PREVITEMS,
      data: [],
    });
  };

  const deleteAndUpdate = (item) => {
    dispatch({
      type: SET_OFFER,
      data: state.offer.filter((offeritem) => offeritem.Name !== item.Name),
    });
    dispatch({
      type: SET_PREVITEMS,
      data: state.prevItems.filter((previtem) => previtem.Name !== item.Name),
    });
    dispatch({
      type: SET_USER_ITEMS,
      data: state.userItems.map((userItem) =>
        userItem.Name === item.Name
          ? { ...userItem, Quantity: userItem.Quantity + item.Quantity }
          : userItem
      ),
    });
  };

  const addToRequest = () => {
    const itemsToAdd = state.prevItems.filter((item) => item.Quantity !== 0);
    if (itemsToAdd.length > 0) {
      const updatedRequest = state.request.map((requestItem) => {
        const sameItem = itemsToAdd.find(
          (item) => item.Name === requestItem.Name
        );
        if (sameItem) {
          return {
            ...requestItem,
            Quantity: requestItem.Quantity + sameItem.Quantity,
          };
        } else {
          return requestItem;
        }
      });
      const newRequestItems = itemsToAdd.filter(
        (item) =>
          !updatedRequest.some((requestItem) => requestItem.Name === item.Name)
      );
      const updateRequestWithNewItems = [...updatedRequest, ...newRequestItems];
      dispatch({
        type: SET_REQUEST,
        data: updateRequestWithNewItems,
      });
      dispatch({
        type: SET_PREVITEMS,
        data: [],
      });
    }
  };

  const deleteFromRequest = (item) => {
    dispatch({
      type: SET_REQUEST,
      data: state.request.filter(
        (requestitem) => requestitem.Name !== item.Name
      ),
    });
    dispatch({
      type: SET_PREVITEMS,
      data: state.prevItems.filter((previtem) => previtem.Name !== item.Name),
    });
  };

  const nextStage = () => {
    if (state.currentStage !== 2) {
      console.log(state.request.length);
      const newData =
        state.currentStage === 0 && state.request.length > 0
          ? state.request
          : [];
      dispatch({
        type: SET_PREVITEMS,
        data: newData,
      });

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
      if (state.currentStage === 2) {
        dispatch({
          type: SET_PREVITEMS,
          data: state.request,
        });
      }
      if (state.currentStage === 1) {
        dispatch({
          type: SET_PREVITEMS,
          data: state.offer,
        });
      }
    }
    console.log(state.prevItems);
  };

  const reset = () => {
    dispatch({ type: SET_CURRENT_STAGE, data: 0 });
    dispatch({ type: SET_SEARCH_QUERY, data: "" });
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
        addToOfferAndUpdate,
        onQuantityChange,
        deleteAndUpdate,
        addToRequest,
        deleteFromRequest,
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
