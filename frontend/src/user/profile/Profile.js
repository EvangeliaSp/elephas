import React, {Component} from 'react'
import Avatar from 'react-avatar';
import {HashLink as Link} from 'react-router-hash-link';
import './Profile.css'
import notAvailable from "./../../notAvailable.jpg";
import {MDBBtn, MDBCol, MDBRow} from "mdbreact";
import Popup from "reactjs-popup";

class Profile extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: [],
            key: 'profile',
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
            open: false
        };
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
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

    // loadUserFromServer = () => {
    //     const { id } = this.props.match.params
    //
    //     fetch(`/user/findById/${this.state.user.idUser}`)
    //         .then(response => response.json())
    //         .then(data => this.setState({user: data}))
    // };

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
                                        closeOnDocumentClick
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
                                                <MDBCol md="6" className="mb-6">
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
                                                <MDBCol md="6" className="mb-6">
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
                                                <MDBCol md="6" className="mb-6">
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
                                                <MDBCol md="6" className="mb-6">
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
                                                <MDBCol md="6" className="mb-6">
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
                                                    <MDBBtn color="success"> Update </MDBBtn>
                                                </MDBCol>
                                            </MDBRow>

                                        </div>
                                    </Popup>
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
            <div id="orders" className={this.setClassName("#orders", "tab-pane")}>
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
                        <td>{order.confirm}</td>
                        <td>{order.date}</td>
                        <td>{order.paymentStatus}</td>
                        <td>{order.paymentType}</td>
                        <td>{order.status}</td>
                        <td>{order.sum}</td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        );
    }

    

    render() {
        const  {user, orders} = this.state;

        if (user.idUser === 'undefined' || localStorage.getItem("idUser") == null) {
            return (<img className="center" src={notAvailable}/>);
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
