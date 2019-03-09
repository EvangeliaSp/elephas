import React, {Component} from 'react'
import Avatar from 'react-avatar';
import {HashLink as Link} from 'react-router-hash-link';
import './Profile.css'
import notAvailable from "./../../notAvailable.jpg";
import {Container, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import Popup from "reactjs-popup";
import {confirmToString, paymentStatusToString, paymentTypeToString, statusToString} from '../../Translations';

class Profile extends Component {

    state = {};

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: [],
            user: {
                idUser: localStorage.getItem("idUser"),
                email: localStorage.getItem("email"),
                firstname: localStorage.getItem("firstname"),
                lastname: localStorage.getItem("lastname"),
                country: localStorage.getItem("country"),
                city: localStorage.getItem("city"),
                streetName: localStorage.getItem("streetName"),
                streetNumber: localStorage.getItem("streetNumber"),
                zipCode: localStorage.getItem("zipCode"),
                telephone: localStorage.getItem("telephone")
            },
            updateUser: {
                firstname: localStorage.getItem("firstname"),
                lastname: localStorage.getItem("lastname"),
                country: localStorage.getItem("country"),
                city: localStorage.getItem("city"),
                streetName: localStorage.getItem("streetName"),
                streetNumber: localStorage.getItem("streetNumber"),
                zipCode: localStorage.getItem("zipCode"),
                telephone: localStorage.getItem("telephone")
            },
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            open: false,
            openPassword: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openPasswordModal = this.openPasswordModal.bind(this)
        this.closePasswordModal = this.closePasswordModal.bind(this)
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({ open: false })
    }

    openPasswordModal (){
        this.setState({ openPassword: true })
    }

    closePasswordModal () {
        this.setState({ openPassword: false })
    }

    componentDidMount() {
        // this.loadUserFromServer()
        this.loadOrdersFromServer()
    }

    loadOrdersFromServer = () => {
        fetch(`/order/userOrders?idUser=${this.state.user.idUser}`)
            .then(response => response.json())
            .then(data => this.setState({orders: data}))
    };

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    changeUserHandler = event => {
        let updateUser = this.state.updateUser;
        updateUser[event.target.name]= event.target.value;
        this.setState({updateUser: updateUser})
    };

    updatePasswordHandler = () => {
        const { oldPassword, newPassword, confirmPassword } = this.state;

        if (oldPassword.length === 0) {
            console.log(`Old password is empty.`);
            alert("Old password is empty! Please, try again.")
        } else if (newPassword.length === 0 || confirmPassword.length === 0) {
            console.log(`New password is empty.`);
            alert("New password is empty! Please, try again.")
        } else {
            var formData = new FormData();
            formData.append("email", this.state.user.email);
            formData.append("password", oldPassword);

            const options = {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            };
            fetch('/user/login', options)
                .then(response => {
                        if (response.ok) {
                            console.log(`Old password matches.`);
                            if (newPassword !== confirmPassword) {
                                console.log("Passwords do not match");
                                alert("Passwords don't match");
                            } else {
                                console.log("Passwords match");

                                const opt = {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    method: 'PATCH',
                                    body: JSON.stringify({"password": newPassword}),
                                    redirect: 'follow'
                                };

                                fetch(`/user/update?id=${this.state.user.idUser}`, opt)
                                    .then(response => {
                                        if (response.ok) {
                                            console.log('User password updated.')
                                            this.closePasswordModal();
                                            window.location.reload();
                                        } else if (response.status === 403) {
                                            console.log('Cannot update user password.')
                                            alert("Cannot update password! Please, try again.")
                                        }
                                    })
                            }
                        } else if (response.status === 401) {
                            console.log("Old password does not match.");
                            alert("Old password is wrong! Please, try again.");
                        }
                    }
                )
        }
    };

    updateHandler = (event) => {
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PATCH',
            body: JSON.stringify(this.state.updateUser),
            redirect: 'follow'
        };
        event.preventDefault();

        fetch(`/user/update?id=${this.state.user.idUser}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("firstname", data.firstname);
                localStorage.setItem("lastname", data.lastname);
                localStorage.setItem("country", data.country);
                localStorage.setItem("city", data.city);
                localStorage.setItem("streetName", data.streetName);
                localStorage.setItem("streetNumber", data.streetNumber);
                localStorage.setItem("zipCode", data.zipCode);
                localStorage.setItem("telephone", data.telephone);

                this.closeModal();

                window.location.reload();
            })
    };

    setClassName = (str, oldName) => {
        if (str === window.location.hash)
            return oldName + "active";
        return oldName;
    };

    tabMenu() {
        return (
            <ul className="nav nav-tabs padding-18">
                <li className={this.setClassName("#profile", "")}>
                    <Link data-toggle="tab" to="#profile">
                        <i className="green ace-icon fa fa-user bigger-120"></i>
                        Profile
                    </Link>
                </li>

                <li className={this.setClassName("#orders", "")}>
                    <Link data-toggle="tab" to="#orders">
                        <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                        Orders
                    </Link>
                </li>
            </ul>
        );
    }


    profileInfo(user) {
        return (
            <div id="profile" className={this.setClassName("#profile", "tab-pane")}>
                <div className="row">
                    <div className="col-xs-12 col-sm-3 center">
                        <span className="profile-picture">
                            <Avatar className="editable img-responsive" alt=" Avatar" id="avatar2" name={user.firstname+' '+user.lastname} size="150"/>
                        </span>

                        <div className="space space-4"></div>
                    </div>

                    <div className="col-xs-12 col-sm-9">
                        <h4 className="blue">
                            <span className="middle">{user.firstname+' '+user.lastname} </span>

                        </h4>

                        <div className="profile-user-info">
                            <div className="profile-info-row">
                                <div className="profile-info-name"> Email</div>
                                <div className="profile-info-value">
                                    <span>{user.email}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Password</div>
                                <div className="profile-info-value">
                                    <span>••••••••••</span>
                                    <MDBBtn color="primary"  onClick={() => this.openPasswordModal()}> Update Password </MDBBtn>
                                    <Popup
                                        open={this.state.openPassword}
                                        // trigger={}
                                        modal
                                        // closeOnDocumentClick
                                    >
                                        <div className="container">
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <h3><b>Change Password</b></h3>
                                                </MDBCol>
                                                <MDBCol md="5" className="mb-5"/>
                                                <MDBCol md="1" className="mb-1">
                                                    <button onClick={() => this.closePasswordModal()}> &times; </button>
                                                </MDBCol>
                                            </MDBRow>

                                            <hr/>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterPasswordEx3"
                                                        className="grey-text"
                                                    >
                                                        Old password
                                                    </label>
                                                    <input
                                                        value={this.state.oldPassword}
                                                        name="oldPassword"
                                                        onChange={this.changeHandler}
                                                        type="password"
                                                        // id="defaultFormRegisterPasswordEx3"
                                                        className="form-control"
                                                        placeholder="Old password"
                                                        required
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterPasswordEx3"
                                                        className="grey-text"
                                                    >
                                                        New password
                                                    </label>
                                                    <input
                                                        value={this.state.newPassword}
                                                        onChange={this.changeHandler}
                                                        type="password"
                                                        // id="defaultFormRegisterPasswordEx3"
                                                        className="form-control"
                                                        name="newPassword"
                                                        placeholder="New password"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid country.
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterPasswordEx3"
                                                        className="grey-text"
                                                    >
                                                        Confirm password
                                                    </label>
                                                    <input
                                                        value={this.state.confirmPassword}
                                                        onChange={this.changeHandler}
                                                        type="password"
                                                        // id="defaultFormRegisterPasswordEx3"
                                                        className="form-control"
                                                        name="confirmPassword"
                                                        placeholder="New password"
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid street number.
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr/>
                                            <MDBRow>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2">
                                                    <MDBBtn color="danger" onClick={this.closePasswordModal}> Cancel </MDBBtn>
                                                </MDBCol>
                                                <MDBCol md="2" className="mb-2">
                                                    <MDBBtn color="success" onClick={this.updatePasswordHandler}> Update </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>

                                        </div>
                                    </Popup>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Location</div>
                                <div className="profile-info-value">
                                    <span>{user.city}</span>
                                    <span>{user.country}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Address</div>
                                <div className="profile-info-value">
                                    <span>{user.streetName}</span>
                                    <span>{user.streetNumber}</span>
                                    <span>{user.zipCode}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"> Telephone</div>
                                <div className="profile-info-value">
                                    <span>{user.telephone}</span>
                                </div>
                            </div>

                            <div className="profile-info-row">
                                <div className="profile-info-name"></div>
                                <div className="profile-info-value">
                                    <MDBBtn color="primary" onClick={() => this.openModal()} > Edit Profile </MDBBtn>
                                    <Popup
                                        open={this.state.open}
                                        // trigger={}
                                        modal
                                        // closeOnDocumentClick
                                    >
                                        <div className="container">
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <h3><b>Update your profile</b></h3>
                                                </MDBCol>
                                                <MDBCol md="5" className="mb-5"/>
                                                <MDBCol md="1" className="mb-1">
                                                    <button onClick={() => this.closeModal()}> &times; </button>
                                                </MDBCol>
                                            </MDBRow>

                                            <hr/>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterNameEx"
                                                        className="grey-text"
                                                    >
                                                        First name
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.firstname}
                                                        name="firstname"
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterNameEx"
                                                        className="form-control"
                                                        placeholder={this.state.user.firstname}
                                                    />
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterSurnameEx2"
                                                        className="grey-text"
                                                    >
                                                        Last name
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.lastname}
                                                        name="lastname"
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterSurnameEx2"
                                                        className="form-control"
                                                        placeholder={this.state.user.lastname}
                                                    />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterCountry7"
                                                        className="grey-text"
                                                    >
                                                        City
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.city}
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterCountry7"
                                                        className="form-control"
                                                        name="city"
                                                        placeholder={this.state.user.city}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid country.
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterStNameEx5"
                                                        className="grey-text"
                                                    >
                                                        Street Name
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.streetName}
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterStNameEx5"
                                                        className="form-control"
                                                        name="streetName"
                                                        placeholder={this.state.user.streetName}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid city name.
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterStNumEx6"
                                                        className="grey-text"
                                                    >
                                                        Street number
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.streetNumber}
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterStNumEx6"
                                                        className="form-control"
                                                        name="streetNumber"
                                                        placeholder={this.state.user.streetNumber}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid street number.
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterZip8"
                                                        className="grey-text"
                                                    >
                                                        Zip code
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.zipCode}
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterZip8"
                                                        className="form-control"
                                                        name="zipCode"
                                                        placeholder={this.state.user.zipCode}
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid zip code
                                                    </div>
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterCountry7"
                                                        className="grey-text"
                                                    >
                                                        Country
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.country}
                                                        onChange={this.changeUserHandler}
                                                        type="text"
                                                        id="defaultFormRegisterCountry7"
                                                        className="form-control"
                                                        name="country"
                                                        placeholder={this.state.user.country}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid country.
                                                    </div>
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-6">
                                                    <label
                                                        htmlFor="defaultFormRegisterTel9"
                                                        className="grey-text"
                                                    >
                                                        Telephone
                                                    </label>
                                                    <input
                                                        value={this.state.updateUser.telephone}
                                                        onChange={this.changeUserHandler}
                                                        type="tel"
                                                        id="defaultFormRegisterTel9"
                                                        className="form-control"
                                                        name="telephone"
                                                        placeholder={this.state.user.telephone}
                                                        required
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a valid telephone number.
                                                    </div>
                                                </MDBCol>

                                            </MDBRow>
                                            <hr/>
                                            <MDBRow>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2"/>
                                                <MDBCol md="2" className="mb-2">
                                                    <MDBBtn color="danger" onClick={() => this.closeModal()}> Cancel </MDBBtn>
                                                </MDBCol>
                                                <MDBCol md="2" className="mb-2">
                                                    <MDBBtn color="success" onClick={this.updateHandler}> Update </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>

                                        </div>
                                    </Popup>
                                </div>
                                <div className="profile-info-name">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-20"></div>

                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="widget-box transparent">
                        </div>
                    </div>
                </div>
            </div>

        );
    }

   
    usersOrderList(orders) {
        return (
            <Container id="orders" className={this.setClassName("#orders", "tab-pane")}>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Confirm</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Payment Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Sum</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                    <tr key={order.idOrder}>
                        <th scope="row">{order.idOrder}</th>
                        <td>{confirmToString(order.confirm)}</td>
                        <td>{(new Date(order.date)).toLocaleString()}</td>
                        <td>{paymentStatusToString(order.paymentStatus)}</td>
                        <td>{paymentTypeToString(order.paymentType)}</td>
                        <td>{statusToString(order.status)}</td>
                        <td>{order.sum}</td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </Container>
        );
    }

    

    render() {
        const  {user, orders} = this.state;

        if (user.idUser === 'undefined' || localStorage.getItem("idUser") == null) {
            return (<img className="center" src={notAvailable} alt="Not available"/>);
        }

        return (
            <div>
            <div id="user-profile-2" className="user-profile">
                <div className="tabbable">
                    {this.tabMenu()}

                    <div className="tab-content no-border padding-24" style={{marginBottom: "7rem"}}>
                        {this.profileInfo(user)}
                        {this.usersOrderList(orders)}
                    </div>

                </div>
            </div>
            </div>

        );
    }
}

export default Profile;
