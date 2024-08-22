import { createContext, useState, useContext } from 'react';


const NavBarProvider = createContext();


export const NavBarContextProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

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
