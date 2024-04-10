import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './pages/login/Login.jsx'
import MyInventory from './components/Inventory.jsx'
import SearchBar from './components/SearchBar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchBar filterKey="nombre" />
  </React.StrictMode>,
)
