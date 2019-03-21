import React, {Component} from "react";
import logo from "../logo2.png";
import Avatar from 'react-avatar';
import {NavLink} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {logout} from '../user/login-logout/Logout';
import Badge from '@material-ui/core/Badge';
import adminIcon from "../adminIcon3.png"

class Header extends Component {

    state = {};

    constructor() {
        super();
        this.state = {
            cartSize: this.getBasketSize,
            invisible: true,
            pendingOrdersSize: this.getPendingOrdersSize,
            invisiblePending: true
        };
    }

    componentDidMount() {
        this.getBasketSize();
        if (localStorage.getItem("email") === "admin@elephas.com") {
            this.getPendingOrdersSize()
        }
    }

    getBasketSize = () => {
        if (localStorage.getItem("idUser") === 'undefined' || localStorage.getItem("idUser") == null) {
            this.setState({invisible: true})
        } else {
            this.setState({invisible: false});
            fetch(`/order/cartSize/${localStorage.getItem("idUser")}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        cartSize: data
                    })
                })
        }
    };

    getPendingOrdersSize = () => {
        fetch(`/order/inProgressOrdersSize`)
            .then(response => response.json())
            .then(data => {
                if (data === 0) {
                    this.setState({
                        pendingOrdersSize: data,
                        invisiblePending: true
                    })
                } else {
                    this.setState({
                        pendingOrdersSize: data,
                        invisiblePending: false
                    })
                }

            })
    };

    userDropDownMenu = () => {
        if (localStorage.getItem("email") === 'admin@elephas.com' && localStorage.getItem("idUser") != null)
            return(
                <NavDropdown
                    title={<Avatar src={adminIcon} round size={"35"}/>}
                    id="Dropdown"
                    style={{position:"absolute"}}
                >
                    <NavDropdown.Item disabled className="text-left">
                        <div style={{marginLeft:"10px"}}>Logged in as:</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item disabled className="text-left">
                        <div style={{marginLeft:"15px"}}><b>Administrator</b></div>
                        <NavDropdown.Divider/>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/profile#profile" className="text-left">
                        <div style={{marginLeft:"10px"}}>View profile</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/profile#users" className="text-left">
                        <div style={{marginLeft:"10px"}}>View users</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/profile#pendingOrders" className="text-left">
                        <div style={{marginLeft:"10px"}}>View orders</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/profile#products" className="text-left">
                        <div style={{marginLeft:"10px"}}>View products</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout} className="text-left">
                        <div style={{marginLeft:"10px"}}>Sign out</div>
                    </NavDropdown.Item>
                </NavDropdown>

            );

        if (localStorage.getItem("idUser") === 'undefined' || localStorage.getItem("idUser") == null)
            return(
                <NavDropdown
                    title={<i className="fas fa-user"></i>}
                    id="Dropdown"
                    style={{position:"absolute"}}
                >
                    <NavDropdown.Item href="/user/login" className="text-left">
                        <div style={{marginLeft:"10px"}}>Sign in</div>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/user/register" className="text-left">
                        <div style={{marginLeft:"10px"}}>Sign up</div>
                    </NavDropdown.Item>
                </NavDropdown>
            );
        return(
            <NavDropdown
                title={<Avatar name={localStorage.getItem("firstname")+" "+localStorage.getItem("lastname")} round size="35"/>}
                id="Dropdown"
                style={{position:"absolute"}}
            >
                <NavDropdown.Item disabled className="text-left">
                    <div style={{marginLeft:"10px"}}>Logged in as:</div>
                </NavDropdown.Item>
                <NavDropdown.Item disabled className="text-left">
                    <div style={{marginLeft:"15px"}}><b>{localStorage.getItem("firstname")+" "+localStorage.getItem("lastname")}</b></div>
                    <NavDropdown.Divider/>
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/profile#profile" className="text-left">
                    <div style={{marginLeft:"10px"}}>View profile</div>
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/profile#orders" className="text-left">
                    <div style={{marginLeft:"10px"}}>View orders</div>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout} className="text-left">
                    <div style={{marginLeft:"10px"}}>Sign out</div>
                </NavDropdown.Item>
            </NavDropdown>
        );
    };

    setClassName = (str, oldName) => {
        if (str === window.location.hash) {
            return oldName + "active";
        } 
        return oldName;
    };
    
    setClassNamePath = (currentPath, linkPath, oldName) => {
        if (currentPath === linkPath) {
            return oldName + "active";
        }
        return oldName;
    };

    render() {
        if (localStorage.getItem("email") === 'admin@elephas.com' && localStorage.getItem("idUser") != null) {
            return (
                <div>
                    <Navbar className="header" style={{marginBottom: '3rem'}}>
                        <a href="/" className="logo"> <img src={logo} alt="Logo"
                                                           style={{width: "46px", height: "60px"}}/>
                        </a>

                        <div className="header-right">
                            <Nav>
                                <NavLink exact to="/" >Home</NavLink>
                                <NavLink to="/product#bracelets" className={this.setClassName("#bracelets", "")}>Bracelets</NavLink>
                                <NavLink to="/product#rings" className={this.setClassName("#rings", "")}>Rings</NavLink>
                                <NavLink to="/product#necklaces" className={this.setClassName("#necklaces", "")}>Necklaces</NavLink>
                                <NavLink to="/product#earrings" className={this.setClassName("#earrings", "")}>Earrings</NavLink>

                                <NavLink to="/about" className={this.setClassName("#about", "")}>About</NavLink>
                            </Nav>

                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                                  integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                                  crossOrigin="anonymous"/>

                            <div className="bell">
                                <a href="/user/profile#pendingOrders" className={this.setClassNamePath(window.location.pathname, "/user/profile#pendingOrders", "")}>
                                    <i className="fas fa-bell" rel="stylesheet"></i>
                                    <Badge invisible={this.state.invisiblePending} color="secondary" variant="dot" style={{paddingTop: "100%"}}/>
                                </a>
                            </div>
                            <div className="user">
                                {this.userDropDownMenu()}
                            </div>
                        </div>
                    </Navbar>
                </div>
            );
        }
        return (
            <div>
                <Navbar className="header" style={{marginBottom: '3rem'}}>
                    <a href="/" className="logo"> <img src={logo} alt="Logo"
                                                              style={{width: "46px", height: "60px"}}/>
                    </a>

                    <div className="header-right">
                        <Nav>
                            <NavLink exact to="/" >Home</NavLink>
                            <NavLink to="/product#bracelets" className={this.setClassName("#bracelets", "")}>Bracelets</NavLink>
                            <NavLink to="/product#rings" className={this.setClassName("#rings", "")}>Rings</NavLink>
                            <NavLink to="/product#necklaces" className={this.setClassName("#necklaces", "")}>Necklaces</NavLink>
                            <NavLink to="/product#earrings" className={this.setClassName("#earrings", "")}>Earrings</NavLink>

                            <NavLink to="/about" className={this.setClassName("#about", "")}>About</NavLink>
                        </Nav>

                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                              integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                              crossOrigin="anonymous"/>

                        <div className="cart">
                            <a href="/order/cart" className={this.setClassNamePath(window.location.pathname, "/order/cart", "")}>
                                <i className="fas fa-shopping-cart" rel="stylesheet"></i>
                                <Badge badgeContent={this.state.cartSize} invisible={this.state.invisible} color="secondary" />
                            </a>
                        </div>
                        <div className="user">
                        {this.userDropDownMenu()}
                        </div>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;