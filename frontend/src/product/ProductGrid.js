import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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
                case "#bracelets": typeNumber = 1; break;
                case "#rings": typeNumber = 2; break;
                case "#necklaces": typeNumber = 4; break;
                case "#earrings": typeNumber = 3; break;
                default: typeNumber = 0; break;
            }
        const filteredList = allProducts.filter(prod => {return prod.type === typeNumber});
        return filteredList;
    }

    componentWillReceiveProps(nextProps) {
        const hash = nextProps.location.hash
        if(hash !== this.props.location.hash) {
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
                        <Card.Img variant="top"  src={product.url}
                                style={{ height:`20rem` }}
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
                        <Button variant="primary" href="#addToBasket" style={{float: 'right'}}>Add to basket</Button>
                    </Card.Footer>
                </Card>
            </div>
        );
    }


    render() {
        const {currentProducts, isLoading} = this.state

        if (isLoading)
            return <div className="loading">
                <div className="loader"></div>
            </div>


        return (
            <div>
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
