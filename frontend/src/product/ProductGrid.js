import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import elephas2 from './../elephas2.jpg';

class ProductGrid extends Component {

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

        fetch('/product/findBy')
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}))
    };


    ProductCard(product) {
        //TODO: Product name instead of card title
        return(
            <div key={product.idProduct} className="col-sm-6 col-lg-4">
            <Card style={{ marginBottom: '2rem'}}>
                <Card.Img variant="top" src={elephas2} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title> 
                    <Card.Text>
                        {product.description}<br/>
                        
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                {product.price} kr
                <Button variant="primary" href="#addToBasket" style={{float:'right'}}>Add to basket</Button>
                </Card.Footer>
            </Card>
            </div>
        );
    }

 

    render() {
        const  {products, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>

        return (
            <Container>
                <Row>
           
           {
                products.map((product) => {
                    return this.ProductCard(product);
                
                })
            }
                </Row>
            </Container>
        );
    }
}

export default ProductGrid;
