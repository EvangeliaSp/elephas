import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {ButtonToolbar, ListGroupItem} from "react-bootstrap";
import Header from "../components/Header";
import {Container, MDBBtn} from "mdbreact";
import './ShowCart.css'
import Footer from "../components/Footer";

class ShowCart extends Component {

    state = {};

    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: true,
            total: this.totalCost(),
            continueRedirect: false,
            proceedRedirect: false
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

    handleDelete = (idUser, idItem) => {
        const options = {
            method: 'DELETE'
        };

        fetch(`/order/removeFromBasket?idUser=${idUser}&idOrderItem=${idItem}`, options)
            .then((response) => {
                return <Redirect to={ ShowCart }/>
            });

    }

    handleIncrease = (idUser, idItem) => {
        const options = {
            method: 'PATCH'
        };

        fetch(`/order/increase?idUser=${idUser}&idItem=${idItem}`, options)
            .then((response) => {
                return <Redirect to={ ShowCart }/>
            });

    }

    handleDecrease = (idUser, idItem) => {
        const options = {
            method: 'PATCH'
        };

        fetch(`/order/decrease?idUser=${idUser}&idItem=${idItem}`, options)
            .then((response) => {
                return <Redirect to={ ShowCart }/>
            });

    }

    totalCost = () => {
        const options = {
            method: 'GET'
        };

        fetch(`/order/total/81`, options)
            .then(response =>
                response.json()
            )
            .then(data => this.setState({total: data}))
    };

    continueShopping = () => {
        this.setState({
            continueRedirect: !this.state.continueRedirect
        })
    };

    proceedOrder = (idUser) => {
        const options = {
            method: 'PATCH'
        };

        fetch(`/order/proceed?idUser=${idUser}`, options)
            .then(response =>
                response.json()
            )
            .then(data => this.setState({proceedRedirect: !this.state.proceedRedirect}))
    };

    render() {
        const  {items, isLoading, total, continueRedirect, proceedRedirect} = this.state

        if (isLoading)
            return (<p>Loading...</p>);

        if (continueRedirect) {
            const { to } = {to: {pathname: '/product/findBy'}}
            return <Redirect to={ to }/>
        }

        if (proceedRedirect) {
            const { to } = {to: {pathname: '/'}}
            return <Redirect to={ to }/>
        }

        if (items.length===0 || items==null)
            return (
                <div>
                    <Header/>
                    <br/>
                    <Container>
                        <div>
                            <table className="table table-striped ">
                                <tHeader><h3 align="center"><b>Shopping cart</b></h3></tHeader>

                                <tbody>
                                <br/><br/>
                                <tr>
                                    <h4><b>Your shopping cart is empty.</b></h4>
                                </tr>
                                <br/>
                                <tr>
                                    <td>Total <h4><b>{total} kr</b></h4></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><MDBBtn outline color="primary" variant="primary" onClick={this.continueShopping} >Continue Shopping</MDBBtn></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Container>
                    <Footer/>
                </div>
            );

        return (
            <div>
                <Header/>
                <br/>
                <Container>
                <div>
                    <table className="table table-striped ">
                        <tHeader><h3 align="center"><b>Shopping cart</b></h3></tHeader>

                        <tbody>
                        <br/>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td><img src={"https://i.pinimg.com/originals/96/f5/91/96f5916ce8fcc48004451e9a4895fd68.jpg"} width="200" height="100"/>  </td>
                                <td>{item.name}</td>
                                <td>{item.price} kr</td>
                                <td>
                                    <ButtonToolbar>
                                        <MDBBtn bsStyle="primary" color="info" onClick={() => { this.handleDecrease(81, item.id) } }>-</MDBBtn>
                                        <ListGroupItem>{item.quantity}</ListGroupItem>
                                        <MDBBtn bsStyle="primary" color="info" onClick={() => { this.handleIncrease(81, item.id) } }>+</MDBBtn>
                                    </ButtonToolbar>
                                </td>
                                <td><b>{item.quantity*item.price} kr</b></td>
                                <td><MDBBtn color={"danger"} variant="primary" onClick={() => { this.handleDelete(81, item.id) } } >Remove</MDBBtn></td>
                            </tr>
                        ))}
                        <br/>
                        <tr>
                            <td>Total <h4><b>{total} kr</b></h4></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><MDBBtn outline color="primary" variant="primary" onClick={this.continueShopping} >Continue Shopping</MDBBtn></td>
                            <td><MDBBtn color="success" variant="primary" onClick={() => this.proceedOrder(81)} >Check out</MDBBtn></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                </Container>
                {/*<Footer/>*/}
            </div>
        );
    }

}

export default ShowCart;