import React, { useEffect, useState } from "react";
import axios from "axios";
import Remove from "./Remove";
import CreateProduct from "./CreateProduct";
import { axiosapi } from "./Auth";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Show from "./Show";
import EditProduct from "./EditProduct";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Products() {
  const [post, setPost] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  async function getProducts() {
    try {
      const response = await axiosapi.get(
        "http://127.0.0.1:8000/api/products"
      );
      console.log(response);
      setPost(response.data);
      setIsAuthorized(true);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: "error",
      });
      setIsAuthorized(false);
      setShowModal(false);
    }
  }

  useEffect(() => {
  }, []);

  function handleButtonClick() {
    setIsAuthorized(false);
    setShowModal(true);
    getProducts();
  }

  return (
    <div>
      <div className="container">
        <>
          <Button variant="success" onClick={handleButtonClick}>
            Products
          </Button>
          <Modal
            size="lg"
            show={showModal && isAuthorized}
            onHide={() => setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Products
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h1>Products</h1>
              <CreateProduct setPost={setPost} />
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col-3">ID</th>
                    <th scope="col-3">NAME</th>
                    <th scope="col-3">PRICE</th>
                    <th scope="col-2">DESCRIPTION</th>
                    <th scope="col-2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {post.map((product, i) => (
                    <tr key={i}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.description}</td>
                      <td>
                        <div class="row">
                          <div class="col-md-3">
                            <Show product={product} />
                          </div>
                          <div class="col-md-3 col-sm-2">
                            <EditProduct setPost={setPost} product={product} />
                          </div>
                          <div class="col-md-3 col-sm-2">
                            <Remove setPost={setPost} id={product.id} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Products;
