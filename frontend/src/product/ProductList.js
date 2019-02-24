import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ProductList extends Component {

    state = {};

    constructor() {
        super();

        this.state = {
            products: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadProductsFromServer()
    }

    loadProductsFromServer = () => {
        this.setState({isLoading: true});

        fetch('/product/xxxxx')
            //.then(response => response.json())
            //.then(data => this.setState({products: data, isLoading: false}))
            .then(res => res.text())          // convert to plain text
            .then(text => console.log(text))  // then log it out
    };

    render() {
        const  {products, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>

        return (
            <BootstrapTable data={ products } striped hover condensed pagination>
                <TableHeaderColumn dataField='idProduct' isKey dataAlign="center">ID</TableHeaderColumn>
                <TableHeaderColumn dataField='type' dataAlign="center">Type</TableHeaderColumn>
                <TableHeaderColumn dataField='material' dataAlign="center">Material</TableHeaderColumn>
                <TableHeaderColumn dataField='color' dataAlign="center">Color</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataAlign="center">Description</TableHeaderColumn>
                <TableHeaderColumn dataField='price' dataAlign="center">Price</TableHeaderColumn>
                <TableHeaderColumn dataField='discount' dataAlign="center">Discount</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default ProductList;