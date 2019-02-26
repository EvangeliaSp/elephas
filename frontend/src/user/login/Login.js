import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import Header from "../../components/Header";
import Footer from "../../components/Footer";


class Login extends Component{

    // constructor(props) {
    //     super(props);
    //
    // }

    state = {
        email: '',
        password: '',
        user: ''
    };

    submitHandler = event => {
        var formData = new FormData();
        formData.append("email", this.state.email);
        formData.append("password", this.state.password)
        const options = {
            method: 'POST',
            body: formData//"email=rozaaa@gmail.com=&password=123"
        }
        event.preventDefault();
        event.target.className += " was-validated";
        // const email = this.state.email
        // const password = this.state.password
        fetch('/user/login', options)
            .then(response =>
        {
            if (response.ok) {
                console.log("OKay");
                return response.json();
            } else {
                console.log("NOT OKay");
            }
        })
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   render() {
        return (
            <div>
                <Header/>
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

                    <MDBBtn color="primary" type="submit">
                        Log in
                    </MDBBtn>
                    </MDBContainer>
                </form>
                <Footer/>
            </div>

    );
};

}

export default Login;