import {Component} from "react";
import React from "react";
import logo from "../logo2.png";
// import NavLink from "./components/nav_link";
import {NavLink} from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import {MenuItem } from 'react-bootstrap/Navbar';
import {logout} from '../user/login-logout/Logout'
import Profile from "../user/profile/Profile";

class Header extends Component {
    // <a href="#user" className={this.setClassName("#user", "")}>  </a>
   //  <nav className="user">
   //className="user"
   //

   /* aria-labelledby="dropdownMenu"
                    data-toggle="dropdown"

                    id="collasible-nav-dropdown"
                    */
    userDropDownMenu = () => {
        if (localStorage.getItem("idUser") === 'undefined' || localStorage.getItem("idUser") == null)
            return(
                        <NavDropdown
                            title={<i className="fas fa-user"></i>}
                            id="Dropdown"
                            style={{position:"absolute"}}
                            >
                                <NavDropdown.Item href="/user/login">Sign in</NavDropdown.Item>
                                <NavDropdown.Divider/>
                        </NavDropdown>

            );
        return(
            <NavDropdown
                title={<i className="fas fa-user"></i>}
                id="Dropdown"
                style={{position:"absolute"}}
            >
                <NavDropdown.Item href="/user/profile">View profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Sign out</NavDropdown.Item>
            </NavDropdown>

        );


    }

    setClassName = (str, oldName) => {
        if (str === window.location.hash) {
            return oldName + "active";
        } 
        return oldName;
    }
    
    render() {
        return (
            <div>
                <Navbar className="header" style={{marginBottom: '3rem'}}>
                    <a href="#default" className="logo"> <img src={logo} alt="Logo"
                                                              style={{width: "46px", height: "60px"}}/>
                    </a>

                    <div className="header-right">
                        <Nav>
                            <NavLink exact to="/" >Home</NavLink>
                            <NavLink to="/product#bracelets" className={this.setClassName("#bracelets", "")}>Bracelets</NavLink>
                            <NavLink to="/product#rings" className={this.setClassName("#rings", "")}>Rings</NavLink>
                            <NavLink to="/product#necklaces" className={this.setClassName("#necklaces", "")}>Necklaces</NavLink>
                            <NavLink to="/product#earrings" className={this.setClassName("#earrings", "")}>Earrings</NavLink>

                            <NavLink to="#contact" className={this.setClassName("#contact", "")}>Contact</NavLink>
                            <NavLink to="#about" className={this.setClassName("#about", "")}>About</NavLink>
                        </Nav>

                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                              integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                              crossOrigin="anonymous"/>

                        <div className="cart">
                            <a href="/order/cart" className={this.setClassName("#cart", "")}> <i className="fas fa-shopping-cart" rel="stylesheet"></i> </a>
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