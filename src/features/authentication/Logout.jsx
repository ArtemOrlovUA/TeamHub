import { HiArrowRightEndOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLoggingOut}>
      {!isLoggingOut ? <HiArrowRightEndOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
