import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class ProductList extends Component<{}, any> {

    state = {};

    constructor(props: any) {
        super(props);

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

        fetch('/product/all')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}))
    };

    render() {
        const  {products, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>

        return (
            <BootstrapTable data={ products } striped hover condensed pagination>
                <TableHeaderColumn dataField='idProduct' isKey dataAlign="center">ID</TableHeaderColumn>
                <TableHeaderColumn dataField='type' dataAlign="center">Type</TableHeaderColumn>
                <TableHeaderColumn dataField='material' dataAlign="center">MAterial</TableHeaderColumn>
                <TableHeaderColumn dataField='color' dataAlign="center">Color</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataAlign="center">Description</TableHeaderColumn>
                <TableHeaderColumn dataField='price' dataAlign="center">Price</TableHeaderColumn>
                <TableHeaderColumn dataField='discount' dataAlign="center">Discount</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default ProductList;