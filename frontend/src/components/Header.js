import {Component} from "react";
import React from "react";
import logo from "../logo2.png";
// import NavLink from "./components/nav_link";
import {NavLink} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div>

                <div className="header" style={{marginBottom: '3rem'}}>
                    <a href="#default" className="logo"> <img src={logo} alt="Logo"
                                                              style={{width: "46px", height: "60px"}}/>
                    </a>

                    <div className="header-right">
                        <nav>



                        <a href="http://localhost:3000/">Home</a>
                        <NavLink to="/product#bracelets">Bracelets</NavLink>
                        <NavLink to="/product#rings">Rings</NavLink>
                        <NavLink to="/product#necklaces">Necklaces</NavLink>
                        <NavLink to="/product#earrings">Earrings</NavLink>

                        <a href="#contact">Contact</a>
                        <a href="#about">About</a>

                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
                              integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
                              crossOrigin="anonymous"/>
                        <div className="user">
                            <a href="#cart"> <i className="fas fa-shopping-cart" rel="stylesheet"></i> </a>
                        </div>
                        <div className="cart">
                            <a href="#user"> <i className="fas fa-user"></i> </a>

                        </div>
                        </nav>
                    </div>
                </div>
            </div>


        );
    }
}

export default Header;