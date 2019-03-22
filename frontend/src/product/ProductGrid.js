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

    filterProductsColor(hash, allProducts, element) {
        var typeNumber;
        switch (hash) {
            case "1":
                typeNumber = 1;
                break;
            case "2":
                typeNumber = 2;
                break;
            case "3":
                typeNumber = 3;
                break;
            case "4":
                typeNumber = 4;
                break;
            case "5":
                typeNumber = 5;
                break;
            case "6":
                typeNumber = 6;
                break;
            case "7":
                typeNumber = 7;
                break;
            case "8":
                typeNumber = 8;
                break;
            default:
                typeNumber = 0;
                break;
        }

        if (element == "color") {
            const filteredList2 = this.state.currentProducts.filter(prod => {
                return prod.color === hash
            });
            return filteredList2;
        } else if (element == "material") {
            const filteredList2 = this.state.currentProducts.filter(prod => {
                return prod.material === hash
            })
            return filteredList2;
        } else {
            return allProducts;
        }
    }

    skata(hash) {
        console.log("current products color",this.state.currentProducts)
        const filteredList2 = this.state.currentProducts.filter(prod => {
            return prod.color !== hash
        });

        return filteredList2;
    }
    skata2(hash) {
        console.log("current products material",this.state.currentProducts)
        const filteredList2 = this.state.currentProducts.filter(prod => {
            return prod.material !== hash
        });

        return filteredList2;
    }


    handleChange = (e, value, element) => {
        if (value != 0 && e.target.checked == true) {
            const {products} = this.state;
            const hash = this.props.location.hash;
            const filt = this.filterProductsType(hash, products);
            const mpla = this.filterProductsColor(value, filt, element);
            console.log("filtered final" + mpla)
            this.setState({currentProducts: mpla});
        } else if (e.target.checked == false && element == "color") {
            const mpla = this.skata(value);
            console.log("unfiltered" + mpla)
            this.setState({currentProducts: mpla});
        }
        else if (e.target.checked == false && element == "material") {
            const mpla = this.skata2(value);
            console.log("unfiltered" + mpla)
            this.setState({currentProducts: mpla});
        }


    }

    componentWillUpdate(nextProps, nextState) {
        console.log("next",nextState); //will show the new state
        console.log("now",this.state); //will show the previous state
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
                <div className="bitch">
                    <div className="choosefilter">Color</div>

                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 1, "color")}/>Black
                    &nbsp;

                    <input type="checkbox" name="color"
                           onClickCapture={(e) => this.handleChange(e, 2, "color")}/>White
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 3, "color")}/>Grey
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 4, "color")}/>Brown
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 5, "color")}/>Red
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 6, "color")}/>Green
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 7, "color")}/>Yellow
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 8, "color")}/>Blue
                    <br/>
                    <div className="choosefilter">Material</div>

                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 1, "material")}/>Steel
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 2, "material")}/>Silver
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 3, "material")}/>Gold
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 4, "material")}/>Wool
                    &nbsp;
                    <input type="checkbox"
                           onClickCapture={(e) => this.handleChange(e, 5, "material")}/>Stones
                </div>

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
