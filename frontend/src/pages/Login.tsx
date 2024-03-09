import { SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthResult, UserType } from '../utils/types';
import userService from '../services/userService';
import FormInput from '../components/FormInput';

interface LoginProps {
  setLoggedInUser: (user: UserType) => void
  setMessage: (message: string) => void
}

const Login = ({ setLoggedInUser, setMessage }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    if (username === '' || password === '') {
      setMessage('Please enter a username and password');
      return;
    }

    const result: AuthResult | undefined = await userService.login(
      username,
      password
    );

    if (result) {
      const { success, message } = result;
      if (success) {
        const { user, token } = result;
        if (user && token) {
          setLoggedInUser(user);
          localStorage.setItem('token', token);
          navigate('/');
        }
      }

      setMessage(message);
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    handleLogin(username, password);
  };

  return (
    <div className='page login-page'>
      <form className='user-form' onSubmit={handleSubmit}>
        <FormInput
          label='Username'
          type='text'
          value={username}
          setValue={setUsername}
        />
        <FormInput
          label='Password'
          type='password'
          value={password}
          setValue={setPassword}
        />
        <button type='submit' className='btn'>Log In</button>
      </form>
      <p className='center'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
