import React, {Component} from 'react';
import Header from "../components/Header";
import {MDBBtn} from "mdbreact";
import './ShowCart.css'

class ShowCart extends Component {

    state = {};

    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadCartFromServer()
    }

    loadCartFromServer = () => {
        this.setState({isLoading: true});

        fetch(`/order/showBasketItems?idUser=81`)
            .then(response => response.json())
            .then(data => this.setState({items: data, isLoading: false}))
    };

    render() {
        const  {items, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>

        return (
            <div>
                <Header/>
                <div>
                    <table className="table table-striped ">

                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><img src={"https://i.pinimg.com/originals/96/f5/91/96f5916ce8fcc48004451e9a4895fd68.jpg"} width="200" height="100"/>  </td>
                                <td>{item.name}</td>
                                <td>{item.price} kr</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity*item.price} kr</td>
                                <td><MDBBtn color={"danger"} variant="primary" href="#addToBasket" >Remove</MDBBtn></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default ShowCart;