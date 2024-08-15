import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

import App from './app.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//main components
import LoginForm from './pages/login/login.jsx';
import RegisterForm from './pages/register/register.jsx';
import Inventory from './pages/Inventory/Inventory.jsx';
import OfferList from './pages/Offer/OfferList.jsx';
import OfferMakerWithProvider from './pages/offerMaker/OfferMaker.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import { HOME, INVENTORY, LOGIN, OFFERMAKER, OFFERS, SIGNIN } from './utils/textConstants.js';

const router = createBrowserRouter([
  {
    path: HOME,
    element: <App />,
    children: [
      { path: OFFERS, element: <OfferList /> },
      { path: LOGIN, element: <LoginForm /> },
      { path: SIGNIN, element: <RegisterForm /> },

      {
        path: INVENTORY,
        element: (
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        ),
      },

      {
        path: OFFERMAKER,
        element: (
          <ProtectedRoute>
            <OfferMakerWithProvider />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
