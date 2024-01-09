import axios from "axios"
import { useState } from "react"
import Auth from '../Components/Auth';
import { setToken } from "../Components/Auth";
import Swal from 'sweetalert2';
import React from "react";
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// const Login =({ onLogin }) => {

function Login({ onLogin }) {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    setValidationError({});

    axios
      .post('http://127.0.0.1:8000/api/login', { email, password })
      .then((response) => {
        const { token } = response.data;
        setToken(token);
        onLogin();
        Swal.fire({
          icon: 'success',
          text: 'Login successful.',
        });
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.status);
        } else {
          Swal.fire({
            text: ['Account not found.'],
            icon: 'error'
          });
        }
        console.log(response.data.error);
      });
  };

  return (
    <div>
      <>
        <Button variant="secondary" onClick={() => setShow(true)}>
          Login
        </Button>

        <Modal
          show={show}
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="" id="login" method="post" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <p className="item">
                <label htmlFor="email"> Email </label>
                <input
                  required
                  className="input-group-text"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p className="item">
                <label htmlFor="password"> Password </label>
                <input
                  required
                  className="input-group-text"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
              <p className="item">
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Login"
                />
              </p>
            </form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}

export default Login;
