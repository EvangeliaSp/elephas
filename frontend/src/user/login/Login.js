import React, {Component} from "react";
import { Redirect } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserList from "../UserList";


class Login extends Component{

    // constructor(props) {
    //     super(props);
    //
    // }

    state = {
        email: '',
        password: '',
        user: '',
        redirect: false
    };

    handleRedirect(response) {
        if (response.ok) {
            console.log(`User ${this.state.email} logged in successfully.`);
            return (<Redirect to='/user/all'/>)

        } else {
            console.log(`User ${this.state.email} CANNOT log in.`);
        }
    };

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
            // .then(response => this.handleRedirect(response))
            .then(response =>
                    response.json()
            )
            .then(data => this.setState({user: data, redirect: true}))
        // {
            // if (response.ok) {
            //     console.log(`User ${this.state.email} logged in successfully.`);
            //     response.json().then(data => this.setState({user: data}))
            //     console.log(`User ${this.state.user.email} yeahhh.`);
            //     // response.json();
            // } else {
            //     console.log(`User ${this.state.email} CANNOT log in.`);
            // }
        // })

            // .then(response => response.json())
            // .then(data => {  this.setState({user: data}) })
            // .then( _ => <Redirect to={{UserList}}/>)
                // this.setState({user: data}),
                // return(<Redirect to={UserList}/>)
            // )
    };

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   render() {
       if (this.state.redirect) {
           const { to } = {to: {pathname: `/user/findById/${this.state.user.idUser}`}}
           return <Redirect to={ to }/>
       }
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

                <div>{this.state.user.idUser}</div>

                <Footer/>
            </div>

    );
};

}

export default Login;