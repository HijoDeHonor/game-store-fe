import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./app.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
//main components
import LoginForm from "./pages/login/login.jsx";
import RegisterForm from "./pages/register/register.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import OfferList from "./pages/Offer/OfferList.jsx";
import OfferMakerWithProvider from "./pages/offerMaker/OfferMaker.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "inventory", element: <Inventory /> },
      { path: "offers", element: <OfferList /> },
      { path: "offermaker", element: <OfferMakerWithProvider /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
