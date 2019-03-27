import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {ButtonToolbar, ListGroupItem} from "react-bootstrap";
import {Container, MDBBtn} from "mdbreact";
import './ShowCart.css'

class ShowCart extends Component {

    state = {};

    constructor() {
        super();

        this.state = {
            items: [],
            isLoading: true,
            total: '',
            continueRedirect: false,
            proceedRedirect: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("idUser") !== 'undefined' && localStorage.getItem("idUser") !== null) {
            this.loadCartFromServer();
            this.totalCost()
        }
    }

    loadCartFromServer = () => {
        this.setState({isLoading: true});

        const idUser = localStorage.getItem('idUser');

        fetch(`/order/showBasketItems?idUser=${idUser}`)
            .then(response => response.json())
            .then(data => this.setState({items: data, isLoading: false}))
    };

    handleDelete = (idItem) => {
        const idUser = localStorage.getItem('idUser');

        const options = {
            method: 'DELETE'
        };

        fetch(`/order/removeFromBasket?idUser=${idUser}&idOrderItem=${idItem}`, options)
            .then((response) => {
                window.location.reload();
            });
    };

    handleIncrease = (idItem) => {
        const idUser = localStorage.getItem('idUser');

        const options = {
            method: 'PATCH'
        };

        fetch(`/order/increase?idUser=${idUser}&idItem=${idItem}`, options)
            .then((response) => {
                window.location.reload();
            });

    };

    handleDecrease = (idItem) => {
        const idUser = localStorage.getItem('idUser');

        const options = {
            method: 'PATCH'
        };

        fetch(`/order/decrease?idUser=${idUser}&idItem=${idItem}`, options)
            .then((response) => {
                window.location.reload();
            });
    };

    totalCost = () => {
        const idUser = localStorage.getItem('idUser');

        const options = {
            method: 'GET'
        };

        fetch(`/order/total/${idUser}`, options)
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

    proceedOrder = () => {
        const idUser = localStorage.getItem('idUser');

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
        const  {items, isLoading, total, continueRedirect, proceedRedirect} = this.state;

        if (localStorage.getItem("idUser") === 'undefined' || localStorage.getItem("idUser") == null) {
            return (
                <div>
                    <br/>
                    <Container>
                        <div>
                            <table className="table table-striped ">
                                <tHeader><h3 align="center"><b>Shopping cart</b></h3></tHeader>
                                <hr/>
                                <tbody>
                                <br/><br/>
                                <tr>
                                    <h4><b>Your have to <a href="/user/login">sign in</a> or <a href="/user/register">register</a> in order to have a cart and add product inside it.</b></h4>
                                </tr>
                                <br/>
                                </tbody>
                            </table>
                        </div>
                    </Container>
                </div>
            );
        }

        if (isLoading)
            return <div className="loading">
                <div className="loader"></div>
            </div>;

        if (continueRedirect) {
            const { to } = {to: {pathname: '/product'}};
            return <Redirect to={ to }/>
        }

        if (proceedRedirect) {
            window.location.href=`/`;
        }

        if (items.length===0)
            return (
                <div>
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
                </div>
            );

        return (
            <div>
                <br/>
                <Container style={{marginBottom: "7rem"}}>
                    <div>
                        <table className="table table-striped ">
                            <tHeader><h3 align="center"><b>Shopping cart</b></h3></tHeader>
                            <tbody>
                            <br/>
                            {items.map(item => (
                                <tr key={item.idProduct}>
                                    <td><img src={item.url} alt={item.name} width="200" height="150"/>  </td>
                                    <td>{item.name}</td>
                                    <td>{item.finalPrice} kr</td>
                                    <td>
                                        <ButtonToolbar>
                                            {item.quantity===1 ? (
                                                <MDBBtn disabled bsStyle="primary" color="info">-</MDBBtn>
                                            ) : (
                                                <MDBBtn bsStyle="primary" color="info" onClick={() => { this.handleDecrease(item.id) } }>-</MDBBtn>
                                            )}
                                            <ListGroupItem>{item.quantity}</ListGroupItem>
                                            <MDBBtn bsStyle="primary" color="info" onClick={() => { this.handleIncrease(item.id) } }>+</MDBBtn>
                                        </ButtonToolbar>
                                    </td>
                                    <td><b>{item.quantity*item.finalPrice} kr</b></td>
                                    <td><MDBBtn color={"danger"} variant="primary" onClick={() => { this.handleDelete(item.id) } } >Remove</MDBBtn></td>
                                </tr>
                            ))}
                            <br/>
                            <tr>
                                <td>Total <h4><b>{total} kr</b></h4></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><MDBBtn outline color="primary" variant="primary" onClick={this.continueShopping} >Continue Shopping</MDBBtn></td>
                                <td><MDBBtn color="success" variant="primary" onClick={this.proceedOrder} >Check out</MDBBtn></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Container>
            </div>
        );
    }

}

export default ShowCart;
