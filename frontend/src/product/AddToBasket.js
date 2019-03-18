import React from "react";

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
    window.location.reload();
};