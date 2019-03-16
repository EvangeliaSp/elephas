import React, {Component} from 'react'
import Avatar from 'react-avatar';
import {HashLink as Link} from 'react-router-hash-link';
import './Profile.css'
import notAvailable from "./../../notAvailable.jpg";
import {Container, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import Popup from "reactjs-popup";
import {confirmToString, paymentStatusToString, paymentTypeToString, statusToString, getColor, getMaterial, getType} from '../../Translations';
import Modal from "react-responsive-modal";

class Profile extends Component {

    state = {};

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: [],
            users: [],
            products: [],
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
            openPassword: false,
            openPasswordSucceed: false,
            openUpdateProduct: false,
            openDeleteProduct: false,
            productName: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openPasswordModal = this.openPasswordModal.bind(this);
        this.closePasswordModal = this.closePasswordModal.bind(this);
        this.openPasswordSucceedModal = this.openPasswordSucceedModal.bind(this);
        this.closePasswordSucceedModal = this.closePasswordSucceedModal.bind(this);
        this.openUpdateProductModal = this.openUpdateProductModal.bind(this);
        this.closeUpdateProductModal = this.closeUpdateProductModal.bind(this);
        this.openDeleteProductModal = this.openDeleteProductModal.bind(this);
        this.closeDeleteProductModal = this.closeDeleteProductModal.bind(this)
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

    openPasswordSucceedModal (){
        this.setState({ openPasswordSucceed: true })
    }

    closePasswordSucceedModal () {
        this.setState({ openPasswordSucceed: false })
    }

    openUpdateProductModal (){
        this.setState({ openUpdateProduct: true })
    }

    closeUpdateProductModal () {
        this.setState({ openUpdateProduct: false })
    }

    openDeleteProductModal (value){
        this.setState({ openDeleteProduct: true, productName: value })
    }

    closeDeleteProductModal () {
        this.setState({ openDeleteProduct: false })
    }

    componentDidMount() {
        this.loadOrdersFromServer();
        if (localStorage.getItem("email") === "admin@gmail.com") {
            this.loadUsersFromServer();
            this.loadProductsFromServer()
        }
    }

    loadOrdersFromServer = () => {
        fetch(`/order/userOrders?idUser=${this.state.user.idUser}`)
            .then(response => response.json())
            .then(data => this.setState({orders: data}))
    };

    loadUsersFromServer = () => {
        fetch('/user/all')
            .then(response => response.json())
            .then(data => this.setState({users: data}))
    };

    loadProductsFromServer = () => {
        fetch(`/product/findBy`)
            .then(response => response.json())
            .then(data => this.setState({products: data}))
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
                                            console.log('User password updated.');
                                            this.closePasswordModal();
                                            // window.location.reload();
                                            this.openPasswordSucceedModal();
                                        } else if (response.status === 403) {
                                            console.log('Cannot update user password.');
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

    updatePasswordSucceedHandler = () => {
        this.closePasswordSucceedModal();
        localStorage.clear();
        window.location.href=`/user/login`;
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
        if (localStorage.getItem("email") === 'admin@gmail.com') {
            return (
                <ul className="nav nav-tabs padding-18">
                    <li className={this.setClassName("#profile", "")}>
                        <Link data-toggle="tab" to="#profile">
                            <i className="green ace-icon fa fa-user bigger-120"></i>
                            Profile
                        </Link>
                    </li>

                    <li className={this.setClassName("#users", "")}>
                        <Link data-toggle="tab" to="#users">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Users
                        </Link>
                    </li>

                    <li className={this.setClassName("#products", "")}>
                        <Link data-toggle="tab" to="#products">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Products
                        </Link>
                    </li>
                </ul>
            );
        }
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
                                    <div className="row">
                                        <div className="col-md-4">••••••••••••••</div>
                                        <div className="col-md-4">
                                            <MDBBtn color="secondary" outline="true"  onClick={() => this.openPasswordModal()}> Update Password </MDBBtn>
                                        </div>
                                        <div className="col-md-4"></div>
                                        <Popup open={this.state.openPassword} onClose={this.closePasswordModal} modal>
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
                                        <Popup open={this.state.openPasswordSucceed} onClose={this.closePasswordSucceedModal} modal>
                                            <div className="container">
                                                <MDBRow>
                                                    <MDBCol md="9" className="mb-9">
                                                        <h3><b>Password changed successfully!</b></h3>
                                                    </MDBCol>
                                                </MDBRow>

                                                <hr/>

                                                <MDBRow>
                                                    <MDBCol md="9" className="mb-9">
                                                        <div><b>Your password has been reset successfully! To continue, press <i>OK</i> and log in with the new password.</b>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr/>
                                                <MDBRow>
                                                    <MDBCol md="4" className="mb-4"/>
                                                    <MDBCol md="1" className="mb-1">
                                                        <MDBBtn color="success" onClick={this.updatePasswordSucceedHandler}> OK </MDBBtn>
                                                    </MDBCol>
                                                    <MDBCol md="4" className="mb-4"/>
                                                </MDBRow>
                                            </div>
                                        </Popup>
                                    </div>
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
                                        onClose={this.closeModal}
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

    usersList(users) {
        return (
            <Container id="users" className={this.setClassName("#users", "tab-pane")}>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <th scope="row">{user.idUser}</th>
                            <td><Avatar name={user.firstname+" "+user.lastname} round size="35" /></td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
        );
    }

    productsList(products) {
        return (
            <Container id="products" className={this.setClassName("#products", "tab-pane")}>
                <MDBRow>
                    <MDBCol md="10" className="mb-10"/>
                    <MDBCol md="2" className="mb-2">
                        <MDBBtn color="info">Add new product</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Material</th>
                        <th scope="col">Color</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price (kr)</th>
                        <th scope="col">Discount (%)</th>
                        <th scope="col">Final price (kr)</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.idProduct}>
                            <th scope="row">{product.idProduct}</th>
                            <td><img src={product.url} alt={product.name} width="100" height="100"/></td>
                            <td>{product.name}</td>
                            <td>{getType(product.type)}</td>
                            <td>{getMaterial(product.material)}</td>
                            <td>{getColor(product.color)}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>{product.price - product.price*product.discount/100}</td>
                            <td><MDBBtn color="success" onClick={() => this.openUpdateProductModal()} > Edit </MDBBtn>
                                <Popup open={this.state.openUpdateProduct} modal>
                                    <div className="container">
                                        <MDBRow>
                                            <MDBCol md="6" className="mb-6">
                                                <h3><b>Update product</b></h3>
                                            </MDBCol>
                                            <MDBCol md="5" className="mb-5"/>
                                            <MDBCol md="1" className="mb-1">
                                                <button onClick={() => this.closeUpdateProductModal()}> &times; </button>
                                            </MDBCol>
                                        </MDBRow>

                                        <hr/>

                                        <hr/>
                                        <MDBRow>
                                            <MDBCol md="2" className="mb-2"/>
                                            <MDBCol md="2" className="mb-2"/>
                                            <MDBCol md="2" className="mb-2"/>
                                            <MDBCol md="2" className="mb-2"/>
                                            <MDBCol md="2" className="mb-2">
                                                <MDBBtn color="danger" onClick={() => this.closeUpdateProductModal()}> Cancel </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="2" className="mb-2">
                                                <MDBBtn color="success"> Update </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </div>
                                </Popup>
                            </td>
                            <td>
                                <MDBBtn color="danger" onClick={() => this.openDeleteProductModal(product.name)}> &times; </MDBBtn>
                                <Popup
                                    open={this.state.openDeleteProduct}
                                    // onClose={!this.closeDeleteProductModal}
                                    // trigger={}
                                    modal
                                    onClose={this.closeDeleteProductModal}
                                    // closeOnDocumentClick
                                    center
                                >
                                    <div className="container">
                                        <MDBRow>
                                            <MDBCol md="6" className="mb-6">
                                                <h3><b>Delete product</b></h3>
                                            </MDBCol>
                                            <MDBCol md="5" className="mb-5"/>
                                            <MDBCol md="1" className="mb-1">
                                                <button onClick={() => this.closeDeleteProductModal()}> &times; </button>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol md="12" className="mb-12">
                                                <div><b>Are you sure you want to delete the <i>'{this.state.productName}'</i> product?</b>
                                                </div>
                                            </MDBCol>

                                        </MDBRow>
                                        <hr/>
                                        <MDBRow>
                                            <MDBCol md="4" className="mb-4"/>
                                            <MDBCol md="2" className="mb-2">
                                                <MDBBtn color="danger" onClick={() => this.closeDeleteProductModal()}> No </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="2" className="mb-2">
                                                <MDBBtn color="success" > Yes </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="4" className="mb-4"/>
                                        </MDBRow>
                                    </div>
                                </Popup>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
        );
    }

    render() {
        const  {user, orders, users, products} = this.state;

        if (user.idUser === 'undefined' || localStorage.getItem("idUser") == null) {
            return (<img className="center" src={notAvailable} alt="Not available"/>);
        }

        if (user.email === "admin@gmail.com") {
            return(
                <div>
                    <div id="user-profile-2" className="user-profile">
                        <div className="tabbable">
                            {this.tabMenu()}

                            <div className="tab-content no-border padding-24" style={{marginBottom: "7rem"}}>
                                {this.profileInfo(user)}
                                {this.usersList(users)}
                                {this.productsList(products)}
                            </div>

                        </div>
                    </div>
                </div>
            );
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
