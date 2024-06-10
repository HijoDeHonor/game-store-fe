import { Outlet } from "react-router-dom";
import "./app.css";
import NavBar from "./components/NavBar/Navbar";
const App = () => {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
