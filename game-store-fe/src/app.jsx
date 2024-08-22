import { Outlet } from 'react-router-dom';
import './app.css';
import NavBar from './components/NavBar/Navbar';
import { SnackbarProvider } from 'notistack';
import { SnackbarConfigs } from './utils/snackbars.jsx';
import { NavBarContextProvider } from './components/NavBar/navbarProvider/navbarProvider.jsx';
const App = () => {
  return (
    <>
      <NavBarContextProvider>
        <SnackbarProvider dense maxSnack={3} autoHideDuration={3000}>
          <SnackbarConfigs>
            <NavBar />
            <div className="container-fluid">
              <Outlet />
            </div>
          </SnackbarConfigs>
        </SnackbarProvider>
      </NavBarContextProvider>
    </>
  );
};

export default App;
