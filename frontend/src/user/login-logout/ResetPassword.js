import React, {Component} from "react";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from 'mdbreact';


class ResetPassword extends Component{

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
                    // onSubmit={this.submitHandler}
                    noValidate
                >
                    <MDBContainer>
                        <MDBRow>
                            <h3 style={{color: '#3e3a3a'}}><b>Reset Password</b></h3>
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
                                    placeholder="Recovery email"
                                />
                                <small id="emailHelp" className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="4" className="mb-3">
                                <MDBBtn color="primary" type="submit">
                                    Reset Password
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </form>
            </div>
        );
    };
}

export default ResetPassword;