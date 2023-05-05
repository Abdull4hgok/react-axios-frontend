import axios from "axios"
import { useState } from "react"
import Auth from '../Components/Auth';
import { setToken } from "../Components/Auth";
import React from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function Register() {
    
  const handleSubmit = e => {
    
    // Prevent the default submit and page reload
    e.preventDefault()
    setShow(false)

    // Handle validations
    
    axios
      .post("http://127.0.0.1:8000/api/register", {name, email, password, password_confirmation })
      .then(response => {
        Swal.fire({
            icon:"success",
            text:response.data.status=['Account creation successful']
          })
        console.log(response.data[0]['token'] );
        setName('')
        setEmail('')
        setPassword('')
        setPassword_confirmation('')
        // Handle response
      }).catch(({response})=>{
        if(response.status===422){
          setValidationError(response.data.error)
        }else{
          Swal.fire({
            text:response.data.error,
            icon:"error"
          })
        }
        console.log(response.data.error);
      })
  }
  const [show, setShow] = useState(false);

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [password_confirmation, setPassword_confirmation] = useState()
  const [validationError,setValidationError] = useState({})

  return (
    <div>
        <>
      <Button variant="dark" onClick={() => setShow(true)}>
       Register
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form action="" id="Register" method="post" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <p className="item">
          <label for="name"> Name </label>
          <input
           class="input-group-text"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            
          />
        </p>
        <p className="item">
          <label for="email"> Email </label>
          <input
           class="input-group-text"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </p>
        <p className="item">
          <label for="password"> Password </label>
          <input
           class="input-group-text"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </p>
        <p className="item" >
          <label for="password_confirmation"> Password confirmation </label>
          <input 
          class="input-group-text"
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            value={password_confirmation}
            onChange={e => setPassword_confirmation(e.target.value)}
          />
        </p>
        <p className="item">

          <input class="btn btn-success" type="submit" value="Register"  />
        </p>
      </form>
      
                  {
                    Object.keys(validationError).length > 0 && (
                      <div className="row">
                        <div className="col-12">
                          <div className="alert alert-danger">
                            <ul className="mb-0">
                              {
                                Object.entries(validationError).map(([key, value])=>(
                                  <li key={key}>{value}</li>   
                                ))
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                  
                  }
        </Modal.Body>
      </Modal>
    </>
     
    </div>
    
  )
}

export default Register
