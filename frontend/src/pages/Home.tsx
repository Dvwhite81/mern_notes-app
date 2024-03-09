import { Container } from 'react-bootstrap';
import { UserType } from '../utils/types';

interface HomeProps {
  loggedInUser: UserType | null
}

const Home = ({ loggedInUser }: HomeProps) => {
  console.log('loggedInUser:', loggedInUser);

  return (
    <Container fluid>
    </Container>
  );
};

export default Home;
