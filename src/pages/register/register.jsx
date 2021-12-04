import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../../context/user-context';
import './styles.css';
import {Col} from 'react-bootstrap';
const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [validated, setValidated] = useState(false);
  const [match, setMatch] = useState(true);
  const [passCheck, setPassCheck] = useState(true);
  const [emailCheck, setEmailMatch] = useState(true);
  const [nameCheck, setNameCheck] = useState(true);
  const {setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASEURL;

  const submit = async e => {
    e.preventDefault();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (name && name.length > 0) {
      setNameCheck(true);
    } else {
      setNameCheck(false);
    }

    if (email && regex.test(email)) {
      setEmailMatch(true);
    } else {
      setEmailMatch(false);
    }

    if (password && password?.length <= 5) {
      setPassCheck(false);
    } else {
      setPassCheck(true);
    }

    if (passwordCheck && password === passwordCheck) {
      setMatch(true);
    } else {
      setMatch(false);
    }

    if (match && passCheck && emailCheck && nameCheck) {
      setValidated(true);
    } else {
      setValidated(false);
    }
    console.log(validated);
    if (validated) {
      try {
        const newUser = {email, password, passwordCheck, name};
        const regURL = baseURL + '/users/register';
        const loginURL = baseURL + '/users/login';
        await axios.post(regURL, newUser);
        const loginResponse = await axios.post(loginURL, {
          email,
          password,
        });
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
    <Col className="font" style={{marginTop: 200, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Form style={{width: 400}} onSubmit={submit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            autoFocus
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
          {!nameCheck && <div style={{color: 'red'}}>Please enter valid name.</div>}
        </Form.Group>
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
          {!passCheck && <div style={{color: 'red'}}>Your password should be of more than 5 characters</div>}
        </Form.Group>
        <Form.Group required style={{marginTop: 50}} size="lg" controlId="password">
          <Form.Label>Renter Password</Form.Label>
          <Form.Control
            required
            type="password"
            value={passwordCheck}
            onChange={e => {
              setPasswordCheck(e.target.value);
            }}
          />
          {!match && <div style={{color: 'red'}}>Password doesn't match</div>}
        </Form.Group>
        <Button style={{marginTop: 50, width: 400, backgroundColor: '#000', border: 2}} block size="lg" type="submit">
          Login
        </Button>
        {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
      </Form>
    </Col>
  );
};
export default Register;
