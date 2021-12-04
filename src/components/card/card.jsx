import React from 'react';
import './styles.css';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import './styles.css';
const Card = ({src, text}) => {
  return (
    <Col
      md={4}
      style={{display: 'flex', flexDirection: 'column', width: 400, justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <Link to="/shop">
        <Image className="rounded mx-auto d-block home-content" src={src} />
      </Link>
      <div>
        <div>
          <span className="content-sub">{text}</span>
        </div>
        <Link to="/shop">
          <button className="man-butt">
            <i class="fa fa-shopping-bag" aria-hidden="true"></i> Shop-Now
          </button>
        </Link>
      </div>
    </Col>
  );
};
export default Card;
