import React, {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {Row, Col} from 'react-bootstrap';
import Card from '../../components/card/card';
import './styles.css';
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth-token');
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token]);

  const dummy = [
    {
      text: 'Crystals',
      src: 'https://images.pexels.com/photos/4040586/pexels-photo-4040586.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      text: 'Fabrics',
      src: 'https://images.pexels.com/photos/6461392/pexels-photo-6461392.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
    {
      text: 'Utilities',
      src: 'https://images.pexels.com/photos/4906332/pexels-photo-4906332.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    },
  ];

  return (
    <>
      <Row className="mid-cont">
        <Col className="bk" md={12}>
          <h1 className="heading">
            <span className="in-head">Deals</span> of the Day
          </h1>
          <Link to="/shop">
            <p className="shop-link">Shop Now</p>
          </Link>
        </Col>
      </Row>

      <Row style={{height: 100, marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h1 className="heading-cat">Categories</h1>
      </Row>
      <Row>
        {dummy.map((item, index) => (
          <Card key={index} src={item.src} text={item.text} />
        ))}
      </Row>
      <Row className="para">
        <Col md={12}>
          <h1 className="para-head">Shop At Hebe.</h1>
        </Col>
      </Row>
    </>
  );
};
export default Home;
