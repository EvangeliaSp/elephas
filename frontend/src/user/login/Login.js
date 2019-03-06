import React, {Component} from "react";
import {Redirect} from 'react-router-dom'
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import Header from "../../components/Header";
import Footer from "../../components/Footer";


class Login extends Component{

    state = {
        email: '',
        password: '',
        // user: '',
        // redirect: false
    };

    // handleRedirect(response) {
    //     if (response.ok) {
    //         console.log(`User ${this.state.email} logged in successfully.`);
    //         return (<Redirect to='/user/all'/>)
    //
    //     } else {
    //         console.log(`User ${this.state.email} CANNOT log in.`);
    //     }
    // };

    submitHandler = event => {
        var formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password)

        const options = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        }
        event.preventDefault();
        event.target.className += " was-validated";
        fetch('/user/login', options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("idUser", data.idUser);
                localStorage.setItem("email", data.email);
                localStorage.setItem("firstname", data.firstname);
                localStorage.setItem("lastname", data.lastname);
                window.location.href=`/user/findById/${data.idUser}`;
                // this.setState({redirect: true})
            })
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   render() {
       // if (this.state.redirect) {
       //     const idUser = localStorage.getItem('idUser');
       //     const { to } = {to: {pathname: `/user/findById/${idUser}`}};
       //     return <Redirect to={ to }/>
       // }
        return (
            <div>
                <form
                    className="needs-validation"
                    onSubmit={this.submitHandler}
                    noValidate
                >
                    <MDBContainer>
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
                                href="#!"
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
                                href="#!"
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