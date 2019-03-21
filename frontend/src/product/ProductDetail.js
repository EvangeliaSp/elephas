import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {getColor, getMaterial, getType} from '../Translations';
import "./Product.css"
import {myBasket} from "./AddToBasket";

class ProductDetail extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            product: '',
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadProductFromServer()
    }

    loadProductFromServer = () => {
        this.setState({isLoading: true});
        const { id } = this.props.match.params;
        fetch(`/product/findById?idProduct=${id}`)
            .then(response => response.json())
            .then(data => this.setState({product: data, isLoading: false}))
    };


    ProductDetailCard(product) {
        if( product.discount !== 0) {
            return(
                <div key={product.idProduct} className="col-sm-12 col-lg-8 mx-auto">
                    <Card style={{ marginBottom: '2rem'}}>
                        <Card.Img variant="top" src={product.url} />
                        <Card.Body>
                                <Card.Title>{product.name}<span className="redtext">{" (Discount:" + product.discount + "%)"}</span></Card.Title>
                            <Card.Text>
                                {product.description}<br/>
                                Made of: {getMaterial(product.material)}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <del>{product.price} kr</del><b className="redtext">{" " + (product.price-product.discount*product.price/100) + "kr"}</b>
                            <Button variant="primary" onClick={() => myBasket(product.idProduct)} style={{float:'right'}}>Add to Cart</Button>
                        </Card.Footer>
                    </Card>
                </div>
            )
        }
        return(
            <div key={product.idProduct} className="col-sm-12 col-lg-8 mx-auto">
            <Card style={{ marginBottom: '2rem'}}>
                <Card.Img variant="top" src={product.url} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        {product.description}<br/>
                        Made of: {getMaterial(product.material)}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                {product.price} kr
                <Button variant="primary" onClick={() => myBasket(product.idProduct)} style={{float:'right'}}>Add to basket</Button>
                </Card.Footer>
            </Card>
            </div>
        );
    }

 

    render() {
        const  {product, isLoading} = this.state

        if (isLoading)
             return <div className="loading">
            <div className="loader"></div>
        </div>;


        return (
            <div>
                <Container>
                    <Row style={{marginBottom:'7rem'}}>
                        {this.ProductDetailCard(product)}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ProductDetail;
