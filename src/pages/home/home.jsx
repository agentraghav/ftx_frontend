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
      text: 'Metal',
      src: 'data:image/jpeg;base64,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',
    },
    {
      text: 'Fabric',
      src: 'https://c0.wallpaperflare.com/preview/171/907/674/material-textile-curtain-fabrics.jpg',
    },
    {
      text: 'Veggie',
      src: 'https://media.istockphoto.com/photos/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors-picture-id1284690585?k=20&m=1284690585&s=170667a&w=0&h=P0sIhVnd4uE9mpGwroOPW0D45gjSnkZ54PZFpy_-WbY=',
    },
    {
      text: 'Metal',
      src: 'data:image/jpeg;base64,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',
    },
    {
      text: 'Fabric',
      src: 'https://c0.wallpaperflare.com/preview/171/907/674/material-textile-curtain-fabrics.jpg',
    },
    {
      text: 'Veggie',
      src: 'https://media.istockphoto.com/photos/colorful-vegetables-and-fruits-vegan-food-in-rainbow-colors-picture-id1284690585?k=20&m=1284690585&s=170667a&w=0&h=P0sIhVnd4uE9mpGwroOPW0D45gjSnkZ54PZFpy_-WbY=',
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
