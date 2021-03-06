import React, {useState, useContext} from 'react';
import UserContext from '../../context/user-context';
import {Row, Col, Image} from 'react-bootstrap';
import './styles.css';
import axios from 'axios';
import Loader from 'react-loader-spinner';

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Cart = ({cartItems, removeItem, addItem, resetCart}) => {
  let cartTotal = cartItems.map(itemData => itemData.price * itemData.quantity).reduce((a, b) => a + b, 0);
  console.log(cartItems);
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('auth-token');
  const {userData} = useContext(UserContext);
  const [amount] = useState(cartTotal);
  const [loading, setLoading] = useState(false);
  const name = userData.user.name;

  const orderURL = process.env.REACT_APP_BASEURL + '/api/order';

  const updateOrder = async () => {
    const payload = [];
    cartItems.map(itemData => {
      payload.push({productId: itemData.id, quantity: itemData.quantity, price: itemData.price});
    });
    console.log(token);
    try {
      const res = await axios.post(
        orderURL,
        {userId, products: payload},
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      if (res) {
        alert('Your Order has been placed successfully!');
        window.location = '/orders';
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const displayRazorpay = async () => {
    setLoading(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }
    const razorpayURL = process.env.REACT_APP_BASEURL + '/razorpay';
    const {data} = await axios.post(razorpayURL, {amount: amount});
    console.log(data);
    if (data.amount !== undefined) {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Hebe',
        description: 'Thank you for shopping with us',
        image: 'https://cdn.shopify.com/s/files/1/1132/3440/t/4/assets/logo.png?v=16492789083930716568',
        handler: function (response) {
          resetCart();
          updateOrder();
        },
        prefill: {
          name,
          email: 'sdfdsjfh2@ndsfdf.com',
          phone_number: '9899999999',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
    setLoading(false);
  };

  return (
    <>
      <Row className="cart-row" style={{marginTop: 200, padding: 30, paddingTop: 100, paddingBottom: 100}}>
        <Col md={12}>
          <h1 style={{textAlign: 'center', marginLeft: '0px'}} className="heading-main">
            Your Cart
          </h1>
          <hr className="cart-hr" />
        </Col>
        {cartItems.map(cartItem => {
          let {id, name, brand, price, imgsrc} = cartItem;
          return (
            <>
              <Col lg={12}>
                <Col md={6}>
                  <Image className="cart-img" src={imgsrc} />
                </Col>
                <Col md={6}>
                  <h1 className="cart-head">{brand}</h1>
                  <p className="cart-sub">{name}</p>
                  <p className="cart-sub">
                    <i class="fas fa-rupee-sign" /> {price}
                  </p>
                  <div>
                    <button className="cart-quan" onClick={() => removeItem(cartItem)}>
                      -
                    </button>
                    <p className="cart-inc-dec">Quantity : {cartItem.quantity}</p>
                    <button className="cart-quan" onClick={() => addItem(cartItem)}>
                      +
                    </button>
                  </div>
                </Col>
                <hr className="hr-item" />
              </Col>
            </>
          );
        })}

        {cartItems.length > 0 ? (
          <Col md={12}>
            <p className="pay">
              Total Amount : <i class="fas fa-rupee-sign" />
              {Math.round(cartTotal * 100) / 100}
            </p>

            <button onClick={displayRazorpay} className="add-to-pay">
              {loading ? <Loader type="Puff" color="white" height={20} width={20} /> : 'Pay'}
            </button>
          </Col>
        ) : (
          <Col md={12}>
            <h1 className="empt">Cart Is Empty</h1>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Cart;
