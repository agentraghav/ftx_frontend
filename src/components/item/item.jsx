import React, {useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {Link, useParams} from 'react-router-dom';
import shopItems from '../../data/data';
import {Image} from 'react-bootstrap';
import './styles.css';
const Item = ({addItem}) => {
  const {id} = useParams();
  let itemData = shopItems.find(shopItem => shopItem.id === id);
  let {name, brand, price, imgsrc, description} = itemData;

  useEffect(() => {
    console.log('id', id);
  });
  return (
    <Row className="item-row">
      <Col md={6}>
        <Image className="item-img" src={imgsrc}></Image>
      </Col>
      <Col md={6}>
        <h1 className="item-head">{brand}</h1>
        <hr className="hr-item" />
        <p className="item-sub">{name}</p>
        <p className="item-sub">
          <i class="fas fa-rupee-sign" /> {price}
        </p>
        <p className="item-desc">{description}</p>
        <button className="add-to" onClick={() => addItem(itemData)}>
          <i class="fas fa-shopping-bag"></i> Add To Cart
        </button>
        <Link to="/cart">
          <button className="add-to">
            <i class="fa fa-check" aria-hidden="true"></i> Checkout
          </button>
        </Link>
      </Col>
    </Row>
  );
};
export default Item;
