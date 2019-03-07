import React from "react";
import {Redirect} from 'react-router-dom';
import ProductGrid from "./ProductGrid";

export const myBasket = (idItem) => {
    const idUser = localStorage.getItem('idUser');

    const options = {
        method: 'POST'
    };

    fetch(`/order/addToBasket?idUser=${idUser}&productId=${idItem}`, options)
        .then((response) => {
        });
    return <Redirect to={ ProductGrid }/>

};