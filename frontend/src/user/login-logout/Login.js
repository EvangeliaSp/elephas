import React, {Component} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact';


class Login extends Component{

    state = {
        email: '',
        password: ''
    };

    submitHandler = event => {
        var formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password)

        const options = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        event.preventDefault();
        event.target.className += " was-validated";
        fetch('/user/login', options)
            .then(response => {
                if (response.ok) return response.json();
                return response;
            })
            .then(data => {
                if (data.status === 401) {
                    console.log("Response: ", data.status, data.statusText);
                    alert("Wrong e-mail or password");
                    
                } else {
                    localStorage.setItem("idUser", data.idUser);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("firstname", data.firstname);
                    localStorage.setItem("lastname", data.lastname);
                    localStorage.setItem("country", data.country);
                    localStorage.setItem("city", data.city);
                    localStorage.setItem("streetName", data.streetName);
                    localStorage.setItem("streetNumber", data.streetNumber);
                    localStorage.setItem("zipCode", data.zipCode);
                    localStorage.setItem("telephone", data.telephone);

                    window.location.href=`/`;
                }
                
            })
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
                    <MDBContainer>
                        <MDBRow>
                            <h3 style={{color: '#3e3a3a'}}><b>Login Form</b></h3>
                        </MDBRow>
                        <br/>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
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
                            <small id="emailHelp" className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                            <label
                                htmlFor="defaultFormRegisterPasswordEx4"
                                className="grey-text"
                            >
                                Password
                            </label>
                            <input
                                value={this.state.password}
                                onChange={this.changeHandler}
                                type="password"
                                id="defaultFormRegisterPasswordEx4"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                required
                            />
                            <div className="invalid-feedback">
                                Please provide a valid password.
                            </div>
                            <div className="valid-feedback">Looks good!</div>

                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                        <p className="font-small grey-text d-flex justify-content-end">
                            Forgot
                            <a
                                href='/user/login/resetPassword'
                                className="dark-grey-text font-weight-bold ml-1"
                            >
                                Password?
                            </a>
                        </p>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                        <MDBBtn color="primary" type="submit">
                            Log in
                        </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="4" className="mb-3">
                        <p className="font-small grey-text d-flex justify-content-center">
                            Don't have an account?
                            <a
                                href="/user/register"
                                className="dark-grey-text font-weight-bold ml-1"
                            >
                                Sign up
                            </a>
                        </p>
                        </MDBCol>
                    </MDBRow>
                    </MDBContainer>
                </form>
            </div>
        );
    };
}

export default Login;