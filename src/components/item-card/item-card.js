import React from 'react';
import './styles.css';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import './styles.css';
const ItemCard = ({id, src, text, price}) => {
  return (
    <Col
      md={4}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 400,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
      }}>
      <Link to={`/shop/${id}`}>
        <Image className="rounded mx-auto d-block home-content" src={src} />
      </Link>
      <Col>
        <h2 style={{textAlign: 'center', marginTop: 20}}>{text}</h2>
      </Col>
      <div>
        <div>
          <span className="content-sub">
            {' '}
            <i class="fas fa-rupee-sign" /> {price}
          </span>
        </div>
        <Link to={`/shop/${id}`}>
          <button className="man-butt">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i> Shop-Now
          </button>
        </Link>
      </div>
    </Col>
  );
};
export default ItemCard;
