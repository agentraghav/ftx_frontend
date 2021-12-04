import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import UserContext from '../../context/user-context';
import {Row, Col} from 'react-bootstrap';
import './styles.css';
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  return (
    <>
      <Row className="mid-cont">
        <Col className="bk" md={12}>
          <h1 className="heading">
            <span className="in-head">Deals</span> of the Day
          </h1>
          <Link to="/shopping_cart/shop">
            <p className="shop-link">Shop Now</p>
          </Link>
        </Col>
      </Row>

      <Col style={{height: 100, marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}} md={12}>
        <h1 className="heading-main">Categories</h1>
      </Col>

      <Row className="para">
        <Col md={12}>
          <h1 className="para-head">Shop At Hebe.</h1>
        </Col>
      </Row>
    </>
  );
};
export default Home;
