import React, {useContext} from 'react';
import './styles.css';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {Image} from 'react-bootstrap';
import UserContext from '../../context/user-context';
import Button from '@restart/ui/esm/Button';

const Header = ({getCartItems}) => {
  let itemsInCart = getCartItems();
  const {userData, setUserData} = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <Navbar fixed="top" className="nav-style" expand="lg" variant="light">
      <Container>
        <Link to="/">
          <Image
            className="logo-image"
            src="https://cdn.shopify.com/s/files/1/1132/3440/t/4/assets/logo.png?v=16492789083930716568"
            responsive
          />
        </Link>
        {userData.user ? (
          <>
            <Nav className="justify-content-end">
              <Link to="/">
                <li className="nav-links">Home</li>
              </Link>
              <Link to="/shop">
                <li className="nav-links">Shop</li>
              </Link>
              <Link to="/about">
                <li className="nav-links">About Us</li>
              </Link>
              <Link to="/orders">
                <li className="nav-links">Your Orders</li>
              </Link>
              <Link to="/cart">
                <li className="cart">
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                  {itemsInCart ? `${itemsInCart}` : null}
                </li>
              </Link>
              <Button onClick={logout} className="nav-links" style={{backgroundColor: 'white', border: 'none', marginLeft: 30}}>
                Log Out
              </Button>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="justify-content-end">
              <Link to="/login">
                <li className="nav-links">Sign In</li>
              </Link>
              <Link to="/register">
                <li className="nav-links">Sign Up</li>
              </Link>
            </Nav>
          </>
        )}
      </Container>
    </Navbar>
  );
};
export default Header;
