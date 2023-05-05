import axios from "axios";
import React, { UseEffect, UseState } from "react";
import { Link } from 'react-router-dom';

export const axiosapi  =  axios.create({
    baseURL: 'localhost',
    headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
       
        
    }
});
export const getToken=()=> {
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token');

}
export function setToken(token) {
    localStorage.setItem('token', token);

}

axiosapi.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export function getShow(id) {

    return axiosapi.get(`http://127.0.0.1:8000/api/detail/${id}`)




}
export function getEdit() {

}
export function getRemove(id) {
   
   return axiosapi.get(`http://127.0.0.1:8000/api/delete/${id}`)
  
}
 

