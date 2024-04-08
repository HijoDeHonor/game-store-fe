import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './pages/login/login.jsx'
import RegisterForm from './pages/register/register.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginForm />
    <RegisterForm />
  </React.StrictMode>,
)
