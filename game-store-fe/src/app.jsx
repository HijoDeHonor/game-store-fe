import { Outlet } from "react-router-dom";
import "./app.css"
const App = () => {
  return (
    <div className="container">
        <Outlet />
    </div>
  );
};

export default App;