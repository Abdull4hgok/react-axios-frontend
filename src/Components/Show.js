import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import {getShow} from "./Auth"
import { setToken } from "./Auth";
import Auth from "./Auth";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Show(props) {
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams()
    const [show, setShow] = useState(false);
     const product = props.product 
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [validationError,setValidationError] = useState({})
    useEffect(()=>{
      fetchProduct()
    },[])
  
    const fetchProduct = async () => {
      
     
      getShow(id).then((data)=>{
        const { name, price, description } = data.data
        setName(name)
        setPrice(price)
        setDescription(description)
        
      }).catch(({response})=>{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
        navigate("/products")

      })
    }

      return (
        <div className="container">
          <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Show
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Product Show
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Show Product</h4>
                <hr />
                <div className="form-wrapper">
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
              <div class="card-body">
                <h5 class="card-title">Name:{product.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Price:{product.price}</h6>
                <p class="card-text">Description:{product.description}</p>
                
              </div>

                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
        </Modal.Body>
      </Modal>
    </>
       
                  </div>
                  
      );
} 

export default Show;