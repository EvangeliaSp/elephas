import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import elephas2 from './../elephas2.jpg';

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
                    <Card.Img variant="top" src={product.url}
                              style={{height: `20rem`}}
                    />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.description}<br/>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {product.price} kr
                        <Button variant="primary" href="#addToBasket" style={{float: 'right'}}>Add to basket</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }


    render() {
        const {products, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>


        return (
            <div>
                <Container>
                    <Row style={{marginBottom: '7rem'}}>
                        {


                            products.slice(0,6).map((product) => {
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
