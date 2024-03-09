import { UserType } from '../utils/types';

interface HomeProps {
  loggedInUser: UserType | null
}

const Home = ({ loggedInUser }: HomeProps) => {
  console.log('loggedInUser:', loggedInUser);

  return (
    <div className='page home-page'>
    </div>
  );
};

export default Home;
