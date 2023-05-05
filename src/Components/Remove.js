import React from 'react';
import {axiosapi} from "./Auth"
import {setToken} from "./Auth"
import { getRemove } from './Auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import Products from './Products';
// import React, { useEffect, useState } from "react";

export default class Remove extends React.Component {
   
  
  
  handleChange = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    
    const {setPost} = this.props


  
      getRemove(this.props.id).then(res => {
        
        
        console.log(res.data);
        const products = res.data;
        Swal.fire({
          icon:"success",
          text:['Product deleted succesfully.']
        })
        axiosapi.get("http://127.0.0.1:8000/api/products").then((data) => {
      
      console.log(data);
      setPost(data?.data);
    })
      }).catch(({response})=>{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })

      })
  }

  render() {
    
   
        
        
            
            
    return (
      <div> 
        
        <button className="btn btn-danger" name='id' onClick={() => this.handleSubmit()}>Delete</button>
         
      </div>
      
    )




  }
}