import React, {Component} from 'react';
import {Container, MDBBtn, MDBCol, MDBRow} from "mdbreact";


class CustomProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {},
            product: {
                idUser: localStorage.getItem("idUser"),
                name: '',
                image: '',
                price: 0,
                discount: 0,
                type: 0,
                material: 0,
                color: 0,
                description: '',
                quantity: 1,
                status: 1
            }
        };


    };

    submitCustomProduct() {
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(this.state.product),
            redirect: 'follow'
        };
        fetch('/customProduct/create', options)
            .then(response => {
                if (response.ok) {
                    alert("Your request has been submitted");
                    window.location.href = `/user/profile#creations`;
                }
            })


    }

    createProductHandler = event => {
        let product = this.state.product;
        product[event.target.name] = event.target.value;
        this.setState({product: product})
    };

    createProductTypeHandler = event => {
        let product = this.state.product;
        product.type = event.target.value;
        this.setState({product: product})
    };

    createProductMaterialHandler = event => {
        let product = this.state.product;
        product.material = event.target.value;
        this.setState({product: product})
    };

    createProductColorHandler = event => {
        let product = this.state.product;
        product.color = event.target.value;
        this.setState({product: product})
    };


    render() {
        return (
            <Container>
                <MDBRow>
                    <h3 style={{color: '#3e3a3a'}}><b>Custom Product form</b></h3>
                </MDBRow>
                <div className="container">
                    <br/>
                    <MDBRow>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Name
                            </label>
                            <input
                                value={this.state.product.name}
                                name="name"
                                onChange={this.createProductHandler}
                                type="text"
                                className="form-control"
                                placeholder="Name of the Product"
                            />
                        </MDBCol>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterSurnameEx2"
                                className="grey-text"
                            >
                                Image
                            </label>
                            <input
                                value={this.state.product.image}
                                name="image"
                                onChange={this.createProductHandler}
                                type="text"
                                className="form-control"
                                placeholder="Image"
                            />
                        </MDBCol>
                    </MDBRow>
                    <br/>
                    <MDBRow>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Type
                            </label>
                            <select
                                value={this.state.product.type}
                                onChange={this.createProductTypeHandler}
                                className="form-control">
                                <option value={1}>Bracelet</option>
                                <option value={2}>Ring</option>
                                <option value={3}>Earring</option>
                                <option value={4}>Necklace</option>
                            </select>
                        </MDBCol>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterSurnameEx2"
                                className="grey-text"
                            >
                                Material
                            </label>
                            <select
                                value={this.state.product.material}
                                onChange={this.createProductMaterialHandler}
                                className="form-control">
                                <option value={1}>Steel</option>
                                <option value={2}>Silver</option>
                                <option value={3}>Gold</option>
                            </select>
                        </MDBCol>
                    </MDBRow>
                    <br/>
                    <MDBRow>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Color
                            </label>
                            <select
                                value={this.state.product.color}
                                onChange={this.createProductColorHandler}
                                className="form-control">
                                <option value={1}>Black</option>
                                <option value={2}>White</option>
                                <option value={3}>Grey</option>
                                <option value={4}>Brown</option>
                                <option value={5}>Red</option>
                            </select>
                        </MDBCol>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Quantity
                            </label>
                            <input
                                value={this.state.product.quantity}
                                name="quantity"
                                onChange={this.createProductHandler}
                                type="number"
                                step="1"
                                min='1'
                                max='10'
                                className="form-control"
                                placeholder={this.state.product.quantity}
                            />
                        </MDBCol>

                    </MDBRow>
                    <br/>
                    <MDBRow>
                        <MDBCol md="6" className="mb-6">
                            <label
                                htmlFor="defaultFormRegisterSurnameEx2"
                                className="grey-text"
                            >
                                Description
                            </label>
                            <textarea
                                value={this.state.product.description}
                                placeholder="Give description of the product you want"
                                name="description"
                                onChange={this.createProductHandler}
                                type="text"
                                className="form-control"
                            />
                        </MDBCol>

                    </MDBRow>
                    <br/>
                    <MDBRow>
                        <MDBCol md="5" className="mb-5"/>
                        <MDBCol md="1" className="mb-1">
                            <MDBBtn color="danger" onClick={()=>window.location.href = `/`}> Cancel </MDBBtn>
                        </MDBCol>
                        <MDBCol md="2" className="mb-2">
                            <MDBBtn color="success" onClick={() => this.submitCustomProduct()}> Submit </MDBBtn>
                        </MDBCol>

                    </MDBRow>
                </div>

            </Container>


        )
    }

}

export default CustomProduct