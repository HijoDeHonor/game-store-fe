import { HOME, LOCAL_USERNAME, MY_INVENTORY } from '../../../utils/textConstants';
import CustomLink from './CustomLink';
import { useNavigate } from 'react-router-dom';
const AccountContent = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="content">
        <CustomLink
          to={'inventory'}
          tittle={MY_INVENTORY}
          className={'content'}
        />
      </div>
      <div>
        <p
          className="content"
          onClick={() => {
            localStorage.removeItem(LOCAL_USERNAME);
            if (
              localStorage.getItem(LOCAL_USERNAME) === null
            ) {
              navigate(HOME);
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
