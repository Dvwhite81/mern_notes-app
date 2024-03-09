import { useEffect, useState } from 'react';
import { redirect, Route, Routes } from 'react-router-dom';
import { UserType } from './utils/types';
import userService from './services/userService';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Notification from './components/Notification';
import Profile from './pages/Profile';
import Register from './pages/Register';
import SideBar from './components/SideBar';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [mainWidth, setMainWidth] = useState<string>('100%');
  const [mainMargin, setMainMargin] = useState<string>('0');
  const [message, setMessage] = useState<string | null>(null);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('token');
    setMessage('Logged Out!');
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const data = await userService.getUserByToken(token);

        if (data.success) {
          const { user } = data;
          setLoggedInUser(user);
        }
      } else {
        setLoggedInUser(null);
      }
    };

    checkLoggedIn();
    redirect('/');
  });

  useEffect(() => {
    if (sidebarVisible) {
      setMainWidth('calc(100% - var(--sidebar-width))');
      setMainMargin('var(--sidebar-width)');
    } else {
      setMainWidth('100%');
      setMainMargin('0');
    }
  }, [sidebarVisible]);

  return (
    <div id='app'>
      <NavBar
        loggedInUser={loggedInUser}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />
      <Notification message={message} setMessage={setMessage} />
      <div id='main-page'>
        <SideBar sidebarVisible={sidebarVisible} />
        <div
          style={{
            height: 'var(--main-height)',
            marginLeft: mainMargin,
            width: mainWidth,
          }}
        >
          <Routes>
            <Route path='/' element={<Home loggedInUser={loggedInUser} />} />
            {loggedInUser ? (
              <Route
                path='/profile'
                element={<Profile loggedInUser={loggedInUser} />}
              />
            ) : (
              <>
                <Route
                  path='/register'
                  element={
                    <Register
                      setLoggedInUser={setLoggedInUser}
                      setMessage={setMessage}
                    />
                  }
                />
                <Route
                  path='/login'
                  element={
                    <Login
                      setLoggedInUser={setLoggedInUser}
                      setMessage={setMessage}
                    />
                  }
                />
              </>
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
