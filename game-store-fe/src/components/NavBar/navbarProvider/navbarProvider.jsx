import { createContext, useState, useContext } from 'react';
import { LOCAL_USERNAME } from '../../../utils/textConstants';


const NavBarProvider = createContext();


export const NavBarContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(localStorage.getItem(LOCAL_USERNAME));

  const updateUserName = (newValue) => {
    setUserName(newValue);
  };

  return (
    <NavBarProvider.Provider value={{ userName, updateUserName }}>
      {children}
    </NavBarProvider.Provider>
  );
};

export const useNavBarProvider = () => {
  return useContext(NavBarProvider);
};
