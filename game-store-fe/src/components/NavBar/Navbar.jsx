import { useState, useEffect } from 'react';
import LinkItem from './components/LinkItem';
import AccountContent from './components/AccountContent';
import './NavBar.css';
import { CREATE_OFFER_NAV, GAMESTORE, HOME, LOCAL_USERNAME, LOG_IN, LOGIN, OFFERMAKER } from '../../utils/textConstants';
import { useNavBarProvider } from './navbarProvider/navbarProvider';

const NavBar = () => {
  const [login, setLogin] = useState(false);
  const { userName } = useNavBarProvider();
  const checkUser = () => {
    let userLog = userName;
    if (userLog !== null && userLog !== '') {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, [userName]);

  return (
    <nav className="nav">
      <div className="nav-wrapper">
        <ul>
          <LinkItem key={ 'offermaker' } to={ OFFERMAKER }>
            {CREATE_OFFER_NAV}
          </LinkItem>
          <LinkItem className={ 'tittle' } key={ 'home' } to={ HOME }>
            {GAMESTORE}
          </LinkItem>
          { login ? (
            <LinkItem key={ 'account' } to={ '' } content={ <AccountContent /> }>
              { localStorage.getItem(LOCAL_USERNAME) }
            </LinkItem>
          ) : (
            <LinkItem key={ 'user' } to={ LOGIN }>
              {LOG_IN}
            </LinkItem>
          ) }
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
