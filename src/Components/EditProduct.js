import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import { axiosapi } from './Auth';
import Modal from 'react-bootstrap/Modal';


import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser(props) {
  const navigate = useNavigate();

  
  const {setPost} = props

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [validationError,setValidationError] = useState({})
    const [show, setShow] = useState(false);
    const product = props.product 
    const { id } = product
   
  useEffect(()=>{
    fetchProduct()
  },[])

  const fetchProduct = async () => {
    await axiosapi.get(`http://127.0.0.1:8000/api/detail/${id}`).then((data)=>{
      const { name, price, description } = data.data
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
    }).catch(({response})=>{
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })

    })
  }

  

  const updateProduct = async (e) => {
    e.preventDefault();
    setShow(false)

    const formData = new FormData()
    formData.append('_method', 'POST');
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    

    await axiosapi.post(`http://127.0.0.1:8000/api/update/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:['Product update succesfully.']
      })
      axiosapi.get("http://127.0.0.1:8000/api/products").then((data) => {
      
      console.log(data);
      setPost(data?.data);
    })
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    
    <div className="container">
       <>
      <Button variant="warning" onClick={() => setShow(true)}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
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
                <Form onSubmit={updateProduct}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" value={name} onChange={(event)=>{
                              setName(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control required type="float" as="textarea" rows={3} value={price} onChange={(event)=>{
                              setPrice(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="Description" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control  value={description} onChange={(event)=>{
                              setDescription(event.target.value)
                            }}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
        </Modal.Body>
      </Modal>
    </>
      
    </div>
  )
}