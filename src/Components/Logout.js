import React, { useEffect} from "react";
import Login from "./Login";
import { axiosapi } from './Auth';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button'

const Logout =({ onLogout }) => {
   
   useEffect(()=>{
     
   }, [])

   function getLogout() {
      axiosapi.post(`http://127.0.0.1:8000/api/logout`).then((response) => {
         localStorage.removeItem("token");
         onLogout(); // App componentindeki loggedIn state'ini false olarak güncelliyoruz
         Swal.fire({
            icon: "success",
            text: response.data.message
         }).then(() => {
            // sayfayı yenilemek için kullanıyoruz
         });
      }).catch(({ response }) => {
         Swal.fire({
            text: response.data.message,
            icon: "error"
         });
      })
   }
      
   return (
      <div>
         <Button variant="danger" onClick={() => { getLogout() }}>Logout</Button>
      </div>
   )
}

export default Logout; 
