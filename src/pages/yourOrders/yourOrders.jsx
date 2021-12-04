import React, {useState, useEffect} from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import './styles.css';
import data from '../../data/data';
import axios from 'axios';

const YourOrder = () => {
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('auth-token');
  const [orders, setOrders] = useState([]);
  const [amount, setAmount] = useState(0);

  const getOrders = async () => {
    const baseURL = process.env.REACT_APP_BASEURL + `/api/order/${userId}`;
    try {
      const res = await axios.get(baseURL, {
        headers: {
          'x-auth-token': token,
        },
      });
      if (res) {
        setOrders(res.data.products);
        setAmount(res.data.amount);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
    console.log(amount);
    console.log(orders);
  }, []);

  return (
    <>
      <Row className="cart-row" style={{marginTop: 200, padding: 30, paddingTop: 100, paddingBottom: 100}}>
        <Col md={12}>
          <h1 style={{textAlign: 'center', marginLeft: '0px'}} className="heading-main">
            Your Orders
          </h1>
          <hr className="cart-hr" />
        </Col>
        {orders ? (
          orders.map(cartItem => {
            let {productId, quantity, price} = cartItem;
            const dumm = data.find(item => item.id == productId);
            console.log(dumm);
            return (
              <>
                <Col lg={12}>
                  <Col md={6}>
                    <Image className="cart-img" src={dumm?.imgsrc} />
                  </Col>
                  <Col md={6}>
                    <p className="cart-sub">{dumm?.name}</p>
                    <p className="cart-sub">
                      <i class="fas fa-rupee-sign" /> {price}
                    </p>
                    <div>
                      <p className="cart-inc-dec">Quantity : {quantity}</p>
                    </div>
                  </Col>
                  <hr className="hr-item" />
                </Col>
              </>
            );
          })
        ) : (
          <>
            <Col md={12}>
              <h1 className="empt">No Orders Yet :(</h1>
            </Col>
          </>
        )}
        {amount > 0 && (
          <Col md={12}>
            <h2 className="empt">
              {' '}
              Total - <i class="fas fa-rupee-sign" /> {amount}
            </h2>
          </Col>
        )}
      </Row>
    </>
  );
};

export default YourOrder;
