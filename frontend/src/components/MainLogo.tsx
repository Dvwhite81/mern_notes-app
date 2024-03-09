import { Link } from 'react-router-dom';
import NotesLogo from '../assets/images/white-notes-logo.png';

const MainLogo = () => {
  return (
    <div id='main-logo-container'>
      <Link to='/'>
        <img id='main-logo' src={NotesLogo} alt='main notes logo' />
      </Link>
    </div>
  );
};

export default MainLogo;
