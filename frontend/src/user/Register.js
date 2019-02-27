import React from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

class FormsPage extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        streetName: "",
        streetNumber: "",
        country: "",
        zipCode: "",
        telephone: ""
    };

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div>
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
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
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterEmailEx2"
                                className="grey-text"
                            >
                                Last name
                            </label>
                            <input
                                value={this.state.lastname}
                                name="lname"
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterEmailEx2"
                                className="form-control"
                                placeholder="Last name"
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterNameEx"
                                className="grey-text"
                            >
                                Password
                            </label>
                            <input
                                value={this.state.password}
                                name="password"
                                onChange={this.changeHandler}
                                type="password"
                                id="defaultFormRegisterNameEx"
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterConfirmEx3"
                                className="grey-text"
                            >
                                Email
                            </label>
                            <input
                                value={this.state.email}
                                onChange={this.changeHandler}
                                type="email"
                                id="defaultFormRegisterConfirmEx3"
                                className="form-control"
                                name="email"
                                placeholder="Your Email address"
                            />
                            <small id="emailHelp" className="form-text text-muted">npm
                                We'll never share your email with anyone else.npm start
                            </small>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Street Name
                            </label>
                            <input
                                value={this.state.streetName}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="street_name"
                                placeholder="Street Name"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid city name.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Street number
                            </label>
                            <input
                                value={this.state.streetNumber}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="street_number"
                                placeholder="Street number"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid street number.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Country
                            </label>
                            <input
                                value={this.state.country}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="country"
                                placeholder="Country"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid country.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                        <MDBCol md="3" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Zip code
                            </label>
                            <input
                                value={this.state.zipCode}
                                onChange={this.changeHandler}
                                type="text"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="zip_code"
                                placeholder="Zip code"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid zip code.
                            </div>
                            <div className="valid-feedback">Looks good!</div>
                        </MDBCol>
                    </MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <label
                            htmlFor="defaultFormRegisterPasswordEx4"
                            className="grey-text"
                        >
                            Telephone
                        </label>
                        <input
                            value={this.state.telephone}
                            onChange={this.changeHandler}
                            type="text"
                            id="defaultFormRegisterPasswordEx4"
                            className="form-control"
                            name="telephone"
                            placeholder="tel"
                            required
                        />
                        <div className="invalid-feedback">
                            Please provide a valid country.
                        </div>
                        <div className="valid-feedback">Looks good!</div>
                    </MDBCol>
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
                    <MDBBtn color="primary" type="submit">
                        Submit Form
                    </MDBBtn>
                </form>
            </div>
        );
    }
}
export default FormsPage;