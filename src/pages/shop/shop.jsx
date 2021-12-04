import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import './styles.css';
import shopItems from '../../data/data';
import ItemCard from '../../components/item-card/item-card';
const Shop = () => {
  return (
    <>
      <Row>
        <Col className="bk" md={12} />
      </Row>
      <Row style={{display: 'flex', flexDirection: 'column', height: 200, justifyContent: 'center', alignItems: 'center'}}>
        <h1 className="head-shop">Featured Products</h1>
      </Row>
      <Row>
        {shopItems.map(item => {
          let {id, name, price, imgsrc} = item;
          return <ItemCard key={id} id={id} text={name} price={price} src={imgsrc} />;
        })}
      </Row>
    </>
  );
};

export default Shop;
