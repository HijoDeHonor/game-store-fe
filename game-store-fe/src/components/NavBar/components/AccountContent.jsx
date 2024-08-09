import CustomLink from './CustomLink';
import { useNavigate } from 'react-router-dom';
const AccountContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="content">
        <CustomLink
          to={'inventory'}
          tittle={'My Inventory'}
          className={'content'}
        />
      </div>
      <div>
        <p
          className="content"
          onClick={() => {
            localStorage.removeItem('GameStore-userName');
            document.cookie = 'acces_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            if (
              localStorage.getItem('GameStore-userName') === null
            ) {
              navigate('/');
              window.location.reload();
            }
          }}
        >
          Sign off
        </p>
      </div>
    </div>
  );
};

export default AccountContent;
