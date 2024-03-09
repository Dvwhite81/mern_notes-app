import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '../utils/types';
import LogoutBtn from './LogoutBtn';
import MainLogo from './MainLogo';
import MenuIcon from '../assets/images/white-menu-icon.png';
import '../styles/NavBar.css';

interface NavBarProps {
  loggedInUser: UserType | null;
  handleLogout: () => void;
  toggleSidebar: () => void;
}

const NavBar = ({ loggedInUser, handleLogout, toggleSidebar }: NavBarProps) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav id='navbar'>
      <div className='left navbar-left'>
        {loggedInUser ? (
          <img
            className='icon navbar-icon'
            src={MenuIcon}
            alt='menu icon'
            onClick={toggleSidebar}
          />
        ) : (
          <Link to='/register'>Sign Up</Link>
        )}
      </div>
      <MainLogo />
      <div className='right navbar-right'>
        {!loggedInUser && <Link to='/login'>Log In</Link>}
        {loggedInUser && <LogoutBtn handleLogout={handleLogoutClick} />}
      </div>
    </nav>
  );
};

export default NavBar;
