import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//main components
import LoginForm from "./pages/login/login.jsx";
import Inventory from "./pages/Inventory/Inventory.jsx";
import OfferMakerWithProvider from "./pages/offerMaker/OfferMaker.jsx";
import OfferList from "./pages/Offer/OfferList.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <LoginForm /> },
      {
        path: "inventory",
        element: <Inventory />,
      },
      { path: "login", element: <LoginForm /> },
      { path: "offers", element: <OfferList /> },
      { path: "offermaker", element: <OfferMakerWithProvider /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
