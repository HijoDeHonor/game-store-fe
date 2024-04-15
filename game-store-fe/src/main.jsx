import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginForm from "./pages/login/Login.jsx";
import ToggleButton from "./components/ToggleBtn.jsx";

const styles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(modalRoot);

const App = () => {
  return (
    <React.StrictMode>
      <ToggleButton on="My items" off="All items" onClick={() => {}} />
    </React.StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<App />);
