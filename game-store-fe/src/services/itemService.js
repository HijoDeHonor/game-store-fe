import { ADD_ITEM_ERROR, LOCAL_USERNAME, REMOVE_ITEM_ERROR, URL_BACK, URL_SERVER_INVENTORY, URL_USERS_INVENTORY } from '../utils/textConstants';

const addItem = async (item) => {
  try {
    const response = await fetch(`${URL_BACK}${URL_USERS_INVENTORY}${localStorage.getItem(LOCAL_USERNAME)}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body:JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error(ADD_ITEM_ERROR);
    }
  } catch (error) {
    console.log(error);
  }
};

async function removeItem (item) {
  try {
    console.log(item);
    const response = await fetch(`${URL_BACK}${URL_USERS_INVENTORY}${localStorage.getItem(LOCAL_USERNAME)}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error(REMOVE_ITEM_ERROR);
    }
  } catch (error) {
    console.log(error);
  }
}

const getAllItems = async () => {
  try {
    const response = await fetch(`${URL_BACK}${URL_SERVER_INVENTORY}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const items = await response.json();
    
    const allItems = items.map(item => ({
      ...item,        
      Quantity: 0
    }));

    return allItems;
  } catch (error) {
    console.error;
  }
};

const getUserItems = async (userName) => {
  try {
    const response = await fetch(`${URL_BACK}${URL_USERS_INVENTORY}${userName}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    const allItems = await response.json();
    return allItems;
    
  } catch (error) {
    console.error;
  }
};

export { removeItem, addItem, getAllItems, getUserItems };
