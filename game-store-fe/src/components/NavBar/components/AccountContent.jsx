import { HOME, LOCAL_USERNAME, MY_INVENTORY } from '../../../utils/textConstants';
import { useNavBarProvider } from '../navbarProvider/navbarProvider';
import CustomLink from './CustomLink';
import { useNavigate } from 'react-router-dom';
const AccountContent = () => {
  const { updateUserName } = useNavBarProvider();
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
          onClick={ async () => {
            localStorage.removeItem(LOCAL_USERNAME);
            updateUserName('');
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
