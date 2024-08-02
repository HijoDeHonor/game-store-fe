import { Outlet } from "react-router-dom";
import "./app.css";
import NavBar from "./components/NavBar/Navbar";

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <Outlet />
      </div>
    </>
  );
};

export default App;
