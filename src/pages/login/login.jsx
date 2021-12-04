import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/user-context';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Col} from 'react-bootstrap';

const Login = () => {
  const baseURL = process.env.REACT_APP_BASEURL;
  const [email, setEmail] = useState();
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [emailCheck, setEmailMatch] = useState(true);
  const {setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    if (email && regex.test(email)) {
      setEmailMatch(true);
    } else {
      setEmailMatch(false);
    }
    if (email && emailCheck) {
      try {
        const loginUser = {email, password};
        const loginURL = baseURL + '/users/login';
        const loginResponse = await axios.post(loginURL, loginUser);
        setUserData({
          token: loginResponse.data.token,
          user: loginResponse.data.user,
        });
        localStorage.setItem('auth-token', loginResponse.data.token);
        localStorage.setItem('id', loginResponse.data.user.id);
        navigate('/');
      } catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
      }
    }
  };
  return (
    <Col className="font" style={{marginTop: 300, marginBottom: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Form style={{width: 400}} onSubmit={submit}>
        <Form.Group style={{marginTop: 50}} size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          {!emailCheck && <div style={{color: 'red'}}>Please enter valid email</div>}
        </Form.Group>
        <Form.Group style={{marginTop: 50}} size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button style={{marginTop: 50, width: 400, backgroundColor: '#000', border: 2}} block size="lg" type="submit">
          Login
        </Button>
        {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
      </Form>
    </Col>
  );
};
export default Login;
