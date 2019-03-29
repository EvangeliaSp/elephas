import React, {Component} from 'react'
import Avatar from 'react-avatar';
import {HashLink as Link} from 'react-router-hash-link';
import './Profile.css'
import notAvailable from "./../../notAvailable.jpg";
import {Container, MDBBtn, MDBCol, MDBRow} from "mdbreact";
import Popup from "reactjs-popup";
import {
    confirmToString,
    getColor,
    getMaterial,
    getType,
    paymentStatusToString,
    paymentTypeToString,
    statusToString,
    statusStringToCode,
    customProductStatusToString
} from '../../Translations';
import TypeChart from "../TypeChart";

class Profile extends Component {

    state = {};

    constructor(props, context) {
        super(props, context);
        this.state = {
            orders: [],
            users: [],
            pendingOrders: [],
            completeOrdersSize: 0,
            products: [],
            creations: [],
            customCreations: [],
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
            product: {
                name: '',
                url: '',
                price: 0,
                discount: 0,
                type: 0,
                material: 0,
                color: 0,
                description: ''
            },
            customProduct: {
                id: '',
                price: 0,
                discount: 0,
                status: 1
            },
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            open: false,
            openPassword: false,
            openPasswordSucceed: false,
            openUpdateProduct: false,
            openDeleteProduct: false,
            openCreateProduct: false,
            openConfirmCustom: false,
            openRejectCustom: false,
            productName: '',
            productId: '',
            customProductId: ''
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
        this.closeDeleteProductModal = this.closeDeleteProductModal.bind(this);
        this.openCreateProductModal = this.openCreateProductModal.bind(this);
        this.closeCreateProductModal = this.closeCreateProductModal.bind(this);
        this.openConfirmCustomModal = this.openConfirmCustomModal.bind(this);
        this.closeConfirmCustomModal = this.closeConfirmCustomModal.bind(this);
        this.openRejectCustomModal = this.openRejectCustomModal.bind(this);
        this.closeRejectCustomModal = this.closeRejectCustomModal.bind(this)
    }

    componentDidMount() {
        if (localStorage.getItem("email") === "admin@elephas.com") {
            this.loadUsersFromServer();
            this.loadPendingOrdersFromServer();
            this.loadCustomCreationsFromServer();
            this.loadProductsFromServer();
            this.loadCompleteOrdersSizeFromServer()
        } else if (localStorage.getItem("idUser") !== 'undefined' && localStorage.getItem("idUser") != null) {
            this.loadOrdersFromServer();
            this.loadCreationsFromServer()
        }
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

    openUpdateProductModal (idProduct) {
        const options = {
            method: 'GET'
        };

        fetch(`/product/findById?idProduct=${idProduct}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ openUpdateProduct: true, productId: idProduct, product: data })
            })
    }

    closeUpdateProductModal () {
        this.setState({ openUpdateProduct: false, productId: '', productName: '' });
    }

    openDeleteProductModal (idValue, nameValue){
        this.setState({ openDeleteProduct: true, productId: idValue, productName: nameValue })
    }

    closeDeleteProductModal () {
        this.setState({ openDeleteProduct: false, productId: '', productName: '' })
    }

    openCreateProductModal () {
        this.setState({ openCreateProduct: true})
    }

    closeCreateProductModal () {
        this.setState({ openCreateProduct: false})
    }

    openConfirmCustomModal (idValue) {
        this.setState({openConfirmCustom: true, customProductId: idValue })
    }

    closeConfirmCustomModal () {
        this.setState({openConfirmCustom: false})
    }

    openRejectCustomModal (idValue) {
        this.setState({openRejectCustom: true, customProductId: idValue })
    }

    closeRejectCustomModal () {
        this.setState({openRejectCustom: false})
    }

    updateProduct (productId) {
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PATCH',
            body: JSON.stringify(this.state.product),
            redirect: 'follow'
        };
        fetch(`/product/update/${productId}`, options)
            .then(response => {
                if (response.ok) {
                    console.log(`Product with id=${this.state.productId} and name=${this.state.productName} updated successfully.`);
                    this.closeUpdateProductModal();
                    window.location.reload();
                } else {
                    console.log(`Product with id=${this.state.productId} and name=${this.state.productName} does not exist.`)
                    alert("Cannot update this product! Please, try again.");
                }
            });
    }

    deleteProduct (productId) {
        const options = {
            method: 'DELETE'
        };
        fetch(`/product/delete/${productId}`, options)
            .then(response => {
                if (response.ok) {
                    console.log(`Product with id=${this.state.productId} and name=${this.state.productName} deleted successfully.`);
                    this.closeDeleteProductModal();
                    window.location.reload();
                } else {
                    console.log(`Product with id=${this.state.productId} and name=${this.state.productName} does not exist.`)
                    alert("Cannot delete this product! Please, try again.");
                }
            });
    }

    confirmCustomProduct (customProductId) {
        let customProduct = this.state.customProduct;
        customProduct["id"] = customProductId;
        customProduct["status"] = 2;
        this.setState({customProduct: customProduct})
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PATCH',
            body: JSON.stringify(this.state.customProduct),
            redirect: 'follow'
        };
        fetch(`/customProduct/update?idCustom=${customProductId}`, options)
            .then(response => {
                if (response.ok) {
                    console.log(`Custom product with id=${customProductId} is confirmed.`);
                    this.closeConfirmCustomModal();
                    window.location.reload();
                } else {
                    console.log(`Custom product with id=${customProductId} cannot be found.`)
                    alert("Cannot confirm this product! Please, try again.");
                }
            });
    }

    updateCustomProductStatus (customProductId, status) {
        const options = {
            method: 'PATCH',
        };
        fetch(`/customProduct/updateStatus?idCustom=${customProductId}&status=${status}`, options)
            .then(response => {
                if (response.ok) {
                    console.log(`Status of custom product with id=${customProductId} is updated.`);
                    if (status === 3) {
                        this.closeRejectCustomModal();
                    }
                    window.location.reload();
                } else {
                    console.log(`Custom product with id=${customProductId} cannot be found.`)
                    alert("Cannot reject this product! Please, try again.");
                }
            });
    }

    createProduct = () => {
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(this.state.product),
            redirect: 'follow'
        };

        fetch(`/product/create`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.closeCreateProductModal();
                window.location.reload();
            })
    };

    loadCompleteOrdersSizeFromServer = () => {
        const options = {
            method: 'GET'
        };
        fetch(`/order/ordersSize?status=${statusStringToCode("COMPLETED")}`, options)
            .then(response => response.json())
            .then(data => {
                console.log("Found "+data.toString()+" complete orders.");
                this.setState({completeOrdersSize: data})
            })
    };

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

    loadPendingOrdersFromServer = () => {
        fetch(`/order/inProgressOrders`)
            .then(response => response.json())
            .then(data => this.setState({pendingOrders: data}))
    };

    loadProductsFromServer = () => {
        fetch(`/product/findBy`)
            .then(response => response.json())
            .then(data => this.setState({products: data}))
    };

    loadCreationsFromServer = () => {
        const options = {
            method: 'GET'
        };
        fetch(`/customProduct/creations?idUser=${localStorage.getItem("idUser")}`, options)
            .then(response => response.json())
            .then(data => this.setState({creations: data}))
    };

    loadCustomCreationsFromServer = () => {
        const options = {
            method: 'GET'
        };
        fetch(`/customProduct/customCreations`, options)
            .then(response => response.json())
            .then(data => this.setState({customCreations: data}))
    };

    changeHandler = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    changeUserHandler = event => {
        let updateUser = this.state.updateUser;
        updateUser[event.target.name] = event.target.value;
        this.setState({updateUser: updateUser})
    };

    createProductHandler = event => {
        let product = this.state.product;
        product[event.target.name] = event.target.value;
        this.setState({product: product})
    };

    createProductTypeHandler = event => {
        let product = this.state.product;
        product.type = event.target.value;
        this.setState({product: product})
    };

    createProductMaterialHandler = event => {
        let product = this.state.product;
        product.material = event.target.value;
        this.setState({product: product})
    };

    createProductColorHandler = event => {
        let product = this.state.product;
        product.color = event.target.value;
        this.setState({product: product})
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

    updateCustomProductHandler = event => {
        let customProduct = this.state.customProduct;
        customProduct[event.target.name] = event.target.value;
        this.setState({customProduct: customProduct})
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

    approveOrder = (idOrder) => {
        const options = {
            method: 'PATCH'
        };

        fetch(`/order/approve?idOrder=${idOrder}`, options)
            .then((response) => {
                window.location.reload();
            });
    };

    declineOrder = (idOrder) => {
        const options = {
            method: 'PATCH'
        };

        fetch(`/order/decline?idOrder=${idOrder}`, options)
            .then((response) => {
                window.location.reload();
            });
    };

    setClassName = (str, oldName) => {
        if (str === window.location.hash)
            return oldName + "active";
        return oldName;
    };

    tabMenu() {
        if (localStorage.getItem("email") === 'admin@elephas.com') {
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
                    <li className={this.setClassName("#pendingOrders", "")}>
                        <Link data-toggle="tab" to="#pendingOrders">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Pending orders
                        </Link>
                    </li>
                    <li className={this.setClassName("#products", "")}>
                        <Link data-toggle="tab" to="#products">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Products
                        </Link>
                    </li>
                    <li className={this.setClassName("#statistics", "")}>
                        <Link data-toggle="tab" to="#statistics">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Statistics
                        </Link>
                    </li>
                    <li className={this.setClassName("#customCreations", "")}>
                        <Link data-toggle="tab" to="#customCreations">
                            <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                            Custom orders
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
                <li className={this.setClassName("#creations", "")}>
                    <Link data-toggle="tab" to="#creations">
                        <i className="pink ace-icon fa fa-picture-o bigger-120"></i>
                        My creations
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
                                                <br/>
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
                                                <br/>
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
                                    <Popup open={this.state.open} onClose={this.closeModal} modal>
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
                                            <br/>
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
                                            <br/>
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
                                            <br/>
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
                                <div className="profile-info-name"></div>
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
                <tHeader><h3 align="left"><b>My orders</b></h3></tHeader>
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

    userCreationList(creations) {
        return (
            <Container id="creations" className={this.setClassName("#creations", "tab-pane")}>
                <tHeader><h3 align="left"><b>My creations</b></h3></tHeader>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Material</th>
                        <th scope="col">Color</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price (kr)</th>
                        <th scope="col">Discount (%)</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Final price (kr)</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {creations.map(product => (
                        <tr key={product.idProduct}>
                            <td><img src={"/customProduct/files/" + product.image} alt={product.name} width="100" height="100"/></td>
                            <td>{product.name}</td>
                            <td>{getType(product.type)}</td>
                            <td>{getMaterial(product.material)}</td>
                            <td>{getColor(product.color)}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>{product.quantity}</td>
                            <td>{product.quantity * (product.price - product.price*product.discount/100)}</td>
                            <td>{customProductStatusToString(product.status)}</td>
                            <td>
                                {product.status === 2 ? <MDBBtn color="success" onClick={() => this.updateCustomProductStatus(product.idCustomProduct, 4)}> Pay </MDBBtn> : <div></div>}
                            </td>
                            <td>
                                {product.status === 2 ? <MDBBtn color="danger" onClick={() => this.updateCustomProductStatus(product.idCustomProduct, 5)}> Decline </MDBBtn> : <div></div>}
                            </td>
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
                <tHeader><h3 align="left"><b>Users</b></h3></tHeader>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Location</th>
                        <th scope="col">Address</th>
                        <th scope="col">Telephone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.idUser}>
                            <td><Avatar name={user.firstname+" "+user.lastname} round size="35" /></td>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.city+", "+user.country}</td>
                            <td>{user.streetName+", "+user.streetNumber+", "+user.zipCode}</td>
                            <td>{user.telephone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
        );
    }

    pendingOrderList(pendingOrders) {
        if (pendingOrders.length===0) {
            return (
                <Container id="pendingOrders" className={this.setClassName("#pendingOrders", "tab-pane")}>
                    <tHeader><h3 align="left"><b>Pending orders</b></h3></tHeader>
                    <table className="table table-striped ">
                        <tbody>
                        <br/><br/>
                        <tr>
                            <h4><b>There aren't any pending orders.</b></h4>
                        </tr>
                        <br/>
                        </tbody>
                    </table>
                </Container>
            );
        }
        return (
            // TODO: Future work is the payment things
            <Container id="pendingOrders" className={this.setClassName("#pendingOrders", "tab-pane")}>
                <tHeader><h3 align="left"><b>Pending orders</b></h3></tHeader>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        {/*<th scope="col">Confirm</th>*/}
                        <th scope="col">Date</th>
                        {/*<th scope="col">Payment Status</th>*/}
                        {/*<th scope="col">Payment Type</th>*/}
                        <th scope="col">Status</th>
                        <th scope="col">Sum</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {pendingOrders.map(order => (
                        <tr key={order.idOrder}>
                            {/*<td>{confirmToString(order.confirm)}</td>*/}
                            <td>{(new Date(order.date)).toLocaleString()}</td>
                            {/*<td>{paymentStatusToString(order.paymentStatus)}</td>*/}
                            {/*<td>{paymentTypeToString(order.paymentType)}</td>*/}
                            <td>{statusToString(order.status)}</td>
                            <td>{order.sum}</td>
                            <td><MDBBtn color="success" onClick={() => this.approveOrder(order.idOrder)} > Approve </MDBBtn></td>
                            <td><MDBBtn color="danger" onClick={() => this.declineOrder(order.idOrder)}> Decline </MDBBtn></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Container>
        );
    }

    creationList(customCreations) {
        return (
            <Container id="customCreations" className={this.setClassName("#customCreations", "tab-pane")}>
                <tHeader><h3 align="left"><b>Items for construction</b></h3></tHeader>
                <table className="table table-striped ">
                    <thead>
                    <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Material</th>
                        <th scope="col">Color</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price (kr)</th>
                        <th scope="col">Discount (%)</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Final price (kr)</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {customCreations.map(product => (
                        <tr key={product.idCustomProduct}>
                            <td><img src={product.image} alt={product.name} width="100" height="100"/></td>
                            <td>{product.name}</td>
                            <td>{getType(product.type)}</td>
                            <td>{getMaterial(product.material)}</td>
                            <td>{getColor(product.color)}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>{product.quantity}</td>
                            <td>{product.quantity*(product.price - product.price*product.discount/100)}</td>
                            <td>{customProductStatusToString(product.status)}</td>
                            <td>
                                {product.status === 1
                                    ? <MDBBtn color="success" onClick={() => this.openConfirmCustomModal(product.idCustomProduct)}> Confirm </MDBBtn>
                                    : <div></div>}
                                {product.status === 4
                                    ? <MDBBtn color="info" onClick={() => this.updateCustomProductStatus(product.idCustomProduct, 6)}> Ship </MDBBtn>
                                    : <div></div>}
                            </td>
                            <td>
                                {product.status === 1 ?
                                    <MDBBtn color="danger" onClick={() => this.openRejectCustomModal(product.idCustomProduct)}> Reject </MDBBtn> :
                                    <div></div>}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Popup modal for custom product confirmation */}
                <Popup open={this.state.openConfirmCustom} modal onClose={this.closeConfirmCustomModal}>
                    <div className="container">
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <h3><b>Confirm product</b></h3>
                            </MDBCol>
                            <MDBCol md="5" className="mb-5"/>
                            <MDBCol md="1" className="mb-1">
                                <button onClick={() => this.closeConfirmCustomModal()}> &times; </button>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <h5><b>In order to confirm the order of this custom product, you must first set a price and a possible discount.</b></h5>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Price (kr)
                                </label>
                                <input
                                    value={this.state.customProduct.price}
                                    name="price"
                                    onChange={this.updateCustomProductHandler}
                                    type="number"
                                    step="0.1"
                                    min='0'
                                    className="form-control"
                                    placeholder={this.state.customProduct.price}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Discount (%)
                                </label>
                                <input
                                    value={this.state.customProduct.discount}
                                    name="discount"
                                    defaultValue={0}
                                    onChange={this.updateCustomProductHandler}
                                    type="number"
                                    min='0'
                                    className="form-control"
                                    placeholder={this.state.customProduct.discount}
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="2" className="mb-2"/>
                            <MDBCol md="2" className="mb-2"/>
                            <MDBCol md="2" className="mb-2"/>
                            <MDBCol md="2" className="mb-2"/>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="danger" onClick={() => this.closeConfirmCustomModal()}> Cancel </MDBBtn>
                            </MDBCol>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="success" onClick={() => this.confirmCustomProduct(this.state.customProductId)}> Confirm </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </Popup>
                {/* Popup modal for custom product rejection */}
                <Popup open={this.state.openRejectCustom} modal onClose={this.closeRejectCustomModal}>
                    <div className="container">
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <h3><b>Delete product</b></h3>
                            </MDBCol>
                            <MDBCol md="5" className="mb-5"/>
                            <MDBCol md="1" className="mb-1">
                                <button onClick={() => this.closeRejectCustomModal()}> &times; </button>
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="12" className="mb-12">
                                <div><b>Are you sure you do NOT want to create this product?</b>
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="4" className="mb-4"/>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="danger" onClick={() => this.closeRejectCustomModal()}> No </MDBBtn>
                            </MDBCol>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="success" onClick={() => this.updateCustomProductStatus(this.state.customProductId, 3)} > Yes </MDBBtn>
                            </MDBCol>
                            <MDBCol md="4" className="mb-4"/>
                        </MDBRow>
                    </div>
                </Popup>
            </Container>
        );
    }

    productsList(products) {
        return (
            <Container id="products" className={this.setClassName("#products", "tab-pane")}>
                <tHeader><h3 align="left"><b>Products</b></h3></tHeader>
                <MDBRow>
                    <MDBCol md="10" className="mb-10"/>
                    <MDBCol md="2" className="mb-2">
                        <MDBBtn color="info" onClick={() => this.openCreateProductModal()}>Add new product</MDBBtn>
                    </MDBCol>
                </MDBRow>
                <table className="table table-striped ">
                    <thead>
                    <tr>
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
                            <td><img src={product.url} alt={product.name} width="100" height="100"/></td>
                            <td>{product.name}</td>
                            <td>{getType(product.type)}</td>
                            <td>{getMaterial(product.material)}</td>
                            <td>{getColor(product.color)}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td>{product.price - product.price*product.discount/100}</td>
                            <td><MDBBtn color="success" onClick={() => this.openUpdateProductModal(product.idProduct)} > Edit </MDBBtn></td>
                            <td><MDBBtn color="danger" onClick={() => this.openDeleteProductModal(product.idProduct, product.name)}> &times; </MDBBtn></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* Popup modal for product create */}
                <Popup open={this.state.openCreateProduct} modal onClose={this.closeCreateProductModal}>
                    <div className="container">
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <h3><b>Create new product</b></h3>
                            </MDBCol>
                            <MDBCol md="5" className="mb-5"/>
                            <MDBCol md="1" className="mb-1">
                                <button onClick={() => this.closeCreateProductModal()}> &times; </button>
                            </MDBCol>
                        </MDBRow>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Name
                                </label>
                                <input
                                    value={this.state.product.name}
                                    name="name"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder="Product name"
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    URL
                                </label>
                                <input
                                    value={this.state.product.url}
                                    name="url"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder="Product url"
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Price (kr)
                                </label>
                                <input
                                    value={this.state.product.price}
                                    name="price"
                                    onChange={this.createProductHandler}
                                    type="number"
                                    step="0.1"
                                    min='0'
                                    className="form-control"
                                    placeholder="Product price"
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Discount (%)
                                </label>
                                <input
                                    value={this.state.product.discount}
                                    name="discount"
                                    defaultValue={0}
                                    onChange={this.createProductHandler}
                                    type="number"
                                    min='0'
                                    className="form-control"
                                    placeholder="Product discount"
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Type
                                </label>
                                <select
                                    value={this.state.product.type}
                                    onChange={this.createProductTypeHandler}
                                    className="form-control">
                                    <option value={1}>Bracelet</option>
                                    <option value={2}>Ring</option>
                                    <option value={3}>Earring</option>
                                    <option value={4}>Necklace</option>
                                </select>
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Material
                                </label>
                                <select
                                    value={this.state.product.material}
                                    onChange={this.createProductMaterialHandler}
                                    className="form-control">
                                    <option value={1}>Steel</option>
                                    <option value={2}>Silver</option>
                                    <option value={3}>Gold</option>
                                </select>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Color
                                </label>
                                <select
                                    value={this.state.product.color}
                                    onChange={this.createProductColorHandler}
                                    className="form-control">
                                    <option value={1}>Black</option>
                                    <option value={2}>White</option>
                                    <option value={3}>Grey</option>
                                    <option value={4}>Brown</option>
                                    <option value={5}>Red</option>
                                </select>
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Description
                                </label>
                                <textarea
                                    value={this.state.product.description}
                                    placeholder="No description."
                                    name="description"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <hr/>
                        <MDBRow>
                            <MDBCol md="8" className="mb-8"/>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="danger" onClick={() => this.closeCreateProductModal()}> Cancel </MDBBtn>
                            </MDBCol>
                            <MDBCol md="2" className="mb-2">
                                <MDBBtn color="success" onClick={() => this.createProduct()}> Create </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </Popup>
                {/* Popup modal for product update */}
                <Popup open={this.state.openUpdateProduct} modal onClose={this.closeUpdateProductModal}>
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
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Name
                                </label>
                                <input
                                    value={this.state.product.name}
                                    name="name"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder={this.state.product.name}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    URL
                                </label>
                                <input
                                    value={this.state.product.url}
                                    name="url"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder={this.state.product.url}
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Price (kr)
                                </label>
                                <input
                                    value={this.state.product.price}
                                    name="price"
                                    onChange={this.createProductHandler}
                                    type="number"
                                    step="0.1"
                                    min='0'
                                    className="form-control"
                                    placeholder={this.state.product.price}
                                />
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Discount (%)
                                </label>
                                <input
                                    value={this.state.product.discount}
                                    name="discount"
                                    defaultValue={0}
                                    onChange={this.createProductHandler}
                                    type="number"
                                    min='0'
                                    className="form-control"
                                    placeholder={this.state.product.discount}
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Type
                                </label>
                                <select
                                    value={this.state.product.type}
                                    onChange={this.createProductTypeHandler}
                                    className="form-control">
                                    <option value={1}>Bracelet</option>
                                    <option value={2}>Ring</option>
                                    <option value={3}>Earring</option>
                                    <option value={4}>Necklace</option>
                                </select>
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Material
                                </label>
                                <select
                                    value={this.state.product.material}
                                    onChange={this.createProductMaterialHandler}
                                    className="form-control">
                                    <option value={1}>Steel</option>
                                    <option value={2}>Silver</option>
                                    <option value={3}>Gold</option>
                                </select>
                            </MDBCol>
                        </MDBRow>
                        <br/>
                        <MDBRow>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterNameEx"
                                    className="grey-text"
                                >
                                    Color
                                </label>
                                <select
                                    value={this.state.product.color}
                                    onChange={this.createProductColorHandler}
                                    className="form-control">
                                    <option value={1}>Black</option>
                                    <option value={2}>White</option>
                                    <option value={3}>Grey</option>
                                    <option value={4}>Brown</option>
                                    <option value={5}>Red</option>
                                </select>
                            </MDBCol>
                            <MDBCol md="6" className="mb-6">
                                <label
                                    htmlFor="defaultFormRegisterSurnameEx2"
                                    className="grey-text"
                                >
                                    Description
                                </label>
                                <textarea
                                    value={this.state.product.description}
                                    name="description"
                                    onChange={this.createProductHandler}
                                    type="text"
                                    className="form-control"
                                    placeholder={this.state.product.description}
                                />
                            </MDBCol>
                        </MDBRow>
                        <br/>
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
                                <MDBBtn color="success" onClick={() => this.updateProduct(this.state.productId)}> Update </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </div>
                </Popup>
                {/* Popup modal for product delete */}
                <Popup open={this.state.openDeleteProduct} modal onClose={this.closeDeleteProductModal}>
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
                                <MDBBtn color="success" onClick={() => this.deleteProduct(this.state.productId)} > Yes </MDBBtn>
                            </MDBCol>
                            <MDBCol md="4" className="mb-4"/>
                        </MDBRow>
                    </div>
                </Popup>
            </Container>
        );
    }

    typeStatistics() {
        return (
            <Container id="statistics" className={this.setClassName("#statistics", "tab-pane")}>
                <tHeader>
                    <h3 align="center"><b>Most Popular Product Types</b></h3>
                    <p align="center">Based on statistics of <b>{this.state.completeOrdersSize}</b> completed orders. </p>
                    <p align="center"></p>
                    <h4 align="center"><b>March 2019</b></h4>
                    <br/><br/>
                </tHeader>
                <TypeChart/>
            </Container>
        );
    }

    render() {
        const  {user, orders, pendingOrders, users, products, creations, customCreations} = this.state;

        if (user.idUser === 'undefined' || localStorage.getItem("idUser") == null) {
            return (<img className="center" src={notAvailable} alt="Not available"/>);
        }

        if (user.email === "admin@elephas.com") {
            return(
                <div>
                    <div id="user-profile-2" className="user-profile">
                        <div className="tabbable">
                            {this.tabMenu()}
                            <div className="tab-content no-border padding-24" style={{marginBottom: "7rem"}}>
                                {this.profileInfo(user)}
                                {this.usersList(users)}
                                {this.pendingOrderList(pendingOrders)}
                                {this.productsList(products)}
                                {this.typeStatistics()}
                                {this.creationList(customCreations)}
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
                        {this.userCreationList(creations)}
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

export default Profile;
