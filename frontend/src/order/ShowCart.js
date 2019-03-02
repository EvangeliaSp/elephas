import React, {Component} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

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
                <BootstrapTable data={ items } striped hover condensed pagination>
                    <TableHeaderColumn dataField='idOrderItem' isKey dataAlign="center">ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='quantity' dataAlign="center">Quantity</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataAlign="center">Price</TableHeaderColumn>
                    {/*<TableHeaderColumn dataField='discount' dataAlign="center">Discount</TableHeaderColumn>*/}
                </BootstrapTable>
                <Footer/>
            </div>
        );
    }

}

export default ShowCart;