import { Navigate } from 'react-router-dom';
import { LOCAL_USERNAME, LOGIN } from './textConstants';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem(LOCAL_USERNAME);

  if (!isAuthenticated) {
    return <Navigate to= {LOGIN} />;
  }

  return children;
};

export default ProtectedRoute;
