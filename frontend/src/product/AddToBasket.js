import React from "react";
import {Redirect} from 'react-router-dom';
import ProductGrid from "./ProductGrid";
import ShowCart from '../order/ShowCart'

export const myBasket = (idItem) => {
    const idUser = localStorage.getItem('idUser');
    
    if (idUser === 'undefined' || idUser == null) {
        // return <Redirect to={ ShowCart }/>
        window.location.href=`/order/cart`;
    }

    const options = {
        method: 'POST'
    };

    fetch(`/order/addToBasket?idUser=${idUser}&productId=${idItem}`, options)
        .then((response) => {
        });
    return <Redirect to={ ProductGrid }/>

};