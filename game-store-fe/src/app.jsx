import { Outlet } from 'react-router-dom';
import './app.css';
import NavBar from './components/NavBar/Navbar';
import { SnackbarProvider } from 'notistack';
import { SnackbarConfigs } from './utils/snackbars.jsx';
const App = () => {
  return (
    <>
      <SnackbarProvider dense maxSnack={3} autoHideDuration={3000}>
        <SnackbarConfigs>
          <NavBar />
          <div className="container-fluid">
            <Outlet />
          </div>
        </SnackbarConfigs>
      </SnackbarProvider>
    </>
  );
};

export default App;
