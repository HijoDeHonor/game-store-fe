import { Outlet } from "react-router-dom";
import "./app.css";
import NavBar from "./components/NavBar/Navbar";
const App = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default App;
