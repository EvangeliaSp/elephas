import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {myBasket} from './AddToBasket'


class ProductGrid extends Component {

    state = {};

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoading: true,
            currentProducts: []
        }
    }


    filterProductsType(hash, allProducts) {
        var typeNumber;
        switch (hash) {
            case "#bracelets":
                typeNumber = 1;
                break;
            case "#rings":
                typeNumber = 2;
                break;
            case "#necklaces":
                typeNumber = 4;
                break;
            case "#earrings":
                typeNumber = 3;
                break;
            default:
                typeNumber = 0;
                break;
        }
        const filteredList = allProducts.filter(prod => {
            return prod.type === typeNumber
        });
        return filteredList;
    }

    filterProductsColor(hash, allProducts) {
        var typeNumber;
        switch (hash) {
            case "1":
                typeNumber = 1;
                break;
            case "2":
                typeNumber = 2;
                break;
            default:
                typeNumber = 0;
                break;
        }
        const filteredList2 = allProducts.filter(prod => {
            return prod.color === hash
        });
        return filteredList2;
    }

    handleChange = (e, value, element) => {
        console.log(value);
        console.log(e.target.checked);
        if (value != 0 && e.target.checked == true && element == "color") {
            const {products} = this.state;
            const hash = this.props.location.hash;
            const filt = this.filterProductsType(hash, products);
            const mpla = this.filterProductsColor(value, filt);
            console.log(mpla)
            this.setState({currentProducts: mpla});


        }

    }

    componentWillReceiveProps(nextProps) {
        const hash = nextProps.location.hash
        if (hash !== this.props.location.hash) {
            const {products} = this.state;
            const crnt = this.filterProductsType(hash, products);
            this.setState({currentProducts: crnt});
        }
    }

    componentDidMount() {
        this.loadProductsFromServer()
    }

    loadProductsFromServer = () => {
        this.setState({isLoading: true});

        fetch(`/product/findBy`)
            .then(response => response.json())
            .then(data => {
                const crnt = this.filterProductsType(this.props.location.hash, data);
                this.setState({products: data, isLoading: false, currentProducts: crnt});
            })
    };


    ProductCard(product) {
        return (
            <div key={product.idProduct} className="col-sm-6 col-lg-4">
                <Card style={{marginBottom: '2rem'}}>
                    <a href={"/product/findById/" + product.idProduct}>
                        <Card.Img variant="top" src={product.url}
                                  style={{height: `20rem`}}
                        />
                    </a>
                    <Card.Body>
                        <Card.Title>
                            <a href={"/product/findById/" + product.idProduct} style={{color: "black"}}>
                                {product.name}
                            </a>
                        </Card.Title>

                        <Card.Text>
                            {product.description}<br/>

                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {product.price} kr
                        <Button variant="primary" onClick={() => myBasket(product.idProduct)} style={{float: 'right'}}>Add
                            to basket</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }


    render() {
        const {currentProducts, isLoading} = this.state


        if (isLoading)
            return <p>Loading...</p>

        return (
            <div>
                <div className="colorFilter"></div>
                <form>
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 1, "color")}/>White
                    <input type="checkbox" name="color"
                           onClickCapture={(e) => this.handleChange(e, 2, "color")}/>Black
                    <input type="checkbox" name="color" value="3"
                           onClickCapture={(e) => this.handleChange(e, 3, "color")}/>Grey
                </form>

                <Container>
                    <Row style={{marginBottom: '7rem'}}>
                        {
                            currentProducts.map((product) => {
                                return this.ProductCard(product);

                            })
                        }
                    </Row>
                </Container>


            </div>
        );
    }
}

export default ProductGrid;
