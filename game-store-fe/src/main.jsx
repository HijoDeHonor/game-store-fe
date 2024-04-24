import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import OfferList from './pages/Offer/OfferList'
import 'bootstrap/dist/css/bootstrap.min.css';
import Inventory from './pages/Invetory/Inventory'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OfferList />
  </React.StrictMode>,
)
