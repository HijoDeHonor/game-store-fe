import { createContext, useState, useContext, useEffect } from 'react';
import { getUserItems } from '../../../services/itemService';
import { LOCAL_USERNAME } from '../../../utils/textConstants';

const InventoryProviderContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const items = await getUserItems(localStorage.getItem(LOCAL_USERNAME));
      setInventory(items);
    };

    fetchInventory();
  }, []); 

  const updateInventory = (newValue) => {
    setInventory(newValue);
  };

  return (
    <InventoryProviderContext.Provider value={{ inventory, updateInventory }}>
      {children}
    </InventoryProviderContext.Provider>
  );
};

export const useInventoryProvider = () => {
  return useContext(InventoryProviderContext);
};
