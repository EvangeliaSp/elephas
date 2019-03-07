import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import elephas2 from './../elephas2.jpg';
import Header from './../components/Header';
import Footer from './../components/Footer';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ProductGrid extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: true,
            colors: [1, 2, 3]
        }


    }

    componentDidMount() {
        this.loadProductsFromServer()
    }

    loadProductsFromServer = () => {
        this.setState({isLoading: true});

        fetch(`/product/findBy${this.props.location.search}`)
            .then(response => response.json())
            .then(data => this.setState({products: data, isLoading: false}))

    };


    ProductCard(product) {
        //TODO: Product name instead of card title
        return (
            <div key={product.idProduct} className="col-sm-6 col-lg-4">
                <Card style={{marginBottom: '2rem'}}>
                    <Card.Img variant="top" src={elephas2}/>
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

    handleChange = (e, value) => {
        console.log(value);
        console.log(e.target.checked);
        if (value==1 && e.target.checked==true)
            var mpla=this.props.location.search
            this.props.location.search=this.props.location.search+"?type=2";
            console.log(this.props.location.search)
        return (e,value);
    }

    render() {
        const {products, isLoading} = this.state

        if (isLoading)
            return <p>Loading...</p>

        return (
            <div>
                <Header/>

                <form>
                    <input  type="checkbox" name="color" value="1"
                            onClickCapture={(e) => this.handleChange(e, 1)}/>White
                    <input onChange={this.handleInputChange} type="checkbox" name="color" value="2"
                           onChange={(e, value) => this.handleChange(e, 2)}/>Black
                    <input onChange={this.handleInputChange} type="checkbox" name="color" value="3"
                           onChange={(e, value) => this.handleChange(e, 3)}/>Grey
                </form>
                <Container>
                    <Row style={{marginBottom: '7rem'}}>
                        {
                            products.map((product) => {
                                return this.ProductCard(product);

                            })
                        }
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default ProductGrid;
