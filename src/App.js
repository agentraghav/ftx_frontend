import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Header from './components/header/header';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import UserContext from './context/user-context';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const checkLoggedIn = async () => {
    let token = localStorage.getItem('auth-token');
    if (token === null) {
      localStorage.setItem('auth-token', '');
      token = '';
    }
    const tokenURL = process.env.baseUrl + '/users/tokenIsValid';
    const userDataURL = process.env.baseUrl + '/users/';
    const tokenResponse = await axios.post(tokenURL, null, {headers: {'x-auth-token': token}});
    if (tokenResponse.data) {
      const userRes = await axios.get(userDataURL, {
        headers: {'x-auth-token': token},
      });
      setUserData({
        token,
        user: userRes.data,
      });
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default App;
