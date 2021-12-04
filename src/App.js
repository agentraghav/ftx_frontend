import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Header from './components/header/header';
import Home from './pages/home/home';
import Shop from './pages/shop/shop';
import Register from './pages/register/register';
import Login from './pages/login/login';
import Cart from './pages/cart/cart';
import About from './pages/about/about';
import Item from './components/item/item';
import UserContext from './context/user-context';
import Footer from './components/footer/footer';
import YourOrder from './pages/yourOrders/yourOrders';
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
    const tokenURL = process.env.REACT_APP_BASEURL + '/users/tokenIsValid';
    const userDataURL = process.env.REACT_APP_BASEURL + '/users';
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

  let [cartItems, setCartItems] = useState([]);
  const getCartItems = () => {
    return cartItems.map(item => item.quantity).reduce((a, b) => a + b, 0);
  };
  const resetCart = () => {
    setCartItems([]);
  };

  const addItem = item => {
    let itemExist = cartItems.find(cartItem => cartItem.id === item.id);
    if (itemExist) {
      setCartItems(cartItems.map(cartItem => (cartItem.id === item.id ? {...itemExist, quantity: itemExist.quantity + 1} : cartItem)));
    } else {
      setCartItems([...cartItems, {...item, quantity: 1}]);
    }
  };

  const removeItem = item => {
    let itemToRemove = cartItems.find(cartItem => cartItem.id === item.id);
    if (itemToRemove.quantity === 1) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems(
        cartItems.map(cartItem => (cartItem.id === item.id ? {...itemToRemove, quantity: itemToRemove.quantity - 1} : cartItem)),
      );
    }
  };
  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header getCartItems={getCartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop/:id" element={<Item addItem={addItem} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeItem={removeItem} addItem={addItem} resetCart={resetCart} />} />
          <Route path="/orders" element={<YourOrder />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  );
};
export default App;
