import React, {Component} from "react";
import {MDBRow, MDBCol, MDBBtn} from "mdbreact";
import { Redirect } from 'react-router-dom'

class FormsPage extends Component {

    state = {
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        streetName: '',
        streetNumber: '',
        country: '',
        city: '',
        zipCode: '',
        telephone: '',
        redirect: false,
        user: ''
    };


    submitHandler = event => {

        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(this.state),
            redirect: 'follow'
        }
        event.preventDefault();
        event.target.className += " was-validated";

        fetch('/user/create', options)
            .then(response => response.json())
            .then(data => this.setState({user: data, redirect: true}))

    };

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        if (this.state.redirect) {
            const { to } = {to: {pathname: `/user/findById/${this.state.user.idUser}`}}
            return <Redirect to={ to }/>
        }
        return (
            <div className="container">
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    style={{marginBottom: "9rem"}}
                    noValidate
                >
                    <MDBRow>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                First name
                            </label>
                            <input
                                value={this.state.firstname}
                                name="firstname"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="First name"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterSurnameEx2"
                                className="grey-text"
                            >
                                Last name
                            </label>
                            <input
                                value={this.state.lastname}
                                name="lastname"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterSurnameEx2"
                                className="form-control"
                                placeholder="Last name"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx3"
                                className="grey-text"
                            >
                                Password
                            </label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.changeHandler}
                                type="password"
                                id="defaultFormRegisterPasswordEx3"
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx4"
                                className="grey-text"
                            >
                                Email
                            </label>
                            <input
                                value={this.state.email}
                                onChange={this.changeHandler}
                                type="email"
                                id="defaultFormRegisterConfirmEx4"
                                className="form-control"
                                name="email"
                                placeholder="Your Email address"
                            />
                            <small id="emailHelp" className="form-text text-muted">
                            </small>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterCountry7"
                                className="grey-text"
                            >
                                City
                            </label>
                            <input
                                value={this.state.city}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterCountry7"
                                className="form-control"
                                name="city"
                                placeholder="City"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid country.
                            </div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterStNameEx5"
                                className="grey-text"
                            >
                                Street Name
                            </label>
                            <input
                                value={this.state.streetName}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterStNameEx5"
                                className="form-control"
                                name="streetName"
                                placeholder="Street Name"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid city name.
                            </div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterStNumEx6"
                                className="grey-text"
                            >
                                Street number
                            </label>
                            <input
                                value={this.state.streetNumber}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterStNumEx6"
                                className="form-control"
                                name="streetNumber"
                                placeholder="Street number"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid street number.
                            </div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterZip8"
                                className="grey-text"
                            >
                                Zip code
                            </label>
                            <input
                                value={this.state.zipCode}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterZip8"
                                className="form-control"
                                name="zipCode"
                                placeholder="Zip code"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid zip code
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterCountry7"
                                className="grey-text"
                            >
                                Country
                            </label>
                            <input
                                value={this.state.country}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterCountry7"
                                className="form-control"
                                name="country"
                                placeholder="Country"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid country.
                            </div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterTel9"
                                className="grey-text"
                            >
                                Telephone
                            </label>
                            <input
                                value={this.state.telephone}
                                onChange={this.changeHandler}
                                type="tel"
                                id="defaultFormRegisterTel9"
                                className="form-control"
                                name="telephone"
                                placeholder="Tel. number"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid telephone number.
                            </div>
                        </MDBCol>

                    </MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <div className="custom-control custom-checkbox pl-3">
                            <input
                                className="custom-control-input"
                                type="checkbox"
                                value=""
                                id="invalidCheck"
                                required
                            />
                            <label className="custom-control-label" htmlFor="invalidCheck">
                                Agree to terms and conditions
                            </label>
                            <div className="invalid-feedback">
                                You must agree before submitting.
                            </div>
                        </div>
                    </MDBCol>
                    <MDBBtn color="outline-success" type="submit">
                        Submit Form
                    </MDBBtn>
                </form>
            </div>
        );
    }
}

export default FormsPage;
