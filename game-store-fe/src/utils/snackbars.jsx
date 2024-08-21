import { createContext, useContext } from 'react';
import { useSnackbar } from 'notistack';

const SnackbarContext = createContext();

export const SnackbarConfigs = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const toast = (msg, variant = 'default') => {
    enqueueSnackbar(msg, { variant });
  };

  const success = (msg) => {
    toast(msg, 'success');
  };

  const error = (msg) => {
    toast(msg, 'error');
  };

  const warning = (msg) => {
    toast(msg, 'warning');
  };

  const info = (msg) => {
    toast(msg, 'info');
  };

  return (
    <SnackbarContext.Provider value={{ success, error, warning, info }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);

