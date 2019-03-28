import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {myBasket} from './AddToBasket'

class HomePageGrid extends Component {

    state = {};

    constructor(props) {
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

        fetch(`/product/findBy`)
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}))
    };


    ProductCard(product) {
        //TODO: Product name instead of card title
        return (
            <div key={product.idProduct} className="col-sm-6 col-lg-4">
                <Card style={{marginBottom: '2rem'}}>
                    <a href={"/product/findById/" + product.idProduct}>
                        <Card.Img variant="top" src={product.url} style={{height: `20rem`}} />
                    </a>
                    <Card.Body>
                        <Card.Title>
                            <a href={"/product/findById/" + product.idProduct} style={{color: "black"}}>
                                {product.discount === 0 ? product.name : <div>{product.name}<span className="redtext">{" (Discount:" + product.discount + "%)"}</span></div>}
                            </a>
                        </Card.Title>
                        <Card.Text>
                            {product.description}<br/>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {product.discount === 0 ? product.price+"kr": <div style={{float: "left"}}><del>{product.price}</del><b className="redtext">{" " + (product.price-product.discount*product.price/100) + "kr"}</b></div>}
                        <Button variant="primary" onClick={() => myBasket(product.idProduct)} style={{float: 'right'}}>Add to Cart</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }


    render() {
        const {products, isLoading} = this.state;


        if (isLoading)
            return <div className="loading">
                <div className="loader"></div>
            </div>;

        return (
            <div>
                <Container>
                    <Row style={{marginBottom: '7rem'}}>
                        {
                            products.slice(products.length - 6, products.length).map((product) => {
                                return this.ProductCard(product);

                            })
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default HomePageGrid;